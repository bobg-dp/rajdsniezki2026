<template>
  <div>
    <TheHeader />

    <main class="min-h-screen bg-white pb-20 pt-32 md:pt-44">
      <section class="relative overflow-hidden bg-rally-navy text-white">
        <SniezkaRidge
          class="pointer-events-none absolute inset-x-0 bottom-0 h-40 opacity-45 md:h-56"
          sky-color="transparent"
          far-color="#1d3f58"
          mid-color="#132d42"
          near-color="#0e2133"
          aria-hidden="true"
        />
        <div class="relative mx-auto max-w-7xl px-6 py-14 md:px-8 md:py-20">
          <p
            class="mb-4 font-display text-sm font-bold uppercase tracking-[0.3em] text-rally-orange"
          >
            Błąd 404
          </p>
          <div class="max-w-4xl">
            <h1
              class="text-rally-slant mb-6 font-display text-4xl font-black uppercase leading-none text-white md:text-6xl"
            >
              Ten odcinek <span class="text-rally-orange">nie istnieje</span>
            </h1>
            <p
              class="max-w-3xl text-lg leading-relaxed text-rally-snow-dim md:text-2xl"
            >
              Strona, której szukasz, została przeniesiona albo nigdy jej tu nie
              było. Poniżej znajdziesz najczęściej odwiedzane działy serwisu.
            </p>
          </div>
        </div>
      </section>

      <section class="mx-auto max-w-7xl px-6 py-12 md:px-8 md:py-16">
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <RouterLink
            v-for="link in shortcuts"
            :key="link.to"
            :to="link.to"
            class="group border border-rally-navy/15 bg-white p-6 transition-colors duration-200 hover:border-rally-orange"
          >
            <p
              class="font-display text-lg font-bold uppercase tracking-wide text-rally-navy transition-colors duration-200 group-hover:text-rally-orange-dark"
            >
              {{ link.label }}
            </p>
            <p class="mt-2 text-sm leading-6 text-rally-steel">
              {{ link.description }}
            </p>
          </RouterLink>
        </div>

        <RouterLink
          to="/"
          class="mt-10 inline-flex items-center gap-2 bg-rally-navy px-7 py-4 font-display text-sm font-bold uppercase tracking-wider text-white transition-colors duration-200 hover:bg-rally-steel"
        >
          Wróć na stronę główną
        </RouterLink>
      </section>
    </main>

    <TheFooter />
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import TheHeader from "../components/layout/TheHeader.vue";
import TheFooter from "../components/layout/TheFooter.vue";
import SniezkaRidge from "../components/ui/SniezkaRidge.vue";
import { tiers } from "../data/eventConfig.js";

const shortcuts = [
  {
    to: "/o-rajdzie",
    label: "O rajdzie",
    description: "Charakter imprezy, termin i trzy rangi sportowe.",
  },
  {
    to: "/aktualnosci",
    label: "Aktualności",
    description: "Komunikaty organizatora i zapowiedzi.",
  },
  {
    to: "/mapy",
    label: "Mapy i odcinki",
    description: "Przebieg odcinków specjalnych oraz punkty startu i mety.",
  },
  ...tiers.map((tier) => ({
    to: `/${tier.slug}`,
    label: tier.navLabel,
    description: tier.shortDescription,
  })),
  {
    to: "/kibice",
    label: "Kibice",
    description: "Gdzie oglądać rajd i jak kibicować bezpiecznie.",
  },
  {
    to: "/kontakt",
    label: "Kontakt",
    description: "Dane biura rajdu i organizatora.",
  },
];
</script>
