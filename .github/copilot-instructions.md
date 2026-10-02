# Project Guidelines

## Product Context

- This repository contains the official AMG Rally Karkonosze 2026 website.
- User-facing copy, route slugs, labels, and SEO content should stay in Polish unless an external integration requires another language.

## Architecture

- The frontend uses Vite, Vue 3, Vue Router, and `vite-ssg`. Treat the site as static-first.
- Keep browser-only logic inside client lifecycle hooks such as `onMounted` or behind runtime guards so SSG builds stay safe.
- Keep page-level composition in `src/views`, layout components in `src/components/layout`, homepage sections in `src/components/sections`, and small reusable UI pieces in `src/components/ui`.
- Route definitions and page SEO metadata live in `src/router/index.js`. New pages should include `title`, `description`, and `breadcrumbs` in route `meta` when applicable.
- News content is currently maintained in `src/data/news.js`. Extend that source before introducing another content pipeline.
- The micro backend lives in `server/` and serves same-origin `/api/*` endpoints. External APIs should be called through the backend, not directly from Vue components.
- The visit counter intentionally uses file persistence in `server/data/visits.json` created at runtime. Do not introduce a database for that feature unless the requirement changes or multi-instance deployment makes file storage unsafe.

## Build And Validation

- Use `npm install` to install dependencies.
- Use `npm run dev` to start frontend and backend together.
- Use `npm run dev:frontend` or `npm run dev:backend` when working on only one side.
- Run `npm run build` after changes to frontend code, routes, SEO, or static content.
- After backend changes, smoke-test the touched `/api` endpoint before finishing.

## Deployment

- Treat deployment as two artifacts: static frontend output from `dist/` and a separate Node backend from `server/index.js`.
- Do not assume a static-only hosting model anymore. Any deployment-related change must account for both the generated site and the `/api` backend.
- The backend may run on a separate VPS or host from the frontend. Keep cross-origin access explicit through `CORS_ALLOWED_ORIGINS` instead of allowing all origins.
- Frontend production builds should point `VITE_API_BASE_URL` at the public backend origin when frontend and backend are deployed separately.
- Keep deployment configuration environment-driven. New backend integrations should read secrets and upstream URLs from env vars and be reflected in `.env.example`.
- The current visit counter depends on writable local storage for `server/data/visits.json`. If the target hosting is serverless, read-only, or ephemeral, treat that implementation as non-durable and propose a persistent alternative before shipping.
- When changing deployment behavior, preserve same-origin frontend calls to `/api` where possible. Avoid pushing third-party API keys into frontend runtime code.

## Conventions

- Prefer Vue `script setup` and ES modules.
- Preserve existing route naming and URL style: Polish paths in kebab-case.
- Keep SEO-sensitive content intentional. When adding a page, think about title, description, breadcrumbs, and sitemap impact.
- Keep runtime data out of git. If a backend feature writes local state, ignore that file unless the repository must version seed data.
- When adding backend configuration, update `.env.example` in the same change.
