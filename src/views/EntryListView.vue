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
          Listy startowe Rajdu Okręgowego, Rally Sprintu i KJS opublikujemy w
          tym miejscu po zamknięciu zapisów.
        </p>
        <p class="mt-4 text-lg leading-8 text-rally-steel">
          Do tego czasu zapraszamy do zgłoszeń. Na zapisy KJS jest więcej
          czasu, lista pozostaje otwarta do 16 października 2026.
        </p>

        <div class="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="https://insidepzm.pl/accounts/login/?next=/home/"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center bg-rally-orange px-7 py-4 font-display text-sm font-bold uppercase tracking-wider text-rally-navy transition-all hover:brightness-90"
          >
            Zgłoś się do RO i RS
          </a>
          <a
            href="https://rallydevil.com/rajd/rajd-sniezki-2026-kjs"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center bg-rally-navy px-7 py-4 font-display text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-rally-steel"
          >
            Zapisy KJS do 16 października
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
