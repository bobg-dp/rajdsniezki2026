<template>
  <section class="bg-white py-16 md:py-20">
    <div class="mx-auto max-w-7xl px-6 md:px-8">
      <div class="mb-12 text-center">
        <p
          class="mb-1 font-display text-sm font-bold uppercase tracking-[0.3em] text-rally-orange"
        >
          Współpraca
        </p>
        <h2
          class="text-rally-slant font-display text-4xl font-black uppercase leading-none text-rally-navy md:text-6xl"
        >
          Wspierają nas
        </h2>
      </div>

      <!-- Grupy partnerów – każda sekcja pojawia się, gdy ma wpisy. -->
      <div v-for="group in filledGroups" :key="group.title" class="mb-10">
        <h3
          class="mb-6 text-center font-display text-sm font-bold uppercase tracking-widest text-rally-navy/50"
        >
          {{ group.title }}
        </h3>
        <div :class="group.gridClass">
          <PartnerLogo
            v-for="item in group.items"
            :key="item.name"
            :label="item.name"
            :logo="item.logo"
            :href="item.href"
            :link-title="item.linkTitle"
          />
        </div>
      </div>

      <p
        v-if="!filledGroups.length"
        class="text-center text-sm leading-7 text-rally-steel"
      >
        Lista partnerów, gmin partnerskich i patronów medialnych będzie
        uzupełniana na bieżąco.
      </p>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import PartnerLogo from "../ui/PartnerLogo.vue";
import {
  mediaPatrons,
  municipalPartners,
  partners,
} from "../../data/partners.js";

const groups = [
  {
    title: "Partnerzy",
    items: partners,
    gridClass: "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4",
  },
  {
    title: "Gminy partnerskie",
    items: municipalPartners,
    gridClass: "mx-auto grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2",
  },
  {
    title: "Patroni medialni",
    items: mediaPatrons,
    gridClass: "grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 lg:gap-16",
  },
];

const filledGroups = computed(() =>
  groups.filter((group) => group.items.length > 0),
);
</script>
