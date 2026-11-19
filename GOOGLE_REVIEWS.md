# Live Google rating

The site shows JPC's Google star rating and review count (e.g. **5.0 ★ · 154 reviews**) and keeps it up to date automatically, using Google's official **Places API (New)**.

How it works:
- At **build time** the numbers are fetched from Google and written into the pages.
- In the **visitor's browser**, a small script calls `/api/google-rating` to refresh them.
  - On **Hustly** this is `public/api/google-rating.php` (caches the answer for 6 hours).
  - On **Netlify** this is `netlify/functions/google-rating.mjs` (cached 6 hours by Netlify).
- If Google is unreachable or no key is set, the last known numbers in `src/data/site.ts` are shown.

The written review texts shown on the site are a hand-picked selection in `src/data/reviews.ts`.

## One-time setup (about 15 minutes)

### 1. Create a Google API key
1. Go to https://console.cloud.google.com/ and sign in with the Google account that manages the JPC business profile.
2. Create a project (e.g. "JPC Website").
3. **APIs & Services → Library** → enable **Places API (New)**.
4. **Billing**: a billing account is required by Google. At ~4 requests a day this stays well inside Google's free monthly usage.
5. **APIs & Services → Credentials → Create credentials → API key.**
6. Click the key → **API restrictions → Restrict key → Places API (New)**. Save.

### 2. Find the Place ID
Open https://developers.google.com/maps/documentation/places/web-service/place-id , search **"JPC Services Inc. Richmond"**, and copy the Place ID (starts with `ChIJ…`).

### 3. Add them to Netlify (preview site)
Netlify → your site → **Site configuration → Environment variables → Add**:
- `GOOGLE_PLACES_API_KEY` = your key
- `GOOGLE_PLACE_ID` = the Place ID

Then **Deploys → Trigger deploy**.

### 4. Add them to Hustly (live site)
In Plesk → **Files**, go to the folder *above* `httpdocs` (your home folder), create a folder `private`, and inside it a file `google-places.php`:

```php
<?php return ['key' => 'YOUR_API_KEY', 'place_id' => 'YOUR_PLACE_ID'];
```

This folder is not reachable from the web, so the key stays private. Never put the key in this GitHub repository.

### Check it works
Open `https://<site>/api/google-rating` — you should see something like `{"rating":"5.0","count":154,"url":"https://maps.google.com/?cid=..."}`.
