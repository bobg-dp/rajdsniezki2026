<template>
  <section
    class="relative overflow-hidden border border-rally-navy/10 bg-rally-snow/60 p-8 md:p-12"
  >
    <!-- Ukośny akcent nawiązujący do przejść między sekcjami. -->
    <span
      class="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rotate-12 bg-rally-orange/10"
      aria-hidden="true"
    ></span>

    <p
      class="font-display text-xs font-bold uppercase tracking-[0.3em] text-rally-orange"
    >
      W przygotowaniu
    </p>

    <h2
      class="mt-3 font-display text-2xl font-black uppercase leading-tight text-rally-navy md:text-4xl"
    >
      {{ title }}
    </h2>

    <p class="mt-4 max-w-2xl text-base leading-7 text-rally-steel">
      {{ description }}
    </p>

    <RouterLink
      v-if="actionTo"
      :to="actionTo"
      class="mt-7 inline-flex items-center gap-2 bg-rally-navy px-6 py-3 font-display text-sm font-bold uppercase tracking-wider text-white transition-colors duration-200 hover:bg-rally-orange hover:text-rally-navy"
    >
      {{ actionLabel }}
      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M17 8l4 4m0 0l-4 4m4-4H3"
        />
      </svg>
    </RouterLink>
  </section>
</template>

<script setup>
import { RouterLink } from "vue-router";

defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  actionTo: { type: String, default: null },
  actionLabel: { type: String, default: "Przejdź dalej" },
});
</script>
