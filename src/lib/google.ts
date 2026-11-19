// Fetches the live Google rating at build time (Google Places API, New).
// Needs GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID in the build environment; otherwise
// falls back to the numbers in src/data/site.ts. See GOOGLE_REVIEWS.md.
import { site } from '../data/site';

export type GoogleStats = { rating: string; count: number; url: string };

let cached: Promise<GoogleStats> | undefined;

async function load(): Promise<GoogleStats> {
  const fallback: GoogleStats = { rating: site.stats.googleRating, count: site.stats.googleReviews, url: site.mapsUrl };
  const key = import.meta.env.GOOGLE_PLACES_API_KEY ?? process.env.GOOGLE_PLACES_API_KEY;
  const placeId = import.meta.env.GOOGLE_PLACE_ID ?? process.env.GOOGLE_PLACE_ID;
  if (!key || !placeId) return fallback;
  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`, {
      headers: { 'X-Goog-Api-Key': key, 'X-Goog-FieldMask': 'rating,userRatingCount,googleMapsUri' },
    });
    if (!res.ok) throw new Error(`Places API ${res.status}`);
    const d = (await res.json()) as { rating?: number; userRatingCount?: number; googleMapsUri?: string };
    return {
      rating: typeof d.rating === 'number' ? d.rating.toFixed(1) : fallback.rating,
      count: d.userRatingCount ?? fallback.count,
      url: d.googleMapsUri ?? fallback.url,
    };
  } catch (e) {
    console.warn('[google] using fallback rating:', (e as Error).message);
    return fallback;
  }
}

export function getGoogleStats(): Promise<GoogleStats> {
  return (cached ??= load());
}
