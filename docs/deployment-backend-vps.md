# Backend Deployment On VPS

This project can run with the static frontend deployed separately and the backend hosted on a VPS.

The current assumed production setup is:

- Frontend: `https://rajdsniezki.pl`
- Backend API: `https://rajdsniezki.rallydevil.com`

## What Changes In This Model

- The frontend is built statically from `dist/`.
- The backend runs as a long-lived Node process from `server/index.js`.
- The frontend should call the backend through an absolute `VITE_API_BASE_URL`, here `https://rajdsniezki.rallydevil.com`.
- The backend must explicitly allow the frontend origin through `CORS_ALLOWED_ORIGINS`.

## Backend Environment

The backend now uses two repo-level runtime files:

- `backend.env` for production-like backend execution
- `backend.local.env` for local testing and development

By default:

- `npm run dev:backend` loads `backend.env` and then overrides it with `backend.local.env`
- `npm run start:backend` loads `backend.env` only

If you prefer to keep secrets outside the repo on the VPS, set `BACKEND_ENV_FILE` or use `systemd` `EnvironmentFile` as before.

Example `backend.env` values for VPS:

```env
PORT=8787
CORS_ALLOWED_ORIGINS=https://rajdsniezki.pl
NOTICE_BOARD_API_URL=https://admin.sportity.com/api/documents
NOTICE_BOARD_API_KEY=
NOTICE_BOARD_AUTH_HEADER=X-Sportity-ApiKey
NOTICE_BOARD_EVENT_ID_RO=
NOTICE_BOARD_EVENT_PASSWORD_RO=
NOTICE_BOARD_EVENT_ID_RS=
NOTICE_BOARD_EVENT_PASSWORD_RS=
NOTICE_BOARD_MOCK_MODE=false
```

If the frontend will also be available under `https://www.rajdsniezki.pl`, append that origin as well.

The Sportity URL prefix stays the same for both boards. Each board has its own `password` and `event_id`, so the backend builds requests as `base/password/event_id`.

Example `backend.local.env` values for local tests:

```env
PORT=8787
CORS_ALLOWED_ORIGINS=http://localhost:5173
NOTICE_BOARD_API_URL=https://admin.sportity.com/api/documents
NOTICE_BOARD_API_KEY=
NOTICE_BOARD_AUTH_HEADER=X-Sportity-ApiKey
NOTICE_BOARD_EVENT_ID_RO=
NOTICE_BOARD_EVENT_PASSWORD_RO=
NOTICE_BOARD_EVENT_ID_RS=
NOTICE_BOARD_EVENT_PASSWORD_RS=
NOTICE_BOARD_MOCK_MODE=true
NOTICE_BOARD_MOCK_DATA_FILE=server/data/notice-board.sample.json
```

## Frontend Build Environment

When building the frontend for production, set:

```env
VITE_API_BASE_URL=https://rajdsniezki.rallydevil.com
```

If the frontend is built in CI or on a different machine than the VPS, this variable must be present there during `npm run build`.

## Suggested VPS Layout

- Application directory: `/var/www/rajdsniezki`
- Backend process working directory: `/var/www/rajdsniezki`
- Backend service user: dedicated non-root user such as `rally`
- Backend data file: `server/data/visits.json`

## Install And Run

1. Upload the repository to the VPS.
2. Run `npm ci --omit=dev` in the project root.
3. Create `/etc/rajdsniezki/backend.env`.
4. Install the systemd unit from `server/deploy/systemd/rajdsniezki-backend.service.example`.
5. Install the nginx config from `server/deploy/nginx/rajdsniezki-api.conf.example`.
6. Start the service and test `https://rajdsniezki.rallydevil.com/api/health`.

## Important Operational Notes

- `server/data/visits.json` must be writable by the service user.
- The current visit counter is file-based. It works on a single VPS instance, but it is not the right persistence model for multiple backend instances.
- Do not expose the Node process directly to the internet. Put nginx in front of it and terminate TLS there.
- Add an HTTPS certificate for `rajdsniezki.rallydevil.com`, for example with Let's Encrypt.
