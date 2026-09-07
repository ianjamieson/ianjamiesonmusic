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
| Header, nav and footer shell | `app/layouts/default.vue` |
| Pages | `app/pages/` |
| Prerendered 404 | `app/pages/404.vue` (written to `dist/404.html`) |
| Runtime error page | `app/error.vue` |
| Scroll fade-in wrapper | `app/components/FadeIn.vue` |

`app/utils/site.js` is the only file you should need for routine changes. Anything
still marked `TODO` in there needs a real value.

## Third-party pieces

- **Cal.com** - lesson booking, free plan. Set `calLink`.
- **Bandsintown** - live dates widget. Set `bandsintownArtist`.
- **EmailOctopus** - mailing list. Set `emailOctopusListId`.
- **Cloudflare Web Analytics** - set `cloudflareAnalyticsToken`, or leave blank for no script.
