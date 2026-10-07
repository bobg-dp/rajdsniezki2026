# Frontend Deployment On Cloudflare

The frontend is a fully prerendered site. `npm run build` runs
`scripts/generate-sitemap.js` and then `vite-ssg build`, which writes one HTML
file per route into `dist/`. Pages are files on the CDN. The only code that
runs per request is the API under `/api`.

The API lives in the same Worker. `worker/index.js` handles `/api/*` and
everything else is a static file from `dist/`. The browser calls `/api` on the
site's own origin, so there is no separate API host and no CORS list.

## Target: Workers With Static Assets

Cloudflare directs new projects to Workers rather than Pages; Pages still works
but no longer receives feature work. A Worker serving static assets covers this
site completely, so that is the target here.

Why Cloudflare over Netlify for this project:

- Bandwidth is unmetered. This site ships heavy images (the news poster is
  ~370 kB, `rmp.jpg` and `rsmds.jpg` are ~1 MB each) and rally traffic spikes
  on event days. Netlify's free tier stops at 100 GB/month and bills overage.
- There is a Warsaw edge location, so Polish visitors are served locally.
- The visit counter and the Sportity proxy run in the same Worker, so there
  is no second host to keep online.

One constraint to know up front: a Worker can only take a custom domain that is
a zone in Cloudflare DNS. Pages could attach domains hosted elsewhere; Workers
cannot. The nameservers for `rajdsniezki.pl` therefore have to point at
Cloudflare.

## Repository Configuration

`wrangler.jsonc` holds everything the deploy needs:

- `assets.directory` is `./dist`.
- `assets.not_found_handling` is `404-page`, so unmatched paths get the
  prerendered `dist/404.html` with a 404 status.
- `main` is `worker/index.js`. `assets.binding` is `ASSETS`, which the script
  uses only when a request is not under `/api`.
- `assets.run_worker_first` is `/api/*`, so HTML, CSS and images are served
  without invoking the script. Those requests do not count toward the free
  plan's 100,000 Worker requests per day.
- `html_handling` is left at its default, which serves `/kontakt` from
  `kontakt.html`.
- `d1_databases` binds the visit counter. `database_id` starts as a zero UUID
  so `wrangler dev` works before the remote database exists.

`wrangler` is a devDependency so the version is pinned. Workers Builds uses the
Wrangler version from `package.json`, which keeps CI from silently jumping to a
new major.

Validate changes to that file locally with:

```sh
npx wrangler deploy --dry-run
```

## Workers Builds Settings

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Preview command | `npx wrangler preview` |
| Root directory | empty |

Node version comes from `.nvmrc` (22). If a build picks a different version,
add a `NODE_VERSION` build variable set to `22`.

## Do Not Set VITE_API_BASE_URL

Leave this build variable unset, and delete it if it was added for the old VPS
API. An empty value makes the browser call `/api` on the same host as the
pages. A leftover absolute URL would keep sending the counter and the notice
board to the previous host.

## Static Asset Headers

`public/_headers` is copied into `dist/` during the build. Workers parses it and
applies the rules to static asset responses; the file itself is not served. It
sets security headers and cache lifetimes — read the comments in it before
editing, especially the note about overlapping rules.

## API On The Same Worker

One-time setup, from the repo, while logged in to Wrangler:

```sh
npx wrangler d1 create rajdsniezki
```

Paste the printed id into `database_id` in `wrangler.jsonc`, then apply the
visit-counter migration to the remote database:

```sh
npx wrangler d1 migrations apply rajdsniezki --remote
```

Sportity credentials are runtime secrets, not build variables. Set each one
that the rally actually uses:

```sh
npx wrangler secret put NOTICE_BOARD_API_KEY
npx wrangler secret put NOTICE_BOARD_EVENT_ID_RO
npx wrangler secret put NOTICE_BOARD_EVENT_PASSWORD_RO
npx wrangler secret put NOTICE_BOARD_EVENT_ID_RS
npx wrangler secret put NOTICE_BOARD_EVENT_PASSWORD_RS
npx wrangler secret put RALLYDEVIL_INFO_BOARD_KEY
npx wrangler secret put RALLYDEVIL_INFO_BOARD_PASSWORD
```

RO and RS use Sportity. KJS uses Rally Devil (`POST /functions/v1/get-info-board`)
and does not need `NOTICE_BOARD_EVENT_ID_KJS` or `NOTICE_BOARD_EVENT_PASSWORD_KJS`.
`NOTICE_BOARD_API_URL`, `NOTICE_BOARD_AUTH_HEADER` and `RALLYDEVIL_INFO_BOARD_URL`
already have defaults in `wrangler.jsonc`. The Rally Devil key and password are
runtime secrets, same as the Sportity ones: set them on the worker
`rajdsniezki2026` and deploy. Build variables are not visible at runtime.
Until the credentials for a tier are set, that tier's notice board responds
with 503 and the rest of the site keeps working.

Locally, `npm run dev` runs Wrangler on port 8787 and Vite proxies `/api` to
it. Wrangler reads `.dev.vars`, which `scripts/write-dev-vars.mjs` rebuilds
from `.env`, `backend.env` and `backend.local.env`.

## Custom Domain

1. Add `rajdsniezki.pl` to Cloudflare as a zone and change the nameservers at
   the registrar.
2. Attach the domain to the Worker under its `Domains & Routes` settings, for
   both the apex and `www`.
3. `SITE_URL` in `src/data/eventConfig.js` drives canonical URLs, the sitemap
   and schema.org output. It must match the production domain exactly.

## Error Page

The catch-all route in `src/router/index.js` renders `views/NotFoundView.vue`.
`includedRoutes` in `src/main.js` prerenders it under `/404`, which produces
`dist/404.html`. The page is marked `noindex,nofollow` and is not listed in the
sitemap.

If a route is ever added without a prerendered HTML file, visitors will land on
this page instead, so check `dist/` after adding routes.

## Known Gaps

- No Content-Security-Policy is set. Adding one needs allowances for Google
  Fonts and OpenStreetMap tiles.
