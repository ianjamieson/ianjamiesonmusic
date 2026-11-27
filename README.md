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
| Upcoming shows snapshot | `app/data/upcoming-shows.js` |
| Bandsintown fetch | `app/data/bandsintown.js` |
| Header, nav and footer shell | `app/layouts/default.vue` |
| Pages | `app/pages/` |
| Prerendered 404 | `app/pages/404.vue` (written to `dist/404.html`) |
| Runtime error page | `app/error.vue` |
| Scroll fade-in wrapper | `app/components/FadeIn.vue` |

`app/utils/site.js` is the only file you should need for routine changes. Anything
still marked `TODO` in there needs a real value.

## Upcoming shows

Hand-checked dates live in `app/data/upcoming-shows.js`. That file is a snapshot
of the Notion "Music Leads" rows worth publishing (Status = Booked, Type =
Festival or Gig). Notion itself is not fetched.

When the site is generated it also requests Ian's upcoming events from the
Bandsintown API (`app/data/bandsintown.js`, artist id in `app/utils/site.js`).
A date that is not already in the snapshot is added. A date that matches a
snapshot row keeps the snapshot wording, and gains a tickets link when
Bandsintown has one. If Bandsintown cannot be reached, the snapshot is still
published.

To refresh the snapshot, edit the file. For each show set `title` and `place`
to the text that should appear, and `start` / `end` as `YYYY-MM-DD` (`end` is
null for a single day). Put a row that must stay off the site in
`unpublishedShows`, with `published: false` and a comment saying why. Do not
add agreed fees or Ian's role.

The site lists a show only while its end date is today or later in the UK, using
the date at build time, and shows a short empty state when nothing is left.
Run `npm run generate` after editing so the dates are baked into the HTML.

## Third-party pieces

- **Bandsintown** - upcoming dates, fetched at generate time. Set `bandsintownArtistId`.
- **Cal.com** - lesson booking, free plan. Set `calLink`.
- **EmailOctopus** - mailing list. Set `emailOctopusListId`.
- **Cloudflare Web Analytics** - set `cloudflareAnalyticsToken`, or leave blank for no script.
