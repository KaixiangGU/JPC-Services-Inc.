# Deploying to the current hosting (Hustly · Plesk)

The site is hosted on **Hustly Professional WordPress Hosting** (Plesk, prepaid until ~April 2029).
The domain and DNS **do not change** — we only replace the files the server serves.

## Before switching over
1. **Ask Hustly support** (support@hustly.website) to confirm you may serve a static HTML + PHP site from the domain's document root in place of WordPress.
2. **Check email**: in Plesk → *Mail*, see whether any `@jpcservicesinc.com` mailboxes exist. Replacing website files does **not** affect mail, but do not delete the subscription or domain.
3. **Back up WordPress**: Plesk → *WordPress* → *Back up*, or *Backup Manager* → full backup. Download it.
4. Create a mailbox or alias `noreply@jpcservicesinc.com` (Plesk → Mail) so form emails are sent from our own domain (better delivery). The form sends to `jeffpartners@gmail.com` — change `$TO_EMAIL` in `public/contact.php` if needed.

## Deploy
1. On your computer: `npm install && npm run build`.
2. In Plesk → *Files* → `httpdocs/`: move the existing WordPress files into a folder **outside** `httpdocs` (e.g. `wordpress-old/`) so they can be restored.
3. Upload **the contents of `dist/`** into `httpdocs/` (including the hidden `.htaccess` file).
4. Visit https://jpcservicesinc.com, submit a test quote, and check the email arrives (check spam the first time).

## If the server uses nginx only (`.htaccess` ignored)
Plesk → *Websites & Domains* → *Apache & nginx Settings* → **Additional nginx directives**:

```nginx
location = /sungiven/ { return 301 /projects/sungiven-foods-supermarket/; }
location = /home-copy-copy/ { return 301 /; }
location ~ ^/(shop|cart|checkout|my-account|hello-world|delivering-excellence-through-innovative-solutions)/?$ { return 301 /; }
location ~ ^/(category|author|tag)/ { return 301 /; }
location ~* \.(css|js|webp|jpg|jpeg|png|woff2|svg)$ { expires 1y; add_header Cache-Control "public, immutable"; }
error_page 404 /404.html;
```

(Astro also generates simple redirect pages for these URLs, so they work even without server rules.)

## Rolling back
Move `wordpress-old/` contents back into `httpdocs/`.

## Alternative: Netlify (free)
If Hustly can't serve a static site, connect this GitHub repo to Netlify (build command `npm run build`, publish dir `dist`), then point the domain's DNS to Netlify. The quote form would then need Netlify Forms instead of `contact.php`.
