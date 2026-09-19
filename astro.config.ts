import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Canonical production domain. Keep empty to build without canonical/sitemap/og:url.
const site: string = 'https://picklatrinidad.com';

export default defineConfig({
  site: site || undefined,
  integrations: site ? [sitemap()] : [],
  vite: {
    plugins: [tailwindcss()]
  }
});
