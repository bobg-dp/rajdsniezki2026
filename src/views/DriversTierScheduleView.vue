<template>
  <div>
    <TheHeader />

    <main class="min-h-screen pt-32 pb-20 md:pt-48">
      <div class="mx-auto max-w-7xl px-6 md:px-8">
        <TierPageHeader
          :tier="tier"
          title="Harmonogram"
          :show-licence-note="false"
        />

        <div
          class="mb-10 flex flex-wrap gap-2 md:gap-3"
          role="group"
          aria-label="Wybierz harmonogram"
        >
          <button
            v-for="option in tiers"
            :key="option.key"
            type="button"
            :aria-pressed="option.key === activeTierKey"
            :class="[
              'group flex items-center gap-2.5 border px-4 py-2.5 transition-colors duration-200',
              option.key === activeTierKey
                ? 'border-rally-orange bg-rally-orange text-rally-navy'
                : 'border-rally-navy/15 bg-white text-rally-navy hover:border-rally-orange hover:text-rally-orange-dark',
            ]"
            @click="selectTier(option.key)"
          >
            <span class="font-display text-xl font-black italic leading-none">
              {{ option.code }}
            </span>
            <span
              :class="[
                'h-5 w-px',
                option.key === activeTierKey ? 'bg-rally-navy/25' : 'bg-rally-navy/15',
              ]"
            ></span>
            <span
              class="font-display text-xs font-bold uppercase tracking-[0.16em] md:text-sm"
            >
              {{ option.name }}
            </span>
          </button>
        </div>

        <div v-if="schedule" class="space-y-10">
          <div v-for="day in schedule" :key="day.shortDate">
            <div class="flex items-stretch">
              <div
                :class="[
                  'flex shrink-0 flex-col justify-center px-5 py-3',
                  day.isRaceDay ? 'bg-rally-orange' : 'bg-rally-navy',
                ]"
              >
                <p
                  :class="[
                    'mb-1 font-display text-xs font-bold uppercase leading-none tracking-widest',
                    day.isRaceDay ? 'text-rally-navy/60' : 'text-rally-orange',
                  ]"
                >
                  {{ day.dayOfWeek }}
                </p>
                <p
                  :class="[
                    'font-display text-2xl font-black uppercase leading-none',
                    day.isRaceDay ? 'text-rally-navy' : 'text-white',
                  ]"
                >
                  {{ day.shortDate }}
                </p>
              </div>
              <div
                class="flex flex-1 items-center border border-b-0 border-l-0 border-gray-200 bg-gray-50 px-5"
              >
                <p
                  class="font-display text-sm font-semibold uppercase tracking-wider text-gray-600"
                >
                  {{ day.label }}
                </p>
              </div>
            </div>

            <p v-if="day.note" class="border border-t-0 border-gray-200 bg-white px-5 py-4 text-sm leading-relaxed text-rally-steel">
              {{ day.note }}
            </p>
            <ItineraryTable v-if="day.groups" :day="day" />
          </div>
        </div>

        <PendingPanel
          v-else
          title="Harmonogram w przygotowaniu"
          :description="`Terminarz ${tier.name} zostanie opublikowany razem z regulaminem uzupełniającym. ${scheduleHint}`"
          :action-to="`/${tier.slug}/tablica`"
          action-label="Przejdź do tablicy ogłoszeń"
        />
      </div>
    </main>

    <TheFooter />
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import TheHeader from "../components/layout/TheHeader.vue";
import TheFooter from "../components/layout/TheFooter.vue";
import TierPageHeader from "../components/layout/TierPageHeader.vue";
import ItineraryTable from "../components/ui/ItineraryTable.vue";
import PendingPanel from "../components/ui/PendingPanel.vue";
import {
  getTier,
  schedule as eventSchedule,
  tierKeyFromQuery,
  tiers,
} from "../data/eventConfig.js";
import { getTierSchedule } from "../data/tierContent.js";

const route = useRoute();
const router = useRouter();

const activeTierKey = ref(tierKeyFromQuery(route.query.poziom) ?? tiers[0].key);
const tier = computed(() => getTier(activeTierKey.value));
const schedule = computed(() => getTierSchedule(activeTierKey.value));

watch(
  () => route.query.poziom,
  (value) => {
    const nextTierKey = tierKeyFromQuery(value) ?? tiers[0].key;

    if (nextTierKey !== activeTierKey.value) {
      activeTierKey.value = nextTierKey;
    }
  },
);

function selectTier(tierKey) {
  activeTierKey.value = tierKey;

  if (route.query.poziom === tierKey) {
    return;
  }

  router.replace({
    path: "/harmonogram",
    query: { poziom: tierKey },
  });
}

const scheduleHint = computed(() =>
  eventSchedule.confirmed
    ? `Termin rajdu: ${eventSchedule.dateLabel}.`
    : "Data rajdu nie została jeszcze ogłoszona.",
);
</script>
