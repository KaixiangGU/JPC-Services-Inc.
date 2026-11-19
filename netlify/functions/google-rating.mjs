// Live Google rating for the Netlify preview. Set GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID
// in Netlify → Site configuration → Environment variables. Netlify's CDN caches the answer for 6 hours.
export default async () => {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  const json = (body, status = 200, cache = 'public, max-age=3600, s-maxage=21600') =>
    new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': cache } });
  if (!key || !placeId) return json({ error: 'not configured' }, 503, 'no-store');
  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`, {
      headers: { 'X-Goog-Api-Key': key, 'X-Goog-FieldMask': 'rating,userRatingCount,googleMapsUri' },
    });
    const d = await res.json();
    if (!res.ok || typeof d.rating !== 'number') return json({ error: 'unavailable' }, 502, 'no-store');
    return json({ rating: d.rating.toFixed(1), count: d.userRatingCount ?? 0, url: d.googleMapsUri ?? '' });
  } catch {
    return json({ error: 'unavailable' }, 502, 'no-store');
  }
};

export const config = { path: '/api/google-rating' };
