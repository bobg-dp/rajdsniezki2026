<template>
  <header class="mb-10 md:mb-12">
    <div v-if="confirmedCycles.length" class="mb-6 flex flex-wrap items-center gap-4 md:gap-6">
      <div
        v-for="cycle in confirmedCycles"
        :key="cycle.srcOnLight"
        class="flex h-16 w-32 items-center justify-center md:h-20 md:w-44"
      >
        <!-- Strefa zawodnika jest jasna, więc bierzemy wariant na jasne tło. -->
        <img
          :src="cycle.srcOnLight"
          :alt="cycle.alt"
          class="max-h-full max-w-full object-contain"
          loading="lazy"
        />
      </div>
    </div>

    <p
      class="font-display text-sm font-bold uppercase tracking-[0.3em] text-rally-orange"
    >
      {{ EVENT_FULL_NAME }} · {{ tier.name }}
    </p>

    <h1
      class="text-rally-slant mt-2 font-display text-4xl font-black uppercase leading-[0.9] text-rally-navy md:text-6xl"
    >
      {{ title || `Zawodnicy — ${tier.code}` }}
      <template v-if="subtitle"><br />{{ subtitle }}</template>
    </h1>

    <p v-if="showTagline" class="mt-4 max-w-2xl text-base leading-7 text-rally-steel">
      {{ tier.description }}
    </p>

    <p
      v-if="showLicenceNote && !tier.licenceRequired"
      class="mt-4 inline-flex items-center gap-2 border border-rally-orange/40 bg-rally-orange/10 px-4 py-2 font-display text-xs font-bold uppercase tracking-[0.2em] text-rally-orange-dark"
    >
      Bez licencji sportowej
    </p>
  </header>
</template>

<script setup>
import { computed } from "vue";
import { EVENT_FULL_NAME } from "../../data/eventConfig.js";

const props = defineProps({
  tier: { type: Object, required: true },
  title: { type: String, default: null },
  subtitle: { type: String, default: null },
  showTagline: { type: Boolean, default: false },
  showLicenceNote: { type: Boolean, default: true },
});

const confirmedCycles = computed(() =>
  (props.tier.cycles ?? []).filter((cycle) => cycle.confirmed),
);
</script>
