# jpcservicesinc.com

Website for **JPC Services Inc.**, built with [Astro](https://astro.build) and Tailwind CSS. It replaces the old WordPress/Elementor site.

## Run it locally

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs the finished site to dist/
```

## Where the content lives

Most updates mean editing one file in `src/data/`:

| What | File |
|---|---|
| Phone, email, address, hours, stats, founding year | `src/data/site.ts` |
| Services (title, text, photo) | `src/data/services.ts` |
| Projects | `src/data/projects.ts` (photos in `src/assets/images/projects/`) |
| Google reviews shown on the site | `src/data/reviews.ts` |
| Job openings | `src/data/careers.ts` |

Pages are in `src/pages/`, shared pieces (header, footer, etc.) in `src/components/`.

### Add a project
1. Put photos in `src/assets/images/projects/`.
2. Import them at the top of `src/data/projects.ts` and copy an existing entry.
3. `npm run build`, then deploy (see `DEPLOY.md`).

## Pages

`/` · `/services/` (+ one page per service) · `/projects/` (+ one page per project) · `/about/` · `/justpro/` · `/careers/` · `/contact-us/` · `/privacy/` · `/terms/` · `/thank-you/` · `404`

Old WordPress URLs (`/sungiven/`, `/shop/`, `/cart/`, …) are 301-redirected — see `public/.htaccess` and `astro.config.mjs`.

## Quote form

`src/pages/contact-us.astro` posts to `public/contact.php`, which emails the request (with photos attached) to the address set at the top of that file. It has a spam honeypot and checks uploads are images.

## Later: no-code editing

The content is already in simple data files, so an editor such as Decap CMS or Pages CMS can be added later without rebuilding the site.
