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

      <!-- Sponsor tytularny -->
      <div
        v-if="titleSponsor"
        class="mb-12 flex flex-col items-center gap-8 border-2 border-rally-orange p-8 md:flex-row md:p-12"
      >
        <a
          :href="titleSponsor.href"
          target="_blank"
          rel="noopener noreferrer"
          :title="titleSponsor.name"
          class="flex h-36 w-56 shrink-0 items-center justify-center border border-rally-navy/10 bg-rally-snow/50 p-4 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:border-rally-orange"
        >
          <img
            :src="titleSponsor.logo"
            :alt="titleSponsor.name"
            class="max-h-full max-w-full object-contain"
            loading="lazy"
          />
        </a>
        <div>
          <p
            class="mb-2 font-display text-xs font-bold uppercase tracking-widest text-rally-orange"
          >
            Sponsor tytularny
          </p>
          <h3
            class="mb-4 font-display text-2xl font-black uppercase text-rally-navy md:text-3xl"
          >
            {{ titleSponsor.name }}
          </h3>
          <p class="text-sm leading-relaxed text-rally-steel md:text-base">
            {{ titleSponsor.text }}
          </p>
        </div>
      </div>

      <!-- Miejsce dla sponsora tytularnego, dopóki umowa nie jest podpisana. -->
      <div
        v-else
        class="mb-12 flex flex-col items-center gap-8 border-2 border-dashed border-rally-orange/50 p-8 md:flex-row md:p-12"
      >
        <div
          class="flex h-36 w-56 shrink-0 items-center justify-center border border-dashed border-rally-navy/15 bg-rally-snow/40"
        >
          <span
            class="font-display text-xs font-bold uppercase tracking-[0.25em] text-rally-navy/35"
          >
            Twoje logo
          </span>
        </div>
        <div>
          <p
            class="mb-2 font-display text-xs font-bold uppercase tracking-widest text-rally-orange"
          >
            Sponsor tytularny
          </p>
          <h3
            class="mb-4 font-display text-2xl font-black uppercase text-rally-navy md:text-3xl"
          >
            To miejsce czeka na Partnera
          </h3>
          <p class="text-sm leading-relaxed text-rally-steel md:text-base">
            Rajd Śnieżki to trzy rangi sportowe, dwa odcinki specjalne i kibice
            z całego regionu Karkonoszy. Jeśli chcesz, aby Twoja marka pojawiła
            się w nazwie rajdu, na samochodach i na trasie — napisz do nas.
          </p>
          <RouterLink
            to="/kontakt"
            class="mt-6 inline-flex items-center gap-2 bg-rally-navy px-6 py-3 font-display text-sm font-bold uppercase tracking-wider text-white transition-colors duration-200 hover:bg-rally-orange hover:text-rally-navy"
          >
            Porozmawiajmy o współpracy
          </RouterLink>
        </div>
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
import { RouterLink } from "vue-router";
import PartnerLogo from "../ui/PartnerLogo.vue";

// TODO: uzupełnij po podpisaniu umów sponsorskich Rajdu Śnieżki.
const titleSponsor = null;

const partners = [];
const municipalPartners = [];
const mediaPatrons = [];

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
