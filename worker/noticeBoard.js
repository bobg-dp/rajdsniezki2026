import sampleBoard from "../server/data/notice-board.sample.json";
import {
  fetchRallyDevilBoard,
  normalizeRallyDevilBoard,
  rallyNameFromPayload,
} from "./rallyDevilBoard.js";

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
    label: item.label ?? null,
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

export function createNoticeBoardClient(env) {
  return new NoticeBoardClient({
    apiUrl: env.NOTICE_BOARD_API_URL,
    apiKey: env.NOTICE_BOARD_API_KEY,
    authHeader: env.NOTICE_BOARD_AUTH_HEADER,
    eventIds: {
      ro: env.NOTICE_BOARD_EVENT_ID_RO,
      rs: env.NOTICE_BOARD_EVENT_ID_RS,
      kjs: env.NOTICE_BOARD_EVENT_ID_KJS,
    },
    eventPasswords: {
      ro: env.NOTICE_BOARD_EVENT_PASSWORD_RO,
      rs: env.NOTICE_BOARD_EVENT_PASSWORD_RS,
      kjs: env.NOTICE_BOARD_EVENT_PASSWORD_KJS,
    },
    rallyDevil: {
      url: env.RALLYDEVIL_INFO_BOARD_URL,
      apiKey: env.RALLYDEVIL_INFO_BOARD_KEY,
      password: env.RALLYDEVIL_INFO_BOARD_PASSWORD,
    },
    mockMode: isNoticeBoardMockEnabled(env.NOTICE_BOARD_MOCK_MODE),
  });
}

class NoticeBoardClient {
  constructor({
    apiUrl,
    apiKey,
    authHeader,
    eventIds,
    eventPasswords,
    rallyDevil,
    mockMode,
  }) {
    this.apiBaseUrl = resolveApiBaseUrl(apiUrl, eventPasswords);
    this.apiKey = apiKey;
    this.authHeader = authHeader || "X-Sportity-ApiKey";
    this.eventIds = eventIds;
    this.eventPasswords = eventPasswords;
    this.rallyDevil = rallyDevil ?? {};
    this.mockMode = mockMode;
  }

  async fetchBoard(board) {
    if (!Object.hasOwn(this.eventIds, board)) {
      throw createError(`Notice board ${board} is not supported.`, 404);
    }

    const eventId = normalizeConfigValue(this.eventIds[board]);
    const eventPassword = normalizeConfigValue(this.eventPasswords[board]);

    if (this.mockMode) {
      return {
        board,
        eventId,
        fetchedAt: new Date().toISOString(),
        source: "mock",
        items: normalizeItems(sampleBoard.root)
          .map(normalizeItem)
          .filter(filterPublicItems)
          .sort(sortItems),
      };
    }

    if (board === "kjs") {
      const payload = await fetchRallyDevilBoard(this.rallyDevil);

      return {
        board,
        eventId: null,
        eventName: rallyNameFromPayload(payload),
        fetchedAt: new Date().toISOString(),
        source: "rallydevil",
        items: normalizeRallyDevilBoard(payload)
          .map(normalizeItem)
          .filter(filterPublicItems)
          .sort(sortItems),
      };
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
}
