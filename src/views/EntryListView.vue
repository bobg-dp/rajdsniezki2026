<template>
  <div>
    <TheHeader />

    <main class="min-h-screen pt-32 pb-20 md:pt-48">
      <div class="mx-auto max-w-3xl px-6 md:px-8">
        <p
          class="font-display text-sm font-bold uppercase tracking-[0.3em] text-rally-orange"
        >
          {{ EVENT_FULL_NAME }}
        </p>
        <h1
          class="text-rally-slant mt-2 font-display text-4xl font-black uppercase leading-[0.9] text-rally-navy md:text-6xl"
        >
          Lista startowa<br />Zapisy
        </h1>

        <p class="mt-8 text-lg leading-8 text-rally-steel">
          Pierwsze listy zgłoszeń Rajdu Okręgowego, Rally Sprintu i KJS są już
          opublikowane. Najbardziej aktualna wersja zawsze jest na tablicy
          ogłoszeń danej rangi.
        </p>

        <div class="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
          <a
            href="https://app-cdn.sportity.com/3fec3e38-1c1b-488b-9974-9c16ef890f41/926bebbd-c65e-4c52-8a7b-744ee01ff02d_Lista%20zg%C5%82oszen%CC%81%20RO.pdf"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center bg-rally-orange px-7 py-4 font-display text-sm font-bold uppercase tracking-wider text-rally-navy transition-all hover:brightness-90"
          >
            Lista zgłoszeń RO
          </a>
          <a
            href="https://app-cdn.sportity.com/c5effb27-6d96-4b15-91a9-bedaf3eb2200/b1b05a51-edfa-4aa7-a07d-d41d484e01fd_Lista%20zg%C5%82oszen%CC%81%20RPP%201.pdf"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center bg-rally-navy px-7 py-4 font-display text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-rally-steel"
          >
            Lista zgłoszeń RS
          </a>
          <a
            href="https://rallydevil.com/rajd/rajd-sniezki-2026"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center border border-rally-navy/15 bg-white px-7 py-4 font-display text-sm font-bold uppercase tracking-wider text-rally-navy transition-colors hover:border-rally-orange hover:text-rally-orange-dark"
          >
            Lista zgłoszeń KJS
          </a>
        </div>
      </div>
    </main>

    <TheFooter />
  </div>
</template>

<script setup>
import TheHeader from "../components/layout/TheHeader.vue";
import TheFooter from "../components/layout/TheFooter.vue";
import { EVENT_FULL_NAME } from "../data/eventConfig.js";
</script>
