<template>
  <section id="poziomy" class="bg-white py-16 md:py-20">
    <div class="mx-auto max-w-7xl px-6 md:px-8">
      <div class="mb-10 max-w-3xl md:mb-12">
        <p
          class="mb-1 font-display text-sm font-bold uppercase tracking-[0.3em] text-rally-orange"
        >
          Trzy rangi, jeden weekend
        </p>
        <h2
          class="text-rally-slant font-display text-4xl font-black uppercase leading-none text-rally-navy md:text-6xl"
        >
          Każdy może wystartować!
        </h2>
        <p class="mt-5 text-base leading-7 text-rally-steel md:text-lg">
          Rajd Śnieżki rozgrywany jest w trzech rangach sportowych. Wybierz tę,
          która odpowiada Twojemu doświadczeniu i samochodowi — każda ma własną
          strefę zawodnika z dokumentami, harmonogramem i tablicą ogłoszeń.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
        <RouterLink
          v-for="(tier, index) in tiers"
          :key="tier.key"
          :to="`/${tier.slug}`"
          class="tier-card group relative flex flex-col overflow-hidden border border-rally-navy/10 bg-rally-snow/40 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-rally-orange/50 hover:bg-white md:p-8"
        >
          <!-- Numer rangi jako „tablica startowa”. -->
          <span
            class="pointer-events-none absolute -right-2 -top-6 font-display text-[7rem] font-black italic leading-none text-rally-navy/5 transition-colors duration-300 group-hover:text-rally-orange/10"
            aria-hidden="true"
          >
            {{ index + 1 }}
          </span>

          <p
            class="relative font-display text-5xl font-black italic leading-none text-rally-orange md:text-6xl"
          >
            {{ tier.code }}
          </p>

          <h3
            class="relative mt-4 font-display text-xl font-bold uppercase leading-tight tracking-wide text-rally-navy md:text-2xl"
          >
            {{ tier.name }}
          </h3>

          <p class="relative mt-3 flex-1 text-sm leading-6 text-rally-steel">
            {{ tier.description }}
          </p>

          <p
            class="relative mt-5 font-display text-xs font-bold uppercase tracking-[0.2em]"
            :class="tier.licenceRequired ? 'text-rally-steel/60' : 'text-rally-orange-dark'"
          >
            {{ tier.licenceRequired ? "Wymagana licencja sportowa" : "Bez licencji sportowej" }}
          </p>

          <span
            class="relative mt-5 inline-flex items-center gap-2 font-display text-sm font-bold uppercase tracking-[0.2em] text-rally-navy transition-all duration-200 group-hover:gap-3 group-hover:text-rally-orange-dark"
          >
            Strefa zawodnika
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </span>

          <!-- Pomarańczowa smuga wjeżdżająca przy hoverze. -->
          <span
            class="pointer-events-none absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-rally-orange transition-transform duration-300 group-hover:scale-x-100"
            aria-hidden="true"
          ></span>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { tiers } from "../../data/eventConfig.js";
</script>
