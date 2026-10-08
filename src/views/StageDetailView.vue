<template>
  <div>
    <TheHeader />

    <main class="min-h-screen bg-rally-snow pt-32 pb-20 md:pt-44">
      <div class="mx-auto max-w-7xl px-6 md:px-8 pt-10" v-if="stage">
        <p
          class="font-display text-sm font-bold uppercase tracking-[0.3em] text-rally-orange-dark"
        >
          {{ EVENT_FULL_NAME }}
        </p>

        <div
          class="mt-4 grid gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-start"
        >
          <div>
            <p
              class="font-display text-sm font-bold uppercase tracking-[0.28em] text-rally-navy/55"
            >
              {{ activeVariant.typeLabel }}
            </p>
            <h1
              class="mt-3 font-display text-5xl font-black uppercase leading-none text-rally-navy md:text-7xl"
            >
              {{ activeVariant.headline }}
            </h1>
            <p class="mt-5 max-w-2xl text-lg leading-8 text-rally-navy/75">
              Interaktywny podgląd przebiegu trasy przygotowany na podstawie
              mapy KML organizatora i osadzony na tle OpenStreetMap. To szybki
              punkt wejścia dla kibiców i zawodników przed wyjazdem na oes.
            </p>

            <div class="mt-8 grid gap-4 sm:grid-cols-3">
              <article
                class="rounded-[1.6rem] border border-black/8 bg-white/80 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.06)]"
              >
                <p
                  class="font-display text-xs font-bold uppercase tracking-[0.24em] text-rally-navy/45"
                >
                  Termin
                </p>
                <p
                  class="mt-3 font-display text-2xl font-bold uppercase text-rally-navy"
                >
                  {{ stage.dateLabel }}
                </p>
              </article>

              <article
                class="rounded-[1.6rem] border border-black/8 bg-white/80 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.06)]"
              >
                <p
                  class="font-display text-xs font-bold uppercase tracking-[0.24em] text-rally-navy/45"
                >
                  Dystans
                </p>
                <p
                  class="mt-3 font-display text-2xl font-bold uppercase text-rally-navy"
                >
                  {{ formatStageDistance(activeVariant.distanceKm) }} km
                </p>
              </article>

              <article
                class="rounded-[1.6rem] border border-black/8 bg-white/80 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.06)]"
              >
                <p
                  class="font-display text-xs font-bold uppercase tracking-[0.24em] text-rally-navy/45"
                >
                  Oznaczenie
                </p>
                <p
                  class="mt-3 font-display text-2xl font-bold uppercase text-rally-navy"
                >
                  {{ activeVariant.code }}
                </p>
              </article>
            </div>

            <div
              class="mt-4 rounded-[1.6rem] border border-black/8 bg-white/80 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.06)]"
            >
              <p
                class="font-display text-xs font-bold uppercase tracking-[0.24em] text-rally-navy/45"
              >
                Przebieg na mapie
              </p>
              <div
                class="mt-4 flex flex-wrap gap-3"
                role="group"
                aria-label="Wybierz poziom imprezy"
              >
                <button
                  v-for="variant in stage.tierStages"
                  :key="variant.tierKey"
                  type="button"
                  :aria-pressed="variant.tierKey === activeTierKey"
                  class="flex items-baseline gap-2 border px-3 py-2 transition-colors"
                  :class="
                    variant.tierKey === activeTierKey
                      ? 'border-rally-orange bg-rally-orange text-white'
                      : 'border-rally-navy/12 text-rally-navy hover:border-rally-orange'
                  "
                  @click="selectTier(variant.tierKey)"
                >
                  <span
                    class="font-display text-sm font-bold uppercase tracking-[0.2em]"
                  >
                    {{ tiersByKey[variant.tierKey].code }}
                  </span>
                  <span
                    class="text-sm"
                    :class="
                      variant.tierKey === activeTierKey
                        ? 'text-white/85'
                        : 'text-rally-navy/70'
                    "
                  >
                    {{ variant.code }},
                    {{ formatStageDistance(variant.distanceKm) }} km
                  </span>
                </button>
              </div>
            </div>

            <div class="mt-8 flex flex-wrap gap-3">
              <a
                :href="stage.startMapsUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 rounded-full bg-rally-navy px-5 py-3 font-display text-sm font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-rally-steel"
              >
                Nawiguj do startu
              </a>
              <a
                :href="activeVariant.finishMapsUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 rounded-full border border-rally-navy/15 bg-white px-5 py-3 font-display text-sm font-bold uppercase tracking-[0.2em] text-rally-navy transition-all hover:border-rally-navy/30"
              >
                Nawiguj do mety
              </a>
              <RouterLink
                :to="{ path: '/mapy', query: { poziom: activeTierKey } }"
                class="inline-flex items-center gap-2 rounded-full border border-rally-navy/15 px-5 py-3 font-display text-sm font-bold uppercase tracking-[0.2em] text-rally-navy transition-all hover:border-rally-navy/30"
              >
                Wszystkie odcinki
              </RouterLink>
            </div>
          </div>

          <div
            class="rounded-[2rem] bg-rally-navy-ink p-5 shadow-[0_28px_100px_rgba(0,0,0,0.18)] md:p-7"
          >
            <StageRouteMap
              :key="`${stage.slug}-${activeVariant.tierKey}`"
              :stage="activeVariant"
            />

            <p class="mt-5 text-sm leading-6 text-rally-snow-dim">
              Mapa pokazuje trasę
              {{ tiersByKey[activeVariant.tierKey].code }}, od startu do mety
              lotnej. Pomarańczowy marker oznacza start, biały metę.
            </p>
          </div>
        </div>

        <section
          v-if="stage.videoEmbedUrl"
          class="mt-12 overflow-hidden rounded-[2rem] border border-black/8 bg-white shadow-[0_28px_100px_rgba(0,0,0,0.08)]"
        >
          <div class="border-b border-black/8 px-6 py-5 md:px-8">
            <p
              class="font-display text-sm font-bold uppercase tracking-[0.28em] text-rally-navy/45"
            >
              Film z odcinka
            </p>
            <h2
              class="mt-2 font-display text-3xl font-black uppercase leading-none text-rally-navy md:text-4xl"
            >
              {{ stage.videoTitle || stage.headline }}
            </h2>
            <p class="mt-3 max-w-3xl text-base leading-7 text-rally-navy/75">
              Onboard pomaga szybko zobaczyć charakter próby przed
              wyjazdem na trasę.
            </p>
          </div>

          <div class="bg-rally-navy-ink p-3 md:p-5">
            <div class="overflow-hidden rounded-[1.5rem] bg-black aspect-video">
              <div
                v-if="!isVideoConsentGranted"
                class="flex h-full w-full flex-col justify-between bg-[radial-gradient(circle_at_top,rgba(247,96,3,0.18),transparent_45%),linear-gradient(145deg,#181818,#050505)] p-6 text-white md:p-8"
              >
                <div>
                  <p class="font-display text-xs font-bold uppercase tracking-[0.26em] text-rally-orange">
                    Zewnętrzne wideo
                  </p>
                  <h3 class="mt-3 font-display text-2xl font-black uppercase leading-none md:text-3xl">
                    Załaduj materiał z YouTube po wyrażeniu zgody
                  </h3>
                  <p class="mt-4 max-w-2xl text-sm leading-6 text-rally-snow-dim md:text-base md:leading-7">
                    Film nie jest ładowany automatycznie. Kliknięcie przycisku
                    spowoduje połączenie z YouTube w trybie podwyższonej prywatności.
                  </p>
                </div>

                <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button
                    type="button"
                    class="inline-flex items-center justify-center rounded-full bg-rally-orange px-5 py-3 font-display text-sm font-bold uppercase tracking-[0.18em] text-rally-navy transition-colors hover:bg-rally-orange-dark"
                    @click="grantVideoConsent"
                  >
                    Wyrażam zgodę i odtwarzam
                  </button>
                  <a
                    :href="privacyPolicyPath"
                    class="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-3 font-display text-sm font-bold uppercase tracking-[0.18em] text-white transition-colors hover:border-rally-orange/60 hover:text-rally-orange"
                  >
                    Zasady prywatności
                  </a>
                </div>
              </div>

              <iframe
                v-else
                class="h-full w-full"
                :src="privacyEnhancedVideoUrl"
                :title="stage.videoTitle || stage.headline"
                loading="lazy"
                referrerpolicy="strict-origin-when-cross-origin"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </section>
      </div>

      <div v-else class="mx-auto max-w-4xl px-6 md:px-8">
        <p
          class="font-display text-sm font-bold uppercase tracking-[0.3em] text-rally-orange-dark"
        >
          {{ EVENT_FULL_NAME }}
        </p>
        <h1
          class="mt-4 font-display text-5xl font-black uppercase leading-none text-rally-navy md:text-6xl"
        >
          Nie znaleziono odcinka
        </h1>
        <p class="mt-5 max-w-2xl text-lg leading-8 text-rally-navy/75">
          Ten adres nie prowadzi do opublikowanej strony trasy. Wróć na stronę
          główną, aby zobaczyć dostępne odcinki.
        </p>
        <RouterLink
          to="/#oesy"
          class="mt-8 inline-flex items-center gap-2 rounded-full bg-rally-navy px-5 py-3 font-display text-sm font-bold uppercase tracking-[0.2em] text-white"
        >
          Przejdź do odcinków
        </RouterLink>
      </div>
    </main>

    <TheFooter />
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import TheHeader from "../components/layout/TheHeader.vue";
import TheFooter from "../components/layout/TheFooter.vue";
import StageRouteMap from "../components/ui/StageRouteMap.vue";
import { getStageBySlug } from "../data/stages.js";
import { EVENT_FULL_NAME, tierKeyFromQuery, tiersByKey } from "../data/eventConfig.js";
import { formatStageDistance } from "../utils/stageShape.js";

