<template>
  <div>
    <TheHeader />

    <main class="min-h-screen bg-rally-snow pt-44 pb-20 text-rally-navy">
      <div class="mx-auto max-w-5xl px-6 md:px-8">
        <article
          class="overflow-hidden rounded-[2rem] border border-black/8 bg-white shadow-[0_28px_100px_rgba(0,0,0,0.08)]"
        >
          <header class="border-b border-black/8 px-6 py-8 md:px-10 md:py-10">
            <p
              class="font-display text-sm font-bold uppercase tracking-[0.28em] text-rally-orange-dark"
            >
              Strefa mediów
            </p>
            <h1
              class="mt-4 font-display text-4xl font-black uppercase leading-none md:text-6xl"
            >
              Media
            </h1>
            <p
              class="mt-5 max-w-3xl text-base leading-7 text-rally-navy/75 md:text-lg md:leading-8"
            >
              Podstrona dla przedstawicieli mediów zainteresowanych obsługą
              Rajdu Śnieżki 2026. Poniżej znajdziesz bezpośredni odnośnik do
              formularza akredytacyjnego.
            </p>
          </header>

          <div class="px-6 py-8 md:px-10 md:py-10">
            <section
              class="rounded-[1.5rem] border border-rally-orange/30 bg-rally-orange/10 p-6 md:p-8"
            >
              <p
                class="font-display text-sm font-bold uppercase tracking-[0.22em] text-rally-orange-dark"
              >
                Akredytacje prasowe
              </p>
              <h2
                class="mt-4 font-display text-2xl font-black uppercase text-rally-navy md:text-3xl"
              >
                Formularz akredytacji dla mediów
              </h2>
              <p
                class="mt-4 max-w-3xl text-[15px] leading-7 text-rally-navy/80 md:text-base md:leading-8"
              >
                Wnioski o akredytacje medialne przyjmowane są przez system
                Inside PZM. Przejdź do formularza, aby wypełnić zgłoszenie
                online.
              </p>
              <div class="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="https://insidepzm.pl/events/media-accreditation/1047"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center justify-center rounded-full bg-rally-navy px-6 py-3 font-display text-sm font-bold uppercase tracking-[0.18em] text-white transition-colors duration-200 hover:bg-rally-orange-dark"
                >
                  Otwórz formularz akredytacji
                </a>
                <span class="text-sm uppercase tracking-[0.18em] text-rally-navy/55">
                  insidepzm.pl
                </span>
              </div>
            </section>

            <section class="mt-8 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
              <div
                class="rounded-[1.5rem] border border-black/8 bg-white p-6 md:p-8"
              >
                <p
                  class="font-display text-sm font-bold uppercase tracking-[0.22em] text-rally-orange-dark"
                >
                  Biuro prasowe
                </p>
                <h2
                  class="mt-4 font-display text-2xl font-black uppercase text-rally-navy md:text-3xl"
                >
                  Biuro Rajdu / Biuro Prasowe
                </h2>
                <address
                  class="mt-5 not-italic text-[15px] leading-7 text-rally-navy/80 md:text-base md:leading-8"
                >
                  <p>ul. Nowowiejska 81</p>
                  <p>58-500 Jelenia Góra</p>
                </address>
                <p class="mt-4 text-sm leading-6 text-rally-navy/55">
                  Skorzystaj z nawigacji, aby szybko wyznaczyć trasę do biura
                  prasowego.
                </p>
                <div class="mt-8 flex flex-wrap gap-4">
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=Nowowiejska%2081%2C%2058-500%20Jelenia%20Gora"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center justify-center rounded-full bg-rally-orange px-6 py-3 font-display text-sm font-bold uppercase tracking-[0.18em] text-rally-navy transition-colors duration-200 hover:bg-rally-orange-dark"
                  >
                    Nawiguj do biura
                  </a>
                </div>
              </div>

              <div
                class="rounded-[1.5rem] border border-black/8 bg-[#f8f6ef] p-6 md:p-8"
              >
                <p
                  class="font-display text-sm font-bold uppercase tracking-[0.22em] text-rally-orange-dark"
                >
                  Przydatne linki
                </p>
                <h2
                  class="mt-4 font-display text-2xl font-black uppercase text-rally-navy md:text-3xl"
                >
                  Lokalizacje i oesy
                </h2>
                <p
                  class="mt-4 max-w-2xl text-[15px] leading-7 text-rally-navy/80 md:text-base md:leading-8"
                >
                  Szybki dostęp do najważniejszych podstron z punktami
                  wydarzenia oraz mapami, opisami odcinków specjalnych i
                  harmonogramami obu rajdów.
                </p>
                <div class="mt-8 flex flex-wrap gap-4">
                  <RouterLink
                    to="/lokalizacje"
                    class="inline-flex items-center justify-center rounded-full bg-rally-navy px-6 py-3 font-display text-sm font-bold uppercase tracking-[0.18em] text-white transition-colors duration-200 hover:bg-rally-orange-dark"
                  >
                    Lokalizacje
                  </RouterLink>
                  <RouterLink
                    to="/mapy"
                    class="inline-flex items-center justify-center rounded-full border border-rally-navy/15 bg-white px-6 py-3 font-display text-sm font-bold uppercase tracking-[0.18em] text-rally-navy transition-colors duration-200 hover:border-rally-orange-dark hover:text-rally-orange-dark"
                  >
                    Oesy i mapy
                  </RouterLink>
                  <RouterLink
                    v-for="tier in tiers"
                    :key="tier.key"
                    :to="`/${tier.slug}/harmonogram`"
                    class="inline-flex items-center justify-center rounded-full border border-rally-navy/15 bg-white px-6 py-3 font-display text-sm font-bold uppercase tracking-[0.18em] text-rally-navy transition-colors duration-200 hover:border-rally-orange-dark hover:text-rally-orange-dark"
                  >
                    Harmonogram {{ tier.code }}
                  </RouterLink>
                </div>
              </div>
            </section>
          </div>
        </article>
      </div>
    </main>

    <TheFooter />
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import TheFooter from "../components/layout/TheFooter.vue";
import TheHeader from "../components/layout/TheHeader.vue";
import { tiers } from "../data/eventConfig.js";
</script>
