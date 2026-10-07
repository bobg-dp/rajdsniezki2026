<template>
  <section class="surface-asphalt py-16 md:py-20">
    <div class="mx-auto max-w-7xl px-6 md:px-8">
      <div class="mb-12 text-center">
        <p
          class="mb-1 font-display text-sm font-bold uppercase tracking-[0.3em] text-rally-orange/80"
        >
          Szybkie linki
        </p>
        <h2
          class="text-rally-slant font-display text-4xl font-black uppercase leading-none text-white md:text-6xl"
        >
          Dla Ciebie
        </h2>
      </div>

      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
        <ShortcutCard v-for="item in shortcuts" :key="item.label" :item="item" />
      </div>
    </div>
  </section>
</template>

<script setup>
import ShortcutCard from "../ui/ShortcutCard.vue";
import { tiers } from "../../data/eventConfig.js";

const shortcuts = [
  ...tiers.map((tier) => ({
    label: tier.navLabel,
    desc: tier.shortDescription,
    to: `/${tier.slug}`,
    icon: "steering",
    note: tier.licenceRequired ? null : "Bez licencji sportowej",
    // Sekcja stoi na asfalcie, więc loga cykli bierzemy w wariancie na ciemne tło.
    // Brak potwierdzonych cykli zostawia ikonę kierownicy.
    logos: tier.cycles
      .filter((cycle) => cycle.confirmed)
      .map((cycle) => ({ src: cycle.srcOnDark, alt: cycle.alt })),
  })),
  {
    label: "Dla kibiców",
    desc: "Gdzie oglądać, strefy kibica, bezpieczeństwo",
    to: "/kibice",
    icon: "flag",
  },
  {
    label: "Dla mieszkańców",
    desc: "Zamknięcia dróg, harmonogram, informacje",
    to: "/kibice/mieszkancy",
    icon: "map-pin",
  },
  {
    label: "Mapy i odcinki",
    desc: "Przebieg OS-ów, start i meta, mapy dojazdowe",
    to: "/mapy",
    icon: "map",
  },
];
</script>
