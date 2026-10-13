import { onMounted, readonly, ref } from "vue";

const STORAGE_KEY = "rajdsniezki-youtube-consent";
const DISMISS_KEY = "rajdsniezki-youtube-consent-dismissed";

const granted = ref(false);
const dismissed = ref(false);
const ready = ref(false);

function readStorage() {
  if (ready.value || typeof window === "undefined") {
    return;
  }

  try {
    granted.value = window.localStorage.getItem(STORAGE_KEY) === "granted";
    dismissed.value = window.sessionStorage.getItem(DISMISS_KEY) === "1";
  } catch {
    granted.value = false;
    dismissed.value = false;
  }

  ready.value = true;
}

function writeConsent(value) {
  granted.value = value;

  try {
    if (value) {
      window.localStorage.setItem(STORAGE_KEY, "granted");
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // Brak zapisu nie blokuje odtworzenia w tej sesji.
  }
}

export function useYoutubeConsent() {
  onMounted(readStorage);

  function grant() {
    dismissed.value = false;
    writeConsent(true);

    try {
      window.sessionStorage.removeItem(DISMISS_KEY);
    } catch {
      // Sesja i tak kończy się po zamknięciu karty.
    }
  }

  function dismiss() {
    dismissed.value = true;

    try {
      window.sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // Pasek wróci po odświeżeniu, filmy zostaną zablokowane.
    }
  }

  function revoke() {
    dismissed.value = false;
    writeConsent(false);

    try {
      window.sessionStorage.removeItem(DISMISS_KEY);
    } catch {
      // Pasek i tak pojawi się ponownie, bo zgoda została cofnięta.
    }
  }

  return {
    granted: readonly(granted),
    dismissed: readonly(dismissed),
    ready: readonly(ready),
    grant,
    dismiss,
    revoke,
  };
}
