// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://jpcservicesinc.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
  // Fallback redirects for old WordPress URLs (static pages; the server-level 301s in public/.htaccess take priority).
  redirects: {
    '/sungiven/': '/projects/sungiven-foods-supermarket/',
    '/home-copy-copy/': '/',
    '/shop/': '/',
    '/cart/': '/',
    '/checkout/': '/',
    '/my-account/': '/',
    '/hello-world/': '/',
    '/delivering-excellence-through-innovative-solutions/': '/',
  },
  integrations: [
    sitemap({ filter: (page) => !page.includes('/thank-you/') }),
  ],
  vite: { plugins: [tailwindcss()] },
});
