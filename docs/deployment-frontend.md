# Frontend Deployment On Cloudflare

The frontend is a fully prerendered site. `npm run build` runs
`scripts/generate-sitemap.js` and then `vite-ssg build`, which writes one HTML
file per route into `dist/`. Nothing is rendered at request time, so the host
only serves files from a CDN.

The backend stays on the VPS, as described in `deployment-backend-vps.md`. The
browser calls it directly over an absolute URL, so the host never proxies
`/api`.

## Target: Workers With Static Assets

Cloudflare directs new projects to Workers rather than Pages; Pages still works
but no longer receives feature work. A Worker serving static assets covers this
site completely, so that is the target here.

Why Cloudflare over Netlify for this project:

- Bandwidth is unmetered. This site ships heavy images (the news poster is
  ~370 kB, `rmp.jpg` and `rsmds.jpg` are ~1 MB each) and rally traffic spikes
  on event days. Netlify's free tier stops at 100 GB/month and bills overage.
- There is a Warsaw edge location, so Polish visitors are served locally.
- The API domain on the VPS can go behind the same Cloudflare account, which
  adds TLS, caching and DDoS protection in front of the Node process.

One constraint to know up front: a Worker can only take a custom domain that is
a zone in Cloudflare DNS. Pages could attach domains hosted elsewhere; Workers
cannot. The nameservers for `rajdsniezki.pl` therefore have to point at
Cloudflare.

## Repository Configuration

`wrangler.jsonc` holds everything the deploy needs:

- `assets.directory` is `./dist`.
- `assets.not_found_handling` is `404-page`, so unmatched paths get the
  prerendered `dist/404.html` with a 404 status.
- There is no `main` and no `assets.binding`. This is an assets-only Worker;
  a binding without `main` is rejected by Wrangler.
- `html_handling` is left at its default, which serves `/kontakt` from
  `kontakt.html`.

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

## Required Build Variable

```env
VITE_API_BASE_URL=https://rajdsniezki.rallydevil.com
```

This goes in `Settings` → `Builds` → build variables, **not** in the Worker's
runtime `Variables & Secrets`. Build variables exist only while the build runs,
which is exactly what is needed: Vite inlines the value into the bundle at build
time and nothing reads it at runtime.

Without it the frontend requests `/api/...` on its own domain, where nothing is
listening, and the visit counter plus notice board stop working. The pages still
render, because both services swallow fetch errors — so a missing variable fails
quietly. Set it before the first deploy and redeploy after any change.

## Static Asset Headers

`public/_headers` is copied into `dist/` during the build. Workers parses it and
applies the rules to static asset responses; the file itself is not served. It
sets security headers and cache lifetimes — read the comments in it before
editing, especially the note about overlapping rules.

## Backend Side Of The Deploy

`CORS_ALLOWED_ORIGINS` on the VPS must list the exact origin the browser uses.
The backend compares origins literally, with no wildcard support:

```env
CORS_ALLOWED_ORIGINS=https://rajdsniezki.pl,https://www.rajdsniezki.pl
```

Preview builds get their own generated URL, which is not covered by the entries
above. In previews the counter and notice board will fail while the rest of the
page works. Add the preview origin to the list when a preview needs live API
data.

## Custom Domain

1. Add `rajdsniezki.pl` to Cloudflare as a zone and change the nameservers at
   the registrar.
2. Attach the domain to the Worker under its `Domains & Routes` settings, for
   both the apex and `www`.
3. Keep the API on its own hostname on the VPS so the two deploys stay
   independent.
4. `SITE_URL` in `src/data/eventConfig.js` drives canonical URLs, the sitemap
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
