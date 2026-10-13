<template>
  <div
    v-if="visible"
    ref="panel"
    class="fixed inset-x-0 bottom-0 z-80 border-t border-white/10 bg-rally-navy-ink text-white shadow-[0_-18px_50px_rgba(0,0,0,0.35)]"
    role="dialog"
    aria-labelledby="youtube-consent-title"
    aria-describedby="youtube-consent-text"
  >
    <div class="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between md:px-8 md:py-5">
      <div class="max-w-3xl">
        <p
          id="youtube-consent-title"
          class="font-display text-xs font-bold uppercase tracking-[0.26em] text-rally-orange"
        >
          Filmy z YouTube
        </p>
        <p id="youtube-consent-text" class="mt-2 text-sm leading-6 text-rally-snow">
          Materiały wideo nie ładują się same. Po zgodzie wszystkie filmy na
          stronie odtworzą się bez ponownego pytania, w trybie podwyższonej
          prywatności. Wybór zostaje zapisany tylko w tej przeglądarce.
          <RouterLink
            to="/polityka-prywatnosci"
            class="font-semibold text-white underline decoration-white/40 underline-offset-4 hover:text-rally-orange hover:decoration-rally-orange"
          >
            Polityka prywatności
          </RouterLink>
        </p>
      </div>

      <div class="flex shrink-0 flex-col gap-2 sm:flex-row">
        <button
          type="button"
          class="inline-flex items-center justify-center bg-rally-orange px-5 py-3 font-display text-sm font-bold uppercase tracking-[0.16em] text-rally-navy transition-colors hover:bg-rally-orange-dark"
          @click="grant"
        >
          Zgadzam się
        </button>
        <button
          type="button"
          class="inline-flex items-center justify-center border border-white/20 px-5 py-3 font-display text-sm font-bold uppercase tracking-[0.16em] text-white transition-colors hover:border-white/50"
          @click="dismiss"
        >
          Nie teraz
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, ref, watch } from "vue";
import { RouterLink } from "vue-router";
import { useYoutubeConsent } from "../../composables/useYoutubeConsent.js";

const { granted, dismissed, ready, grant, dismiss } = useYoutubeConsent();
const panel = ref(null);
const visible = computed(() => ready.value && !granted.value && !dismissed.value);

let observer;

function syncOffset() {
  if (typeof document === "undefined") {
    return;
  }

  const height = visible.value ? (panel.value?.offsetHeight ?? 0) : 0;
  document.documentElement.style.setProperty("--youtube-consent-offset", `${height}px`);
}

watch(visible, async (isVisible) => {
  await nextTick();
  observer?.disconnect();
  observer = null;

  if (isVisible && panel.value && typeof ResizeObserver !== "undefined") {
    observer = new ResizeObserver(syncOffset);
    observer.observe(panel.value);
  }

  syncOffset();
});

onBeforeUnmount(() => {
  observer?.disconnect();

  if (typeof document !== "undefined") {
    document.documentElement.style.setProperty("--youtube-consent-offset", "0px");
  }
});
</script>
