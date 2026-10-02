import fs from "node:fs";
import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { fileURLToPath } from "node:url";
import path from "node:path";
import {
  NoticeBoardClient,
  isNoticeBoardMockEnabled,
} from "./services/noticeBoardClient.js";
import { VisitCounterStore } from "./services/visitCounterStore.js";

const rootDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);

function loadEnvFile(filePath, { override = false } = {}) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const parsedValues = dotenv.parse(fs.readFileSync(filePath));

  Object.entries(parsedValues).forEach(([key, value]) => {
    if (!override && process.env[key] !== undefined) {
      return;
    }

    process.env[key] = value;
  });
}

function resolveProjectFilePath(filePath) {
  if (!filePath) {
    return null;
  }

  if (path.isAbsolute(filePath)) {
    return filePath;
  }

  return path.join(rootDir, filePath);
}

const initialEnvironment = { ...process.env };

loadEnvFile(path.join(rootDir, ".env"));
loadEnvFile(path.join(rootDir, "backend.env"), { override: true });

if (process.env.NODE_ENV !== "production") {
  loadEnvFile(path.join(rootDir, "backend.local.env"), { override: true });
}

const explicitEnvFilePath = resolveProjectFilePath(
  process.env.BACKEND_ENV_FILE,
);

if (explicitEnvFilePath) {
  loadEnvFile(explicitEnvFilePath, { override: true });
}

Object.entries(initialEnvironment).forEach(([key, value]) => {
  process.env[key] = value;
});

function parseAllowedOrigins(value) {
  return (value ?? "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function createCorsError(origin) {
  const error = new Error(`Origin ${origin} is not allowed by CORS.`);
  error.statusCode = 403;
  return error;
}

const app = express();
const port = Number(process.env.PORT ?? 8787);
const visitsFilePath = path.join(rootDir, "server", "data", "visits.json");
const allowedOrigins = parseAllowedOrigins(process.env.CORS_ALLOWED_ORIGINS);
const allowAnyOrigin = allowedOrigins.includes("*");
const noticeBoardMockMode = isNoticeBoardMockEnabled(
  process.env.NOTICE_BOARD_MOCK_MODE,
);
const noticeBoardMockDataPath = resolveProjectFilePath(
  process.env.NOTICE_BOARD_MOCK_DATA_FILE,
);

const visitCounterStore = new VisitCounterStore(visitsFilePath);
const noticeBoardClient = new NoticeBoardClient({
  apiUrl: process.env.NOTICE_BOARD_API_URL,
  apiKey: process.env.NOTICE_BOARD_API_KEY,
  authHeader: process.env.NOTICE_BOARD_AUTH_HEADER,
  eventIds: {
    ro: process.env.NOTICE_BOARD_EVENT_ID_RO,
    rs: process.env.NOTICE_BOARD_EVENT_ID_RS,
    kjs: process.env.NOTICE_BOARD_EVENT_ID_KJS,
  },
  eventPasswords: {
    ro: process.env.NOTICE_BOARD_EVENT_PASSWORD_RO,
    rs: process.env.NOTICE_BOARD_EVENT_PASSWORD_RS,
    kjs: process.env.NOTICE_BOARD_EVENT_PASSWORD_KJS,
  },
  mockMode: noticeBoardMockMode,
  mockDataPath: noticeBoardMockDataPath,
});

if (!allowAnyOrigin && allowedOrigins.length === 0) {
  console.warn(
    "CORS_ALLOWED_ORIGINS is empty. Browser requests from other origins will be rejected.",
  );
}

if (noticeBoardMockMode) {
  console.warn(
    "NOTICE_BOARD_MOCK_MODE is enabled. Notice board endpoints will return sample data.",
  );
}

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowAnyOrigin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(createCorsError(origin));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    maxAge: 86400,
  }),
);
app.use(express.json());

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok" });
});

app.get("/api/visits", async (_request, response, next) => {
  try {
    const snapshot = await visitCounterStore.getSnapshot();
    response.set("Cache-Control", "no-store");
    response.json(snapshot);
  } catch (error) {
    next(error);
  }
});

app.post("/api/visits", async (request, response, next) => {
  try {
    const snapshot = await visitCounterStore.increment({
      path: request.get("referer") ?? null,
      userAgent: request.get("user-agent") ?? null,
    });

    response.set("Cache-Control", "no-store");
    response.status(201).json(snapshot);
  } catch (error) {
    next(error);
  }
});

app.get("/api/notices", (_request, response) => {
  response.status(400).json({
    error: "Use /api/notices/ro, /api/notices/rs or /api/notices/kjs.",
  });
});

app.get("/api/notices/:board", async (request, response, next) => {
  try {
    const result = await noticeBoardClient.fetchBoard(request.params.board);
    response.set("Cache-Control", "no-store");
    response.json(result);
  } catch (error) {
    next(error);
  }
});

app.use((error, _request, response, _next) => {
  const statusCode = Number(error.statusCode ?? 500);
  const message = error.message || "Unexpected backend error.";

  response.status(statusCode).json({
    error: message,
  });
});

app.listen(port, () => {
  console.log(`Micro backend listening on http://localhost:${port}`);
});
