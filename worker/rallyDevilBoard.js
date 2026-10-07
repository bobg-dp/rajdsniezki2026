const DEFAULT_INFO_BOARD_URL =
  "https://c3po.rallydevil.com/functions/v1/get-info-board";

const PRIORITY_LABELS = {
  0: "Informacja",
  1: "Niski",
  2: "Średni",
  3: "Ważny",
  4: "Pilny",
  5: "Krytyczny",
  info: "Informacja",
  low: "Niski",
  medium: "Średni",
  important: "Ważny",
  urgent: "Pilny",
  critical: "Krytyczny",
};

function createError(message, statusCode) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function asObject(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  return value;
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function pick(record, keys) {
  if (!record) {
    return null;
  }

  for (const key of keys) {
    const value = record[key];

    if (value !== undefined && value !== null && value !== "") {
      return value;
    }
  }

  return null;
}

function asText(value) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return String(value);
  }

  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();

  return trimmed || null;
}

function unwrapPayload(payload) {
  const record = asObject(payload);

  if (!record) {
    return {};
  }

  for (const key of ["data", "result", "board"]) {
    const nested = asObject(record[key]);

    if (
      nested &&
      (nested.announcements ||
        nested.messages ||
        nested.files ||
        nested.documents ||
        nested.rallyName ||
        nested.rally_name ||
        nested.name)
    ) {
      return nested;
    }
  }

  return record;
}

function priorityLabel(value) {
  if (value === undefined || value === null || value === "") {
    return null;
  }

  if (typeof value === "string" && PRIORITY_LABELS[value.trim().toLowerCase()]) {
    return PRIORITY_LABELS[value.trim().toLowerCase()];
  }

  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    return null;
  }

  return PRIORITY_LABELS[parsed] ?? null;
}

const PRIORITY_RANKS = {
  info: 0,
  low: 1,
  medium: 2,
  important: 3,
  urgent: 4,
  critical: 5,
};

function priorityRank(value) {
  const parsed = Number(value);

  if (Number.isFinite(parsed)) {
    return parsed;
  }

  if (typeof value !== "string") {
    return 0;
  }

  return PRIORITY_RANKS[value.trim().toLowerCase()] ?? 0;
}

function timestamp(record) {
  return asText(
    pick(record, [
      "updatedAt",
      "updated_at",
      "publishedAt",
      "published_at",
      "publishedDate",
      "published_date",
      "createdAt",
      "created_at",
      "addedDate",
      "added_date",
    ]),
  );
}

function documentType(url, fileName) {
  const source = `${fileName ?? ""} ${url ?? ""}`.toLowerCase();

  return source.includes(".pdf") ? "PDF" : "Dokument";
}

function looksLikeAnnouncement(record) {
  return Boolean(
    pick(record, ["title", "content", "body", "message", "text", "priority"]),
  );
}

function fileUrl(record) {
  return asText(
    pick(record, [
      "url",
      "fileUrl",
      "file_url",
      "publicUrl",
      "public_url",
      "href",
    ]),
  );
}

function collectList(payload, keys) {
  for (const key of keys) {
    const list = asArray(payload[key]).filter((item) => asObject(item));

    if (list.length) {
      return list;
    }
  }

  return [];
}

function toDocument(record, fallbackName) {
  const url = fileUrl(record);
  const name =
    asText(
      pick(record, ["name", "title", "fileName", "file_name", "orig_file"]),
    ) ?? fallbackName;

  if (!name && !url) {
    return null;
  }

  return {
    id: asText(pick(record, ["id"])) ?? `rd-file-${name ?? url}`,
    name: name ?? "Dokument",
    type: documentType(url, name),
    url,
    originalFileName:
      asText(pick(record, ["fileName", "file_name", "orig_file", "originalFileName"])) ??
      name,
    createdAt: timestamp(record),
    updatedAt: timestamp(record),
    priority: 0,
  };
}

