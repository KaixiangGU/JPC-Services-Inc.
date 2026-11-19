<?php
/**
 * Live Google rating for jpcservicesinc.com (runs on the Plesk / Hustly hosting).
 * Returns {"rating":"5.0","count":154,"url":"https://maps.google.com/..."} and caches it for 6 hours,
 * so Google is called at most ~4 times a day.
 *
 * The API key is NOT stored here. Put it in a file OUTSIDE the public web folder:
 *   <home>/private/google-places.php   containing:
 *   <?php return ['key' => 'YOUR_API_KEY', 'place_id' => 'YOUR_PLACE_ID'];
 * (or set GOOGLE_PLACES_API_KEY / GOOGLE_PLACE_ID environment variables). See GOOGLE_REVIEWS.md.
 */
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: public, max-age=3600');

$CACHE_SECONDS = 6 * 3600;
$configFile = dirname(__DIR__, 2) . '/private/google-places.php';
$config = is_file($configFile) ? (include $configFile) : [];
$key = $config['key'] ?? getenv('GOOGLE_PLACES_API_KEY') ?: '';
$placeId = $config['place_id'] ?? getenv('GOOGLE_PLACE_ID') ?: '';

if ($key === '' || $placeId === '') {
    http_response_code(503);
    echo json_encode(['error' => 'not configured']);
    exit;
}

$cacheDir = dirname(__DIR__, 2) . '/private';
if (!is_dir($cacheDir) || !is_writable($cacheDir)) $cacheDir = sys_get_temp_dir();
$cacheFile = $cacheDir . '/google-rating-cache.json';

if (is_file($cacheFile) && (time() - filemtime($cacheFile)) < $CACHE_SECONDS) {
    readfile($cacheFile);
    exit;
}

$ctx = stream_context_create(['http' => [
    'method' => 'GET',
    'timeout' => 8,
    'header' => "X-Goog-Api-Key: $key\r\nX-Goog-FieldMask: rating,userRatingCount,googleMapsUri\r\n",
    'ignore_errors' => true,
]]);
$raw = @file_get_contents('https://places.googleapis.com/v1/places/' . rawurlencode($placeId), false, $ctx);
$data = $raw ? json_decode($raw, true) : null;

if (!is_array($data) || !isset($data['rating'], $data['userRatingCount'])) {
    // Google failed: serve the last good value if we have one.
    if (is_file($cacheFile)) { readfile($cacheFile); exit; }
    http_response_code(502);
    echo json_encode(['error' => 'unavailable']);
    exit;
}

$out = json_encode([
    'rating' => number_format((float) $data['rating'], 1),
    'count'  => (int) $data['userRatingCount'],
    'url'    => (string) ($data['googleMapsUri'] ?? ''),
]);
@file_put_contents($cacheFile, $out, LOCK_EX);
echo $out;
