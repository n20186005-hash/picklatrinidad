import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Configure the production domain here only. Leave empty until a domain is chosen.
const site: string = '';

export default defineConfig({
  site: site || undefined,
  integrations: site ? [sitemap()] : [],
  vite: {
    plugins: [tailwindcss()]
  }
});
