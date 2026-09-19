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

The production domain is `https://picklatrinidad.com`, set in **one place only**: the `site` constant in `astro.config.ts`. Canonical tags, `og:url`, JSON-LD URL fields, `robots.txt` sitemap line and `@astrojs/sitemap` output all derive from it.

Leave `site` empty when building without a canonical host:

- builds still succeed;
- canonical and `og:url` are omitted;
- JSON-LD omits the site URL;
- no placeholder-domain sitemap is produced.

## Search-engine setup that lives outside this repository

These steps are done in the Cloudflare dashboard and Search Console, not in code:

1. **HTTP → HTTPS 301.** Turn on Cloudflare *SSL/TLS → Edge Certificates → Always Use HTTPS* for the zone so `http://picklatrinidad.com/*` 301-redirects to `https://picklatrinidad.com/*`. A `_redirects` file cannot cover this case: Workers `_redirects` matches request paths, not hosts, so domain-level redirects are unsupported there.
2. **Submit the sitemap** in Search Console: `https://picklatrinidad.com/sitemap-index.xml`.
3. **Keep the verified HTTPS property** as the primary one; historical `http://` URLs lose traffic share once the 301 is live.
4. **Google Business Profile** for the Strawberry Farm is owned by the operator; contact them to point the listing at the guide where relevant.

## Data policy

The itinerary uses browser `localStorage` only. There is no database, account system, CMS or server-side user-data storage.

## Weather module

The “La Trinidad weather right now” block fetches current conditions and a 7-day outlook in the visitor’s browser and caches the result in `sessionStorage` for about 30 minutes. Readings are turned into plain-language, actionable advice across three sections — **出行穿搭 / 游玩安排 / 随身物品** — plus a red risk banner that appears only when conditions warrant it. Sections with nothing to say are never rendered, and visitors never see provider, plan or key details anywhere on the page.

## Image naming convention

Photos in `public/images/` use a stable, kebab-case pattern with a zero-padded numeric suffix:

```text
la-trinidad-strawberry-farm-01.webp
la-trinidad-strawberry-farm-02.webp
la-trinidad-strawberry-farm-03.webp
la-trinidad-strawberry-farm-04.webp
la-trinidad-strawberry-farm-05.webp
```

Keep the same `name-NN.ext` shape for new assets so references stay predictable.

## Files not uploaded

`.gitignore` excludes `node_modules/`, build output (`dist/`, `.astro/`), editor caches and Wrangler state. The deploy command uploads only `./dist` as Workers Static Assets, so source files, configs and `node_modules` are never sent to Cloudflare.

