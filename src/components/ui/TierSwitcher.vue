<template>
  <nav aria-label="Poziomy imprezy" class="flex flex-wrap gap-2 md:gap-3">
    <RouterLink
      v-for="tier in tiers"
      :key="tier.key"
      :to="`/${tier.slug}`"
      :class="[
        'group flex items-center gap-2.5 border px-4 py-2.5 transition-colors duration-200',
        tier.key === activeKey
          ? 'border-rally-orange bg-rally-orange text-rally-navy'
          : 'border-rally-navy/15 bg-white text-rally-navy hover:border-rally-orange hover:text-rally-orange-dark',
      ]"
      :aria-current="tier.key === activeKey ? 'page' : undefined"
    >
      <span class="font-display text-xl font-black italic leading-none">
        {{ tier.code }}
      </span>
      <span
        :class="[
          'h-5 w-px',
          tier.key === activeKey ? 'bg-rally-navy/25' : 'bg-rally-navy/15',
        ]"
      ></span>
      <span
        class="font-display text-xs font-bold uppercase tracking-[0.16em] md:text-sm"
      >
        {{ tier.name }}
      </span>
    </RouterLink>
  </nav>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { tiers } from "../../data/eventConfig.js";

defineProps({
  activeKey: { type: String, default: null },
});
</script>
