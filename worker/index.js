import { createNoticeBoardClient } from "./noticeBoard.js";
import { getVisits, incrementVisits } from "./visits.js";

function json(body, status, extraHeaders) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...extraHeaders,
    },
  });
}

function corsHeaders(request, env) {
  const origin = request.headers.get("Origin");
  const allowed = (env.CORS_ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  if (!origin || !allowed.includes(origin)) {
    return {};
  }

  return {
    "access-control-allow-origin": origin,
    "access-control-allow-methods": "GET, POST, OPTIONS",
    "access-control-allow-headers": "Content-Type",
    vary: "Origin",
  };
}

async function handleApi(request, env, url) {
  const headers = corsHeaders(request, env);

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }

  const path = url.pathname.replace(/\/$/, "") || "/";

  if (path === "/api/health" && request.method === "GET") {
    return json({ status: "ok" }, 200, headers);
  }

  if (path === "/api/visits" && request.method === "GET") {
    return json(await getVisits(env.DB), 200, headers);
  }

  if (path === "/api/visits" && request.method === "POST") {
    return json(await incrementVisits(env.DB), 201, headers);
  }

  if (path === "/api/notices" && request.method === "GET") {
    return json(
      { error: "Use /api/notices/ro, /api/notices/rs or /api/notices/kjs." },
      400,
      headers,
    );
  }

  const noticeMatch = path.match(/^\/api\/notices\/([^/]+)$/);

  if (noticeMatch && request.method === "GET") {
    const board = decodeURIComponent(noticeMatch[1]);
    const result = await createNoticeBoardClient(env).fetchBoard(board);
    return json(result, 200, headers);
  }

  return json({ error: "Not found." }, 404, headers);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname !== "/api" && !url.pathname.startsWith("/api/")) {
      return env.ASSETS.fetch(request);
    }

    try {
      return await handleApi(request, env, url);
    } catch (error) {
      const statusCode = Number(error.statusCode ?? 500);

      return json(
        { error: error.message || "Unexpected backend error." },
        statusCode,
        corsHeaders(request, env),
      );
    }
  },
};
