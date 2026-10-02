import fs from "node:fs/promises";

const HIDDEN_ITEM_NAMES = new Set(["__SPECIAL_PRIVATE_DOCUMENTS__"]);

function normalizeConfigValue(value) {
  const normalizedValue = value?.trim();

  return normalizedValue ? normalizedValue : null;
}

function createError(message, statusCode) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function normalizeItems(payload) {
  if (!payload) {
    return [];
  }

  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload.items)) {
    return payload.items;
  }

  if (Array.isArray(payload.results)) {
    return payload.results;
  }

  if (Array.isArray(payload.data)) {
    return payload.data;
  }

  return [];
}

function normalizeSortOrder(value) {
  const parsedValue = Number(value);

  return Number.isFinite(parsedValue) ? parsedValue : null;
}

function normalizeItem(item) {
  const children = normalizeItems(item.children)
    .map(normalizeItem)
    .filter(filterPublicItems)
    .sort(sortItems);

  return {
    id: item.id,
    name: item.name,
    type: item.type ?? "Unknown",
    sortOrder: normalizeSortOrder(item.sort_order),
    createdAt: item.created_at ?? null,
    updatedAt: item.updated_at ?? null,
    eventId: item.event_id ?? null,
    common: Boolean(item.common),
    url: item.url ?? null,
    originalFileName: item.orig_file ?? null,
    text: item.text ?? null,
    children,
    childCount: children.length,
  };
}

function sortItems(firstItem, secondItem) {
  if (
    firstItem.sortOrder !== null &&
    secondItem.sortOrder !== null &&
    firstItem.sortOrder !== secondItem.sortOrder
  ) {
    return firstItem.sortOrder - secondItem.sortOrder;
  }

  if (firstItem.sortOrder !== null) {
    return -1;
  }

  if (secondItem.sortOrder !== null) {
    return 1;
  }

  return firstItem.name.localeCompare(secondItem.name, "pl");
}

function filterPublicItems(item) {
  return Boolean(item.name) && !HIDDEN_ITEM_NAMES.has(item.name);
}

function resolveApiBaseUrl(apiUrl, eventPasswords) {
  const normalizedUrl = normalizeConfigValue(apiUrl);

  if (!normalizedUrl) {
    return "";
  }

  const parsedUrl = new URL(normalizedUrl);
  const passwordSet = new Set(
    Object.values(eventPasswords)
      .map((value) => normalizeConfigValue(value))
      .filter(Boolean),
  );
  const pathSegments = parsedUrl.pathname.split("/").filter(Boolean);
  const lastSegment = pathSegments.at(-1);

  if (lastSegment && passwordSet.has(decodeURIComponent(lastSegment))) {
    pathSegments.pop();
    parsedUrl.pathname = `/${pathSegments.join("/")}`;
  }

  return parsedUrl.toString().replace(/\/$/, "");
}

export function isNoticeBoardMockEnabled(value) {
  return ["1", "true", "yes", "on"].includes(
    (value ?? "").trim().toLowerCase(),
  );
}

export class NoticeBoardClient {
  constructor({
    apiUrl,
    apiKey,
    authHeader,
    eventIds,
    eventPasswords,
    mockMode,
    mockDataPath,
  }) {
    this.apiBaseUrl = resolveApiBaseUrl(apiUrl, eventPasswords);
    this.apiKey = apiKey;
    this.authHeader = authHeader || "X-Sportity-ApiKey";
    this.eventIds = eventIds;
    this.eventPasswords = eventPasswords;
    this.mockMode = mockMode;
    this.mockDataPath = mockDataPath;
  }

  async fetchBoard(board) {
    if (!Object.hasOwn(this.eventIds, board)) {
      throw createError(`Notice board ${board} is not supported.`, 404);
    }

    const eventId = normalizeConfigValue(this.eventIds[board]);
    const eventPassword = normalizeConfigValue(this.eventPasswords[board]);

    if (this.mockMode) {
      return this.fetchMockBoard(board, eventId);
    }

    if (!this.apiBaseUrl) {
      throw createError("NOTICE_BOARD_API_URL is not configured.", 503);
    }

    if (!eventId) {
      throw createError(
        `NOTICE_BOARD_EVENT_ID_${board.toUpperCase()} is not configured.`,
        503,
      );
    }

    if (!eventPassword) {
      throw createError(
        `NOTICE_BOARD_EVENT_PASSWORD_${board.toUpperCase()} is not configured.`,
        503,
      );
    }

    const payload = await this.fetchItems({
      eventId,
      eventPassword,
    });

    return {
      board,
      eventId,
      fetchedAt: new Date().toISOString(),
      source: `${this.apiBaseUrl}/<event-password>/${eventId}`,
      items: normalizeItems(payload)
        .map(normalizeItem)
        .filter(filterPublicItems)
        .sort(sortItems),
    };
  }

  async fetchItems({ eventId, eventPassword }, parentFolderId = null) {
    const upstreamUrl = new URL(
      `${this.apiBaseUrl}/${encodeURIComponent(eventPassword)}/${eventId}`,
    );

    if (parentFolderId) {
      upstreamUrl.searchParams.set("folder_id", parentFolderId);
    }

    const headers = {
      Accept: "application/json",
    };

    if (this.apiKey) {
      headers[this.authHeader] = this.apiKey;
    }

    const response = await fetch(upstreamUrl, { headers });

    if (!response.ok) {
      throw createError(
        `Notice board upstream request failed with status ${response.status}.`,
        502,
      );
    }

    return response.json();
  }

  async fetchMockBoard(board, eventId) {
    if (!this.mockDataPath) {
      throw createError("NOTICE_BOARD_MOCK_DATA_FILE is not configured.", 503);
    }

    try {
      const fileContent = await fs.readFile(this.mockDataPath, "utf8");
      const payload = JSON.parse(fileContent);

      return {
        board,
        eventId,
        fetchedAt: new Date().toISOString(),
        source: "mock",
        items: this.getMockItems(payload)
          .map(normalizeItem)
          .filter(filterPublicItems)
          .sort(sortItems),
      };
    } catch (error) {
      throw createError(
        `Failed to read notice board mock data: ${error.message}`,
        500,
      );
    }
  }

  getMockItems(payload) {
    if (Array.isArray(payload)) {
      return payload;
    }

    return Array.isArray(payload.root) ? payload.root : [];
  }
}
