<?php
/**
 * Quote request handler for jpcservicesinc.com.
 * Runs on the Plesk (Hustly) hosting. Emails the request, with any photos attached,
 * to the address below, then sends the visitor to /thank-you/.
 */

// ---- Settings ----------------------------------------------------------
$TO_EMAIL   = 'jeffpartners@gmail.com';
$FROM_EMAIL = 'noreply@jpcservicesinc.com';   // must be on our own domain for good deliverability
$MAX_FILES  = 5;
$MAX_FILE_BYTES  = 10 * 1024 * 1024;          // 10 MB per photo
$MAX_TOTAL_BYTES = 25 * 1024 * 1024;          // 25 MB total
$ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/heic', 'image/heif'];
// -------------------------------------------------------------------------

function fail(string $msg, int $code = 400): void {
    http_response_code($code);
    header('Content-Type: text/html; charset=utf-8');
    $safe = htmlspecialchars($msg, ENT_QUOTES, 'UTF-8');
    echo "<!doctype html><meta charset=utf-8><meta name=viewport content='width=device-width,initial-scale=1'>"
       . "<title>Request not sent</title><body style='font-family:system-ui,sans-serif;max-width:560px;margin:4rem auto;padding:0 1rem;line-height:1.5'>"
       . "<h1 style='color:#0d223f'>Sorry, your request wasn’t sent</h1><p>$safe</p>"
       . "<p>Please <a href='javascript:history.back()'>go back</a> and try again, or call us at <a href='tel:+17788888688'>778-888-8688</a>.</p></body>";
    exit;
}

function clean_line(string $v, int $max = 200): string {
    $v = trim(preg_replace('/[\r\n\t]+/', ' ', $v));   // no header injection
    return mb_substr($v, 0, $max);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: /contact-us/', true, 303);
    exit;
}

// Honeypot: real visitors never see or fill this field.
if (!empty($_POST['website'])) {
    header('Location: /thank-you/', true, 303);
    exit;
}

$name    = clean_line($_POST['name'] ?? '', 100);
$email   = clean_line($_POST['email'] ?? '', 150);
$phone   = clean_line($_POST['phone'] ?? '', 40);
$service = clean_line($_POST['service'] ?? '', 80);
$source  = clean_line($_POST['source'] ?? '', 80);
$address = clean_line($_POST['address'] ?? '', 200);
$city    = clean_line($_POST['city'] ?? '', 80);
$message = mb_substr(trim($_POST['message'] ?? ''), 0, 5000);

if ($name === '' || $phone === '' || $address === '' || $city === '' || $message === '') {
    fail('Please fill in all required fields.');
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    fail('Please enter a valid email address.');
}

// ---- Attachments ----
$attachments = [];
if (!empty($_FILES['photos']) && is_array($_FILES['photos']['name'])) {
    $finfo = new finfo(FILEINFO_MIME_TYPE);
    $total = 0;
    $count = count($_FILES['photos']['name']);
    for ($i = 0; $i < $count; $i++) {
        $err = $_FILES['photos']['error'][$i];
        if ($err === UPLOAD_ERR_NO_FILE) continue;
        if ($err !== UPLOAD_ERR_OK) fail('One of the photos could not be uploaded. Try smaller photos.');
        if (count($attachments) >= $MAX_FILES) fail("Please attach up to $MAX_FILES photos.");
        $tmp  = $_FILES['photos']['tmp_name'][$i];
        $size = (int) $_FILES['photos']['size'][$i];
        if (!is_uploaded_file($tmp)) fail('Invalid upload.');
        if ($size > $MAX_FILE_BYTES) fail('Each photo must be under 10 MB.');
        $total += $size;
        if ($total > $MAX_TOTAL_BYTES) fail('Photos are too large in total (25 MB max).');
        $mime = $finfo->file($tmp) ?: 'application/octet-stream';
        if (!in_array($mime, $ALLOWED_MIME, true)) fail('Photos must be JPG, PNG, GIF, WEBP or HEIC.');
        $base = preg_replace('/[^A-Za-z0-9._-]+/', '_', basename($_FILES['photos']['name'][$i]));
        $attachments[] = ['name' => $base ?: "photo-$i", 'mime' => $mime, 'data' => file_get_contents($tmp)];
    }
}

// ---- Build email ----
$subject = 'New quote request: ' . ($service ?: 'General') . " — $name";
$body = "New quote request from jpcservicesinc.com\n\n"
      . "Name:     $name\n"
      . "Email:    $email\n"
      . "Phone:    $phone\n"
      . "Service:  " . ($service ?: '-') . "\n"
      . "Address:  $address, $city\n"
      . "Heard via: " . ($source ?: '-') . "\n"
      . "Photos:   " . count($attachments) . "\n\n"
      . "Description:\n$message\n";

$boundary = 'jpc_' . bin2hex(random_bytes(12));
$headers  = "From: JPC Website <$FROM_EMAIL>\r\n"
          . "Reply-To: " . mb_encode_mimeheader($name) . " <$email>\r\n"
          . "MIME-Version: 1.0\r\n"
          . "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

$mime  = "--$boundary\r\n"
       . "Content-Type: text/plain; charset=UTF-8\r\n"
       . "Content-Transfer-Encoding: base64\r\n\r\n"
       . chunk_split(base64_encode($body)) . "\r\n";
foreach ($attachments as $a) {
    $mime .= "--$boundary\r\n"
          .  "Content-Type: {$a['mime']}; name=\"{$a['name']}\"\r\n"
          .  "Content-Transfer-Encoding: base64\r\n"
          .  "Content-Disposition: attachment; filename=\"{$a['name']}\"\r\n\r\n"
          .  chunk_split(base64_encode($a['data'])) . "\r\n";
}
$mime .= "--$boundary--\r\n";

$ok = mail($TO_EMAIL, mb_encode_mimeheader($subject, 'UTF-8'), $mime, $headers, "-f$FROM_EMAIL");
if (!$ok) {
    fail('Our mail server had a problem.', 500);
}

header('Location: /thank-you/', true, 303);
exit;
