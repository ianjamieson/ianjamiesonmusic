# ianjamiesonmusic.co.uk

Nuxt 4 site for Ian Jamieson - music, live dates, guitar lessons.
Statically generated and deployed to Cloudflare Pages.

## Develop

```bash
npm install
npm run dev          # http://localhost:3000
```

## Build and deploy

```bash
npm run generate     # static output into dist/
npm run deploy       # generate, then wrangler pages deploy
```

`build` and `generate` both run `nuxt generate`. The site is fully static - there is
no Cloudflare Worker. Do not switch back to plain `nuxt build`: it emits a worker
that fails to boot, which turns every unknown URL into a 500 instead of a 404.

If a build looks stale or behaves oddly, clear the caches first:

```bash
trash dist .output node_modules/.cache && npm run generate
```

## Where things live

| What | Where |
| --- | --- |
| Site-wide settings, IDs and tokens | `app/utils/site.js` |
| Upcoming Shows (Bandsintown) | `app/data/bandsintown.js` |
| Header, nav and footer shell | `app/layouts/default.vue` |
| Pages | `app/pages/` |
| Prerendered 404 | `app/pages/404.vue` (written to `dist/404.html`) |
| Runtime error page | `app/error.vue` |
| Scroll fade-in wrapper | `app/components/FadeIn.vue` |

`app/utils/site.js` is the only file you should need for routine changes. Anything
still marked `TODO` in there needs a real value.

## Upcoming shows

The Upcoming Shows page is filled only from the Bandsintown API, when the site
is generated. Dates that are not on Bandsintown are not shown. The artist id
is `bandsintownArtistId` in `app/utils/site.js`.

A show stays listed while its end date is today or later in the UK, using the
date at build time. If nothing is upcoming, the page shows a short empty state.
Run `npm run generate` to publish a new set of dates.

## Third-party pieces

- **Bandsintown** - the only source for Upcoming Shows. Set `bandsintownArtistId`.
- **Cal.com** - lesson booking, free plan. Set `calLink`.
- **EmailOctopus** - mailing list. Set `emailOctopusListId`.
- **Cloudflare Web Analytics** - set `cloudflareAnalyticsToken`, or leave blank for no script.
