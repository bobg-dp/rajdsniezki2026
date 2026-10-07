<template>
  <div>
    <TheHeader />
    <main class="min-h-screen pt-32 md:pt-48 pb-20">
      <div class="max-w-7xl mx-auto px-6 md:px-8">
        <div class="flex flex-wrap items-center gap-4 md:gap-6 mb-6">
          <div
            v-for="logo in logos"
            :key="logo.src"
            class="flex items-center justify-center w-28 h-14 md:w-36 md:h-16"
          >
            <img
              :src="logo.src"
              :alt="logo.alt"
              class="max-w-full max-h-full object-contain"
              loading="lazy"
            />
          </div>
        </div>

        <p
          class="font-display font-bold uppercase tracking-[0.3em] text-rally-orange text-sm mb-2"
        >
          {{ seriesLabel }}
        </p>
        <h1
          class="font-display font-black uppercase text-rally-navy text-4xl md:text-6xl mb-6"
        >
          {{ pageTitle }}<br />Elektroniczna Tablica Ogłoszeń
        </h1>

        <div
          class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between mb-10"
        >
          <p class="max-w-3xl text-rally-steel leading-relaxed">
            {{ pageDescription }}
          </p>

          <div class="flex flex-wrap gap-3">
            <RouterLink
              :to="backPath"
              class="inline-flex items-center justify-center border border-rally-navy px-5 py-3 font-display font-bold uppercase text-xs tracking-wider text-rally-navy hover:bg-rally-navy hover:text-white transition-colors"
            >
              {{ backLabel }}
            </RouterLink>
            <button
              type="button"
              class="inline-flex items-center justify-center bg-rally-navy px-5 py-3 font-display font-bold uppercase text-xs tracking-wider text-white hover:bg-rally-steel transition-colors disabled:cursor-wait disabled:opacity-60"
              :disabled="isLoading"
              @click="loadBoard"
            >
              {{ isLoading ? "Ładowanie..." : "Odśwież tablicę" }}
            </button>
          </div>
        </div>

        <div class="grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div class="space-y-8">
            <section
              v-if="errorMessage"
              class="border border-red-200 bg-red-50 px-6 py-5 text-red-900"
            >
              <p
                class="font-display font-bold uppercase text-sm tracking-wider mb-2"
              >
                Nie udało się pobrać tablicy ogłoszeń
              </p>
              <p class="text-sm leading-relaxed">{{ errorMessage }}</p>
            </section>

            <section
              v-if="isLoading && !boardData"
              class="border border-gray-200 bg-gray-50 px-6 py-10"
            >
              <p
                class="font-display font-bold uppercase text-rally-navy text-lg mb-2"
              >
                Ładowanie tablicy ogłoszeń
              </p>
              <p class="text-rally-steel text-sm">
                Pobieramy najnowsze komunikaty i dokumenty z zewnętrznego API.
              </p>
            </section>

            <template v-else-if="boardData">
              <section
                v-if="publicationItems.length"
                class="border border-gray-200 bg-white px-6 py-8 md:px-8"
              >
                <div
                  class="flex flex-col gap-2 md:flex-row md:items-start md:justify-between mb-6"
                >
                  <div>
                    <p
                      class="font-display font-bold uppercase text-rally-orange text-xs tracking-widest mb-2"
                    >
                      Aktualne publikacje
                    </p>
                    <h2
                      class="font-display font-bold uppercase text-rally-navy text-2xl"
                    >
                      Dokumenty
                    </h2>
                  </div>
                  <p
                    v-if="fetchedAtLabel"
                    class="text-xs text-gray-500 uppercase tracking-wider"
                  >
                    Ostatnie odświeżenie: {{ fetchedAtLabel }}
                  </p>
                </div>

                <div class="space-y-4">
                  <article
                    v-for="item in publicationItems"
                    :key="item.id"
                    class="border border-gray-200 bg-gray-50 p-5"
                  >
                    <div class="flex flex-wrap items-center gap-2 mb-3">
                      <span
                        class="inline-flex items-center bg-rally-navy px-3 py-1 font-display font-bold uppercase text-[11px] tracking-wider text-white"
                      >
                        {{ itemTypeLabel(item) }}
                      </span>
                      <span v-if="item.updatedAt" class="text-xs text-gray-500">
                        Aktualizacja: {{ formatTimestamp(item.updatedAt) }}
                      </span>
                    </div>

                    <h3
                      class="font-display font-bold uppercase text-rally-navy text-xl mb-3"
                    >
                      {{ item.name }}
                    </h3>

                    <p
                      v-if="item.type === 'Text'"
                      class="text-rally-steel leading-relaxed whitespace-pre-line"
                    >
                      {{ item.text }}
                    </p>

                    <template v-else>
                      <p
                        v-if="item.originalFileName"
                        class="text-rally-steel text-sm mb-4"
                      >
                        {{ item.originalFileName }}
                      </p>
                      <a
                        v-if="item.url"
                        :href="item.url"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-flex items-center justify-center bg-rally-navy px-5 py-3 font-display font-bold uppercase text-xs tracking-wider text-white hover:bg-rally-steel transition-colors"
                      >
                        Otwórz dokument
                      </a>
                    </template>
                  </article>
                </div>
              </section>

              <section
                v-if="folderItems.length"
                class="border border-gray-200 bg-gray-50 px-6 py-8 md:px-8"
              >
                <p
                  class="font-display font-bold uppercase text-rally-orange text-xs tracking-widest mb-2"
                >
                  Sekcje tablicy
                </p>
                <h2
                  class="font-display font-bold uppercase text-rally-navy text-2xl mb-6"
                >
                  Foldery organizatora
                </h2>

                <div class="space-y-4">
                  <NoticeBoardTreeNode
                    v-for="item in folderItems"
                    :key="item.id"
                    :item="item"
                  />
                </div>
              </section>

              <section
                v-if="!publicationItems.length && !folderItems.length"
                class="border border-gray-200 bg-gray-50 px-6 py-10"
              >
                <p
                  class="font-display font-bold uppercase text-rally-navy text-lg mb-2"
                >
                  Brak opublikowanych pozycji
                </p>
                <p class="text-rally-steel text-sm leading-relaxed">
                  Organizator nie opublikował jeszcze dokumentów ani komunikatów
                  dla tej tablicy.
                </p>
              </section>
            </template>
          </div>

          <aside class="space-y-4">
            <section class="bg-rally-navy px-6 py-7 text-white">
              <p
                class="font-display font-bold uppercase text-rally-orange text-xs tracking-widest mb-2"
              >
                Źródło danych
              </p>
              <h2 class="font-display font-bold uppercase text-xl mb-3"></h2>
              <p class="text-sm text-gray-300 leading-relaxed">
                {{ sourceDescription }}
              </p>
            </section>

            <section class="border border-gray-200 bg-gray-50 px-6 py-7">
              <p
                class="font-display font-bold uppercase text-rally-orange text-xs tracking-widest mb-2"
              >
                Zakres publikacji
              </p>
              <h2
                class="font-display font-bold uppercase text-rally-navy text-xl mb-4"
              >
                Co pojawia się na tablicy
              </h2>
              <ul class="space-y-3 text-sm text-rally-steel leading-relaxed">
                <li>Komunikaty i informacje tekstowe od organizatora.</li>
                <li>Dokumenty PDF i inne pliki opublikowane do pobrania.</li>
                <li>
                  Foldery i sekcje uporządkowane zgodnie z kolejnością w
                  systemie tablicy.
                </li>
              </ul>
            </section>
          </aside>
        </div>
      </div>
    </main>
    <TheFooter />
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { RouterLink } from "vue-router";
import TheFooter from "../components/layout/TheFooter.vue";
import TheHeader from "../components/layout/TheHeader.vue";
import NoticeBoardTreeNode from "../components/ui/NoticeBoardTreeNode.vue";
import { fetchNoticeBoard } from "../services/noticeBoard.js";

