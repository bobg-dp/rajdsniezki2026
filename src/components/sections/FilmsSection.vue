<template>
  <section id="filmy" class="surface-asphalt relative overflow-hidden py-16 md:py-20">
    <div class="relative mx-auto max-w-7xl px-6 md:px-8">
      <div class="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div class="max-w-3xl">
          <p
            class="font-display text-sm font-bold uppercase tracking-[0.32em] text-rally-orange/85"
          >
            Kanał Automobilklubu
          </p>
          <h2
            class="text-rally-slant mt-3 font-display text-4xl font-black uppercase leading-none text-white md:text-6xl"
          >
            Filmy
          </h2>
          <p class="mt-4 max-w-2xl text-sm leading-6 text-rally-snow-dim/75">
            Prezentacje tras są nagrane osobno dla każdej rangi. Film ładuje
            się dopiero po zgodzie, w trybie podwyższonej prywatności.
          </p>
        </div>
        <a
          :href="YOUTUBE_CHANNEL_URL"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex w-fit items-center border border-white/15 px-4 py-2.5 font-display text-xs font-bold uppercase tracking-[0.18em] text-white transition-colors hover:border-rally-orange hover:text-rally-orange"
        >
          Kanał YouTube
        </a>
      </div>

      <div
        class="mb-8 flex flex-wrap items-center gap-2"
        role="group"
        aria-label="Wybierz filmy rangi"
      >
        <button
          v-for="tier in tiers"
          :key="tier.key"
          type="button"
          :aria-pressed="tier.key === activeTierKey"
          class="flex items-baseline gap-2 border px-4 py-2.5 transition-all duration-200"
          :class="
            tier.key === activeTierKey
              ? 'border-rally-orange bg-rally-orange text-white'
              : 'border-white/15 text-rally-snow-dim hover:border-rally-orange/45 hover:text-white'
          "
          @click="selectTier(tier.key)"
        >
          <span class="font-display text-xs font-bold uppercase tracking-[0.22em]">
            {{ tier.code }}
          </span>
          <span class="hidden text-sm font-semibold sm:inline">
            {{ tier.name }}
          </span>
        </button>
      </div>

      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        <YoutubeConsentPlayer
          v-for="video in visibleVideos"
          :key="`${activeTierKey}-${video.id}`"
          :video-id="video.id"
          :title="video.title"
          :subtitle="video.subtitle"
        />
      </div>

      <RouterLink
        v-if="!syncQuery"
        :to="{ path: '/filmy', query: { poziom: activeTierKey } }"
        class="mt-8 inline-flex font-display text-sm font-bold uppercase tracking-[0.18em] text-rally-orange hover:text-white"
      >
        Wszystkie filmy
      </RouterLink>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import YoutubeConsentPlayer from "../ui/YoutubeConsentPlayer.vue";
import { tierKeyFromQuery, tiers } from "../../data/eventConfig.js";
import { getVideosForTier, YOUTUBE_CHANNEL_URL } from "../../data/videos.js";

const props = defineProps({
  syncQuery: { type: Boolean, default: false },
});

const route = useRoute();
const router = useRouter();

const activeTierKey = ref(
  props.syncQuery
    ? (tierKeyFromQuery(route.query.poziom) ?? tiers[0].key)
    : tiers[0].key,
);

const visibleVideos = computed(() => getVideosForTier(activeTierKey.value));

watch(
  () => route.query.poziom,
  (value) => {
    if (!props.syncQuery) {
      return;
    }

    const nextTierKey = tierKeyFromQuery(value) ?? tiers[0].key;

    if (nextTierKey !== activeTierKey.value) {
      activeTierKey.value = nextTierKey;
    }
  },
);

function selectTier(tierKey) {
  activeTierKey.value = tierKey;

  if (!props.syncQuery || route.query.poziom === tierKey) {
    return;
  }

  router.replace({
    path: "/filmy",
    query: { poziom: tierKey },
  });
}
</script>
