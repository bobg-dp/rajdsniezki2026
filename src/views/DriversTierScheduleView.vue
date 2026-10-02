<template>
  <div>
    <TheHeader />

    <main class="min-h-screen pt-32 pb-20 md:pt-48">
      <div class="mx-auto max-w-5xl px-6 md:px-8">
        <TierPageHeader :tier="tier" subtitle="Harmonogram" />

        <TierSwitcher :active-key="tier.key" class="mb-10" />

        <div v-if="schedule.length" class="space-y-10">
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

            <div class="divide-y divide-gray-100 border border-t-0 border-gray-200">
              <div
                v-for="(event, index) in day.events"
                :key="index"
                class="flex items-start transition-colors hover:bg-gray-50"
              >
                <div class="w-36 shrink-0 border-r border-gray-100 px-4 py-4 md:w-44">
                  <span class="font-display text-sm font-bold leading-snug text-rally-navy">
                    {{ event.time }}
                  </span>
                </div>
                <div class="flex-1 px-5 py-4">
                  <p
                    class="font-display text-sm font-semibold uppercase leading-snug tracking-wide text-rally-navy"
                  >
                    {{ event.name }}
                  </p>
                  <p v-if="event.location" class="mt-1 text-xs leading-snug text-gray-500">
                    {{ event.location }}
                  </p>
                </div>
              </div>
            </div>
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
import { computed } from "vue";
import TheHeader from "../components/layout/TheHeader.vue";
import TheFooter from "../components/layout/TheFooter.vue";
import TierPageHeader from "../components/layout/TierPageHeader.vue";
import TierSwitcher from "../components/ui/TierSwitcher.vue";
import PendingPanel from "../components/ui/PendingPanel.vue";
import { getTier, schedule as eventSchedule } from "../data/eventConfig.js";
import { getTierSchedule } from "../data/tierContent.js";

const props = defineProps({
  tierKey: { type: String, required: true },
});

const tier = computed(() => getTier(props.tierKey));
const schedule = computed(() => getTierSchedule(props.tierKey));

const scheduleHint = computed(() =>
  eventSchedule.confirmed
    ? `Termin rajdu: ${eventSchedule.dateLabel}.`
    : "Data rajdu nie została jeszcze ogłoszona.",
);
</script>
