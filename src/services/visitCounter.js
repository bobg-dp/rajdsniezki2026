import { reactive } from "vue";

const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/$/, "");

export const visitCounterState = reactive({
  totalVisits: null,
  error: null,
  isLoading: false,
});

let visitRequest = null;

function buildApiUrl(path) {
  return `${apiBaseUrl}${path}`;
}

export async function trackVisit() {
  if (visitRequest) {
    return visitRequest;
  }

  visitCounterState.isLoading = true;

  visitRequest = fetch(buildApiUrl("/api/visits"), {
    method: "POST",
  })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(
          `Visit counter request failed with status ${response.status}`,
        );
      }

      const payload = await response.json();
      visitCounterState.totalVisits = payload.totalVisits;
      visitCounterState.error = null;

      return payload;
    })
    .catch((error) => {
      visitCounterState.error = error;
      return null;
    })
    .finally(() => {
      visitCounterState.isLoading = false;
    });

  return visitRequest;
}