const dateTimeFormatter = new Intl.DateTimeFormat("pl-PL", {
  dateStyle: "medium",
  timeStyle: "short",
});

const props = defineProps({
  board: {
    type: String,
    required: true,
  },
  seriesLabel: {
    type: String,
    required: true,
  },
  pageTitle: {
    type: String,
    required: true,
  },
  pageDescription: {
    type: String,
    required: true,
  },
  backPath: {
    type: String,
    required: true,
  },
  backLabel: {
    type: String,
    required: true,
  },
  logos: {
    type: Array,
    default: () => [],
  },
});

const boardData = ref(null);
const errorMessage = ref("");
const isLoading = ref(false);
let latestLoadRequestId = 0;

const folderItems = computed(
  () => boardData.value?.items?.filter((item) => item.type === "Folder") ?? [],
);

const publicationItems = computed(
  () => boardData.value?.items?.filter((item) => item.type !== "Folder") ?? [],
);

const fetchedAtLabel = computed(() =>
  formatTimestamp(boardData.value?.fetchedAt),
);

const sourceDescription = computed(() =>
  props.board === "kjs"
    ? "Dane są pobierane na żywo z Rally Devil."
    : "Dane są pobierane na żywo z zasobów Sportity.com",
);

function formatTimestamp(value) {
  if (!value) {
    return null;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return dateTimeFormatter.format(date);
}

function itemTypeLabel(item) {
  if (item.label) {
    return item.label;
  }

  if (item.type === "PDF") {
    return "Dokument PDF";
  }

  if (item.type === "Text") {
    return "Komunikat";
  }

  return item.type;
}

async function loadBoard(options) {
  const resetData =
    options && typeof options === "object" && "resetData" in options
      ? Boolean(options.resetData)
      : false;
  const requestId = ++latestLoadRequestId;

  isLoading.value = true;
  errorMessage.value = "";

  if (resetData) {
    boardData.value = null;
  }

  try {
    const nextBoardData = await fetchNoticeBoard(props.board);

    if (requestId !== latestLoadRequestId) {
      return;
    }

    boardData.value = nextBoardData;
  } catch (error) {
    if (requestId !== latestLoadRequestId) {
      return;
    }

    errorMessage.value =
      error instanceof Error
        ? error.message
        : "Wystąpił nieoczekiwany błąd podczas pobierania tablicy.";
  } finally {
    if (requestId === latestLoadRequestId) {
      isLoading.value = false;
    }
  }
}

watch(
  () => props.board,
  () => {
    void loadBoard({ resetData: true });
  },
  { immediate: true },
);
</script>
