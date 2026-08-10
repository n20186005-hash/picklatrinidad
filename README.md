# Strawberry Farm — La Trinidad visitor guide

Single-page independent visitor guide built with Astro, Tailwind CSS and TypeScript for Cloudflare Workers static assets.

## Runtime

- Node.js 24.19.0
- pnpm 11.21.0

## Commands

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm check
pnpm build
pnpm deploy
```

`pnpm deploy` builds first, then runs the deployment CLI at the exact version `wrangler@4.120.0` via `pnpm dlx`. The site is static, so no Astro server adapter is required; Wrangler uploads `./dist` as Workers Static Assets.

## Domain configuration

Set the production domain in **one place only**: the `site` constant in `astro.config.ts`.

When it is empty:

- builds still succeed;
- canonical and `og:url` are omitted;
- JSON-LD omits the site URL;
- `@astrojs/sitemap` is not enabled, so no placeholder-domain sitemap is produced.

After a real domain is chosen, fill that one value and rebuild. Sitemap URLs, canonical URLs, Open Graph URLs and JSON-LD URL fields will derive from the Astro `site` configuration.

## Data policy

The itinerary uses browser `localStorage` only. There is no database, account system, CMS or server-side user-data storage.
