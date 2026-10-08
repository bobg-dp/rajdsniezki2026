<template>
  <div class="space-y-10">
    <div v-for="day in days" :key="day.shortDate">
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
          :key="`${day.shortDate}-${index}`"
          class="flex items-start transition-colors hover:bg-gray-50"
        >
          <div class="w-40 shrink-0 border-r border-gray-100 px-4 py-4 md:w-56">
            <span
              class="font-display text-sm font-bold leading-snug text-rally-navy"
            >
              {{ event.time }}
            </span>
          </div>
          <div class="flex-1 px-5 py-4">
            <p
              class="font-display text-sm font-semibold uppercase leading-snug tracking-wide text-rally-navy"
            >
              {{ event.name }}
            </p>
            <p
              v-if="event.location"
              class="mt-1 text-xs leading-snug text-gray-500"
            >
              {{ event.location }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  days: { type: Array, required: true },
});
</script>
