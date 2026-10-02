<template>
  <div>
    <TheHeader />

    <main class="min-h-screen pb-20 pt-32 md:pt-48">
      <div class="mx-auto max-w-7xl px-6 md:px-8">
        <p
          class="mb-2 font-display text-sm font-bold uppercase tracking-[0.3em] text-rally-orange"
        >
          Strefa kibica
        </p>
        <h1
          class="text-rally-slant mb-6 font-display text-4xl font-black uppercase text-rally-navy md:text-6xl"
        >
          Dla kibiców
        </h1>
        <p class="mb-12 max-w-3xl text-base leading-7 text-rally-steel md:text-lg">
          Rajd Śnieżki rozgrywany jest na asfaltowych drogach Karkonoszy.
          Poniżej znajdziesz wszystko, co pozwoli obejrzeć go bezpiecznie i
          wygodnie.
        </p>

        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <RouterLink
            v-for="card in cards"
            :key="card.label"
            :to="card.to"
            class="group block bg-rally-navy p-8 text-white transition-colors duration-200 hover:bg-rally-steel"
          >
            <h2
              class="mb-2 font-display text-xl font-bold uppercase transition-colors group-hover:text-rally-orange"
            >
              {{ card.label }}
            </h2>
            <p class="text-sm leading-6 text-rally-snow-dim/80">{{ card.desc }}</p>
          </RouterLink>

          <div
            class="cursor-not-allowed select-none border border-rally-orange-dark/50 bg-rally-orange/85 p-8 text-rally-navy"
          >
            <h2 class="mb-2 font-display text-xl font-bold uppercase">Sklep</h2>
            <p class="text-sm leading-6 text-rally-navy/75">
              Gadżety, koszulki i akcesoria rajdowe
            </p>
            <p
              class="mt-3 font-display text-xs font-bold uppercase tracking-[0.2em] text-rally-navy/70"
            >
              W przygotowaniu
            </p>
          </div>
        </div>
      </div>
    </main>

    <TheFooter />
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import TheHeader from "../components/layout/TheHeader.vue";
import TheFooter from "../components/layout/TheFooter.vue";

const cards = [
  {
    label: "Kibicuj bezpiecznie",
    desc: "Zasady bezpiecznego oglądania rajdu i grafiki informacyjne",
    to: "/kibice/bezpiecznie",
  },
  {
    label: "Mieszkańcy",
    desc: "Ulotki informacyjne, zamknięcia dróg i harmonogramy odcinków",
    to: "/kibice/mieszkancy",
  },
  {
    label: "Mapy i odcinki",
    desc: "Przebieg odcinków specjalnych, punkty startu i mety",
    to: "/mapy",
  },
  {
    label: "Lokalizacje",
    desc: "Mapa i nawigacja do wszystkich lokalizacji rajdu",
    to: "/lokalizacje",
  },
];
</script>
