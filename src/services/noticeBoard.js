const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/$/, "");

function buildApiUrl(path) {
  return `${apiBaseUrl}${path}`;
}

export async function fetchNoticeBoard(board) {
  const response = await fetch(buildApiUrl(`/api/notices/${board}`), {
    headers: {
      Accept: "application/json",
    },
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      payload?.error ??
        `Notice board request failed with status ${response.status}`,
    );
  }

  return payload;
}
