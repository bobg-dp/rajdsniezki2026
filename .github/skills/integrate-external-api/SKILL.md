---
name: integrate-external-api
description: "Add or update an external API integration through the Node micro backend. Use for Elektroniczna Tablica Ogloszen, third-party feeds, backend proxies, response normalization, and secure env-based auth."
argument-hint: "Describe the upstream API, auth method, query params, and where the data should appear in the site."
user-invocable: true
---

# Integrate External API

## When To Use

- Add a new `/api` endpoint backed by a third-party service.
- Integrate Elektroniczna Tablica Ogloszen or another external feed.
- Normalize upstream responses or move secret-bearing requests from frontend to backend.

## Procedure

1. Start from the backend boundary.
   - Add or update the route in `server/index.js` only if that file should expose the HTTP contract.
   - Put upstream communication, normalization, and error mapping in `server/services`.

2. Keep secrets on the server.
   - Do not call the third-party API directly from Vue components when auth keys or CORS workarounds are involved.
   - Read upstream URLs, API keys, and auth header names from env vars.
   - Update `.env.example` in the same change.

3. Normalize the response shape.
   - Return a stable backend contract even if the upstream payload is inconsistent.
   - Prefer clear JSON fields such as `items`, `fetchedAt`, and `source`.
   - Convert upstream failures into controlled backend errors with meaningful status codes.

4. Wire the frontend only to local `/api` routes.
   - Add a small client helper in `src/services` if the data is reused.
   - Keep `VITE_API_BASE_URL` support intact.
   - Avoid leaking upstream response details into multiple components when a shared adapter would do.

5. Consider deployment implications.
   - If the integration needs persistence, caching, or rate limiting, check whether file storage is enough or whether the deployment target requires a managed store.
   - If the target hosting is serverless or ephemeral, do not assume local files are durable.

6. Validate narrowly.
   - Smoke-test the touched backend endpoint with `curl` or equivalent.
   - Run `npm run build` if frontend code changed.

## Output Expectations

- The frontend consumes only same-origin `/api` endpoints.
- Secrets stay in backend env vars.
- The integration has a stable response contract and a clear validation path.
