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
- The API is a Cloudflare Worker in `worker/`. It serves same-origin `/api/*` and static files come from `dist/`. External APIs should be called through the Worker, not directly from Vue components.
- The visit counter is a single row in the D1 database bound as `DB`. Schema changes go in `worker/migrations/`.

## Build And Validation

- Use `npm install` to install dependencies.
- Use `npm run dev` to start frontend and backend together.
- Use `npm run dev:frontend` or `npm run dev:backend` when working on only one side.
- Run `npm run build` after changes to frontend code, routes, SEO, or static content.
- After backend changes, smoke-test the touched `/api` endpoint before finishing.

## Deployment

- Deploy the site and the API together with `wrangler deploy`. `dist/` is the static asset directory and `worker/index.js` handles `/api/*`.
- Leave `VITE_API_BASE_URL` empty so the browser calls `/api` on the same origin. Set it only when the API is hosted elsewhere.
- Keep deployment configuration environment-driven. New backend integrations should read secrets and upstream URLs from Worker env vars and be reflected in `.env.example`. Production secrets are set with `wrangler secret put`.
- Avoid pushing third-party API keys into frontend runtime code.

## Conventions

- Prefer Vue `script setup` and ES modules.
- Preserve existing route naming and URL style: Polish paths in kebab-case.
- Keep SEO-sensitive content intentional. When adding a page, think about title, description, breadcrumbs, and sitemap impact.
- Keep runtime data out of git. If a backend feature writes local state, ignore that file unless the repository must version seed data.
- When adding backend configuration, update `.env.example` in the same change.
