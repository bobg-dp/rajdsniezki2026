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
            {{ EVENT_FULL_NAME }}
          </p>
          <div class="max-w-4xl">
            <h1
              class="text-rally-slant mb-6 font-display text-4xl font-black uppercase leading-none text-white md:text-6xl"
            >
              Rajd u stóp <span class="text-rally-orange">Śnieżki</span>
            </h1>
            <p class="max-w-3xl text-lg leading-relaxed text-rally-snow-dim md:text-2xl">
              Automobilklub Karkonosze zaprasza na rajd samochodowy rozgrywany
              na asfaltowych drogach Karkonoszy — w trzech rangach sportowych, od
              Rajdu Okręgowego po Konkursową Jazdę Samochodem.
            </p>
          </div>
        </div>
      </section>

      <section class="mx-auto max-w-7xl px-6 py-12 md:px-8 md:py-16">
        <div
          class="grid items-start gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]"
        >
          <article class="max-w-4xl space-y-10">
            <section class="space-y-5 text-lg leading-8 text-rally-navy/90">
              <p>
                Karkonosze to nie tylko majestatyczne szczyty i malownicze
                szlaki. Dla fanów motorsportu to przede wszystkim wąskie,
                techniczne asfalty, które od dekad testują umiejętności
                kierowców rajdowych.
              </p>
              <p>
                To tutaj „wąsko i szybko” nabiera dosłownego znaczenia, a o
                wyniku decyduje nie tylko moc silnika, ale przede wszystkim
                precyzja i stalowe nerwy.
              </p>
            </section>

            <section>
              <h2
                class="mb-5 font-display text-3xl font-black uppercase text-rally-navy md:text-4xl"
              >
                Trzy poziomy, jedna impreza
              </h2>
              <div class="mb-8 space-y-5 text-lg leading-8 text-rally-navy/90">
                <p>
                  Rajd Śnieżki rozgrywany jest równolegle w trzech rangach
                  sportowych. Każda z nich ma własny regulamin, harmonogram i
                  strefę zawodnika, ale wszystkie korzystają z tych samych
                  odcinków specjalnych.
                </p>
              </div>

              <div class="grid gap-4 md:grid-cols-3">
                <article
                  v-for="tier in tiers"
                  :key="tier.key"
                  class="border border-rally-navy/12 bg-rally-snow/40 p-6"
                >
                  <p
                    class="mb-1 font-display text-4xl font-black italic leading-none text-rally-orange"
                  >
                    {{ tier.code }}
                  </p>
                  <p
                    class="mb-3 font-display text-sm font-bold uppercase tracking-[0.18em] text-rally-navy"
                  >
                    {{ tier.name }}
                  </p>
                  <p class="text-base leading-7 text-rally-steel">
                    {{ tier.description }}
                  </p>
                </article>
              </div>
            </section>

            <section>
              <h2
                class="mb-5 font-display text-3xl font-black uppercase text-rally-navy md:text-4xl"
              >
                Odcinki specjalne
              </h2>
              <div class="space-y-5 text-lg leading-8 text-rally-navy/90">
                <p>
                  Trasy rajdu poprowadzą przez gminę Piechowice (odcinek
                  Michałowice) oraz gminę Stara Kamienica. Próby Konkursowej
                  Jazdy Samochodem zostaną rozegrane na skróconej wersji
                  odcinka Michałowice.
                </p>
                <p>
                  Dokładny przebieg obu odcinków, punkty startu i mety oraz
                  dystanse znajdziesz w
                  <RouterLink
                    to="/mapy"
                    class="font-semibold text-rally-orange-dark hover:underline"
                  >
                    dziale map i odcinków
                  </RouterLink>
                  .
                </p>
              </div>
            </section>

            <section>
              <h2
                class="mb-5 font-display text-3xl font-black uppercase text-rally-navy md:text-4xl"
              >
                Zaproszenie dla kibiców
              </h2>
              <div class="space-y-5 text-lg leading-8 text-rally-navy/90">
                <p>
                  Zapraszamy do stref kibica oraz parku serwisowego, gdzie z
                  bliska zobaczysz rajdowe maszyny i spotkasz zawodników. Przed
                  wyjazdem na odcinek sprawdź
                  <RouterLink
                    to="/kibice/bezpiecznie"
                    class="font-semibold text-rally-orange-dark hover:underline"
                  >
                    zasady bezpiecznego kibicowania
                  </RouterLink>
                  .
                </p>
                <p
                  class="text-rally-slant font-display text-2xl font-black uppercase text-rally-navy md:text-3xl"
                >
                  Karkonosze znów zatętnią sportowym życiem. Do zobaczenia na
                  trasie!
                </p>
              </div>
            </section>
          </article>

          <aside class="space-y-5 lg:sticky lg:top-32">
            <div class="border-l-4 border-rally-orange bg-rally-snow/60 p-6">
              <p
                class="mb-3 font-display text-sm font-bold uppercase tracking-[0.2em] text-rally-navy"
              >
                Termin
              </p>
              <p class="font-display text-2xl font-black uppercase text-rally-navy">
                {{ dateLabel }}
              </p>
              <p class="mt-3 leading-7 text-rally-steel">
                Baza rajdu: {{ location.city }}. Odcinki specjalne w gminach
                {{ location.municipalities.join(" i ") }}.
              </p>
            </div>

            <div class="surface-asphalt p-6 text-white">
              <p
                class="mb-3 font-display text-sm font-bold uppercase tracking-[0.2em] text-rally-orange"
              >
                Charakter rajdu
              </p>
              <p class="leading-7 text-rally-snow-dim">
                Wąskie asfalty, szybkie partie, zmienna pogoda i techniczne
                podjazdy — jedna z bardziej wymagających asfaltowych prób w
                regionie.
              </p>
            </div>

            <div class="border border-rally-navy/15 bg-white p-6">
              <p
                class="mb-3 font-display text-sm font-bold uppercase tracking-[0.2em] text-rally-navy"
              >
                Organizator
              </p>
              <img
                :src="organizer.logoOnLight"
                alt=""
                aria-hidden="true"
                class="mb-4 h-24 w-auto"
                loading="lazy"
              />
              <p class="leading-7 text-rally-steel">
                {{ organizer.name }} — klub odpowiedzialny za odbudowę rajdów
                samochodowych w regionie Karkonoszy.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>

    <TheFooter />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { RouterLink } from "vue-router";
import TheFooter from "../components/layout/TheFooter.vue";
import TheHeader from "../components/layout/TheHeader.vue";
import SniezkaRidge from "../components/ui/SniezkaRidge.vue";
import {
  EVENT_FULL_NAME,
  location,
  organizer,
  schedule,
  tiers,
} from "../data/eventConfig.js";

const dateLabel = computed(() =>
  schedule.confirmed ? schedule.dateLabel : schedule.pendingLabel,
);
</script>