function toAnnouncement(record, index) {
  const title = asText(pick(record, ["title", "name"])) ?? "Komunikat";
  const text = asText(
    pick(record, ["content", "body", "message", "text", "description"]),
  );
  const priority = pick(record, ["priority", "level", "severity"]);
  const label = priorityLabel(priority);
  const attachments = asArray(
    pick(record, ["attachments", "files", "documents"]) ?? [],
  )
    .map((attachment) =>
      toDocument(
        asObject(attachment) ?? {},
        asText(pick(asObject(attachment), ["fileName", "name"])) ?? title,
      ),
    )
    .filter(Boolean);

  return {
    id: asText(pick(record, ["id"])) ?? `rd-announcement-${index}`,
    name: title,
    type: "Text",
    label: label ? `Komunikat · ${label}` : null,
    text,
    createdAt: timestamp(record),
    updatedAt: timestamp(record),
    priority: priorityRank(priority),
    attachments,
  };
}

function dedupeDocuments(documents) {
  const seen = new Set();

  return documents.filter((document) => {
    const key = `${document.url ?? ""}|${document.name}`;

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

export function normalizeRallyDevilBoard(payload) {
  const record = unwrapPayload(payload);
  let announcements = collectList(record, [
    "announcements",
    "messages",
    "komunikaty",
  ]).filter(looksLikeAnnouncement);
  let files = collectList(record, ["files", "documents", "publikacje"]);

  if (!announcements.length && !files.length && Array.isArray(payload)) {
    announcements = payload.filter(
      (item) => asObject(item) && looksLikeAnnouncement(item),
    );
    files = payload.filter(
      (item) => asObject(item) && fileUrl(item) && !looksLikeAnnouncement(item),
    );
  }

  const announcementItems = announcements.map(toAnnouncement);
  const documents = dedupeDocuments([
    ...files.map((file) => toDocument(file)).filter(Boolean),
    ...announcementItems.flatMap((item) => item.attachments),
  ]);

  const items = [
    ...announcementItems.map(({ attachments, ...item }) => item),
    ...documents,
  ].sort((first, second) => {
    if (first.priority !== second.priority) {
      return second.priority - first.priority;
    }

    const firstTime = Date.parse(first.updatedAt ?? first.createdAt ?? "") || 0;
    const secondTime = Date.parse(second.updatedAt ?? second.createdAt ?? "") || 0;

    return secondTime - firstTime;
  });

  return items.map((item, index) => ({
    id: item.id,
    name: item.name,
    type: item.type,
    label: item.label ?? null,
    sort_order: index,
    created_at: item.createdAt,
    updated_at: item.updatedAt,
    url: item.url ?? null,
    orig_file: item.originalFileName ?? null,
    text: item.text ?? null,
  }));
}

export function rallyNameFromPayload(payload) {
  const record = unwrapPayload(payload);

  return asText(
    pick(record, ["rallyName", "rally_name", "name"]) ??
      pick(asObject(record.rally), ["name", "title"]),
  );
}

export async function fetchRallyDevilBoard({ url, apiKey, password }) {
  const normalizedKey = asText(apiKey);
  const normalizedPassword = asText(password);

  if (!normalizedKey) {
    throw createError(
      "Brak klucza tablicy Rally Devil (RALLYDEVIL_INFO_BOARD_KEY).",
      503,
    );
  }

  if (!normalizedPassword) {
    throw createError(
      "Brak hasła tablicy Rally Devil (RALLYDEVIL_INFO_BOARD_PASSWORD).",
      503,
    );
  }

  const endpoint = asText(url) ?? DEFAULT_INFO_BOARD_URL;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-info-board-key": normalizedKey,
      "x-info-board-password": normalizedPassword,
    },
    body: JSON.stringify({
      apiKey: normalizedKey,
      password: normalizedPassword,
    }),
  });

  if (response.status === 401 || response.status === 403) {
    throw createError(
      "Rally Devil odrzucił dostęp do tablicy KJS. Sprawdź, czy dostęp jest włączony oraz czy klucz i hasło są aktualne.",
      502,
    );
  }

  if (!response.ok) {
    throw createError(
      `Nie udało się pobrać tablicy Rally Devil (status ${response.status}).`,
      502,
    );
  }

  const payload = await response.json().catch(() => null);

  if (!payload || typeof payload !== "object") {
    throw createError(
      "Rally Devil zwrócił tablicę w nieobsługiwanym formacie.",
      502,
    );
  }

  return payload;
}