const route = useRoute();
const router = useRouter();
const isVideoConsentGranted = ref(false);
const privacyPolicyPath = "/polityka-prywatnosci";

const stage = computed(() => getStageBySlug(route.params.slug));

function tierForRoute() {
  const requestedTier = tierKeyFromQuery(route.query.poziom);

  if (requestedTier && stage.value?.tiers.includes(requestedTier)) {
    return requestedTier;
  }

  return stage.value?.tiers[0] ?? "ro";
}

const activeTierKey = ref(tierForRoute());

watch(
  () => [route.params.slug, route.query.poziom],
  () => {
    activeTierKey.value = tierForRoute();
  },
);

function selectTier(tierKey) {
  activeTierKey.value = tierKey;

  if (route.query.poziom === tierKey) {
    return;
  }

  router.replace({
    query: { ...route.query, poziom: tierKey },
  });
}

const activeVariant = computed(() => {
  if (!stage.value) {
    return null;
  }

  return (
    stage.value.tierStages.find(
      (variant) => variant.tierKey === activeTierKey.value,
    ) ?? stage.value.tierStages[0]
  );
});

const privacyEnhancedVideoUrl = computed(() => {
  if (!stage.value?.videoEmbedUrl) {
    return null;
  }

  return stage.value.videoEmbedUrl.replace(
    "https://www.youtube.com/embed/",
    "https://www.youtube-nocookie.com/embed/",
  );
});

function grantVideoConsent() {
  isVideoConsentGranted.value = true;
}
</script>
