import fs from "node:fs";

/**
 * Wrangler czyta lokalne sekrety z `.dev.vars`, a dotychczasowe pliki
 * `backend.env` / `backend.local.env` zostają źródłem prawdy. Skrypt
 * przepisuje z nich tylko klucze, których używa Worker.
 */
const KEYS = [
  "CORS_ALLOWED_ORIGINS",
  "NOTICE_BOARD_API_URL",
  "NOTICE_BOARD_API_KEY",
  "NOTICE_BOARD_AUTH_HEADER",
  "NOTICE_BOARD_EVENT_ID_RO",
  "NOTICE_BOARD_EVENT_PASSWORD_RO",
  "NOTICE_BOARD_EVENT_ID_RS",
  "NOTICE_BOARD_EVENT_PASSWORD_RS",
  "NOTICE_BOARD_EVENT_ID_KJS",
  "NOTICE_BOARD_EVENT_PASSWORD_KJS",
  "NOTICE_BOARD_MOCK_MODE",
];

function parseEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return {};
  }

  const values = {};

  for (const line of fs.readFileSync(filePath, "utf8").split("\n")) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separator = trimmed.indexOf("=");

    if (separator === -1) {
      continue;
    }

    const key = trimmed.slice(0, separator).trim();
    let value = trimmed.slice(separator + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    values[key] = value;
  }

  return values;
}

const merged = {
  ...parseEnvFile(".env"),
  ...parseEnvFile("backend.env"),
  ...parseEnvFile("backend.local.env"),
};
const lines = KEYS.filter((key) => merged[key]).map(
  (key) => `${key}=${JSON.stringify(merged[key])}`,
);

if (
  !merged.NOTICE_BOARD_MOCK_MODE &&
  !fs.existsSync(".env") &&
  !fs.existsSync("backend.env") &&
  !fs.existsSync("backend.local.env")
) {
  lines.push('NOTICE_BOARD_MOCK_MODE="true"');
}

fs.writeFileSync(".dev.vars", `${lines.join("\n")}\n`);
