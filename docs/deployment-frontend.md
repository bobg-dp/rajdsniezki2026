# Frontend Deployment On A Static Host

The frontend is a fully prerendered site. `npm run build` runs
`scripts/generate-sitemap.js` and then `vite-ssg build`, which writes one HTML
file per route into `dist/`. There is no server-side rendering at request time,
so the static host only serves files from a CDN.

The backend stays on the VPS, as described in `deployment-backend-vps.md`. The
browser calls it directly over an absolute URL, so the static host never needs
to proxy `/api`.

## Recommended Host: Cloudflare Pages

Both Cloudflare Pages and Netlify serve this project without any code change.
Cloudflare Pages is the better fit here:

- Bandwidth is unmetered. This site ships heavy images (the news poster is
  ~370 kB, `rmp.jpg` and `rsmds.jpg` are ~1 MB each) and rally traffic spikes
  on event days. Netlify's free tier stops at 100 GB/month and bills overage.
- There is a Warsaw edge location, so Polish visitors are served locally.
- The API domain on the VPS can go behind the same Cloudflare account, which
  adds TLS, caching and DDoS protection in front of the Node process.

Netlify remains a valid fallback and the settings below are nearly identical.

## Build Settings

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Output directory | `dist` |
| Node version | from `.nvmrc` (22) |
| Install command | default (`npm ci`) |

`public/_headers` is copied into `dist/` during the build and is read by both
platforms. It sets security headers and cache lifetimes; see the comments in
that file before editing.

## Required Build Environment Variable

```env
VITE_API_BASE_URL=https://rajdsniezki.rallydevil.com
```

This is baked into the bundle at build time, not read at runtime. Without it
the frontend requests `/api/...` on its own domain, where nothing is listening,
and the visit counter plus notice board stop working. The pages themselves
still render, because both services swallow fetch errors — so a missing
variable fails quietly. Set it in the host's build settings before the first
deploy and redeploy after any change.

## Backend Side Of The Deploy

`CORS_ALLOWED_ORIGINS` on the VPS must list the exact origin the browser uses.
The backend compares origins literally, with no wildcard support:

```env
CORS_ALLOWED_ORIGINS=https://rajdsniezki.pl,https://www.rajdsniezki.pl
```

Preview deployments get generated subdomains (`*.pages.dev` on Cloudflare,
`*.netlify.app` on Netlify). They are not covered by the entries above, so in
previews the counter and notice board will fail while the rest of the page
works. Add a specific preview origin to the list when a preview needs live API
data.

## Custom Domain

1. Point `rajdsniezki.pl` at the host (Cloudflare Pages: add the domain in the
   project; if DNS is already in Cloudflare the records are created for you).
2. Keep the API on its own hostname on the VPS so the two deploys stay
   independent.
3. `SITE_URL` in `src/data/eventConfig.js` drives canonical URLs, the sitemap
   and schema.org output. It must match the production domain exactly.

## Error Page

The catch-all route in `src/router/index.js` renders `views/NotFoundView.vue`.
`includedRoutes` in `src/main.js` prerenders it under `/404`, which makes
`dist/404.html`. Cloudflare Pages and Netlify both serve that file, with a 404
status, for any path that has no matching file. The page is marked
`noindex,nofollow` and is not listed in the sitemap.

If a route is ever added without a prerendered HTML file, visitors will land on
this page instead, so check `dist/` after adding routes.

## Known Gaps

- No Content-Security-Policy is set. Adding one needs allowances for Google
  Fonts and OpenStreetMap tiles.
