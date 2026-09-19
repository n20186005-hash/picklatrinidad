import type { APIRoute } from 'astro';

// Kept in code so the robots file always follows the `site` value set in astro.config.ts.
export const GET: APIRoute = ({ site }) => {
  const lines = ['User-agent: *', 'Allow: /', ''];

  if (site) {
    lines.push(`Sitemap: ${new URL('sitemap-index.xml', site).href}`, '');
  }

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  });
};
