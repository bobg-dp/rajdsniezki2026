<template>
  <section class="relative overflow-hidden bg-white py-16 md:py-20">
    <div
      class="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-rally-navy/5 blur-3xl"
      aria-hidden="true"
    ></div>
    <div
      class="pointer-events-none absolute bottom-0 right-0 h-56 w-56 translate-x-1/3 translate-y-1/4 rounded-full bg-rally-orange/8 blur-3xl"
      aria-hidden="true"
    ></div>

    <div
      class="relative mx-auto grid max-w-7xl gap-10 px-6 md:px-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-center lg:gap-14"
    >
      <!-- Wizytówka imprezy; po otrzymaniu zdjęcia dyrektora podmień na portret. -->
      <div class="order-1">
        <div
          class="relative overflow-hidden border border-rally-navy/10 bg-rally-snow/50 shadow-[0_24px_80px_rgba(24,54,78,0.12)]"
        >
          <div class="relative z-10 px-7 pb-0 pt-10 text-center md:px-9 md:pt-12">
            <img
              src="/logo.png"
              :alt="EVENT_NAME"
              class="mx-auto block w-full max-w-72 object-contain"
            />
            <p
              class="mt-6 font-display text-xs font-bold uppercase tracking-[0.3em] text-rally-orange"
            >
              {{ organizer.name }}
            </p>
            <p
              class="mt-2 font-display text-sm font-semibold uppercase tracking-[0.2em] text-rally-navy/60"
            >
              {{ location.city }} · {{ dateLabel }}
            </p>
          </div>

          <div class="relative mt-8 h-32 md:h-40">
            <SniezkaRidge
              far-color="rgba(36, 69, 95, 0.14)"
              mid-color="rgba(24, 54, 78, 0.22)"
              near-color="#18364e"
              sky-color="rgba(232, 238, 243, 0.45)"
              snow-color="rgba(255, 255, 255, 0.35)"
            />
          </div>
        </div>
      </div>

      <div class="order-2">
        <p
          class="mb-3 font-display text-sm font-bold uppercase tracking-[0.3em] text-rally-orange"
        >
          Słowo od organizatora
        </p>

        <h2
          class="text-rally-slant max-w-3xl font-display text-4xl font-black uppercase leading-none text-rally-navy md:text-6xl"
        >
          Rajd pod najwyższym szczytem
        </h2>

        <blockquote
          class="mt-8 space-y-5 border-l border-rally-navy/12 pl-5 text-base leading-7 text-rally-steel md:pl-6 md:text-[1.05rem] md:leading-8"
        >
          <p>
            Drodzy Zawodnicy, Kibice, Przyjaciele sportów motorowych! Rajd
            Śnieżki to kolejny krok Automobilklubu Karkonosze w budowaniu
            rajdowej mapy regionu — tym razem u stóp najwyższego szczytu
            Karkonoszy.
          </p>

          <p>
            Po raz pierwszy otwieramy imprezę na trzy rangi sportowe. Obok
            Rajdu Okręgowego i Rally Sprintu pojawi się Konkursowa Jazda
            Samochodem, czyli najprostsza droga do pierwszego startu — bez
            licencji sportowej i bez przygotowanego pod sport samochodu. To
            właśnie od KJS-ów zaczynaliśmy odbudowę rajdów w Karkonoszach i
            chcemy, aby ta furtka pozostała otwarta.
          </p>

          <p>
            Zawodnikom przygotowujemy wymagające, górskie odcinki specjalne na
            drogach gminy Piechowice i gminy Stara Kamienica. Kibicom — bezpieczne
            punkty widokowe i jasne zasady, dzięki którym rajd pozostanie
            świętem dla całego regionu.
          </p>

          <p>
            Szczegóły, termin i regulamin uzupełniający opublikujemy na tej
            stronie. Do zobaczenia na trasach.
          </p>
        </blockquote>

        <!-- TODO: po zatwierdzeniu składu organizacyjnego podpisz tekst nazwiskiem
             dyrektora rajdu (etykieta: „Dyrektor Rajdu Śnieżki”). -->
        <div class="mt-8 flex items-center gap-6 border-t border-rally-navy/12 pt-6">
          <img
            :src="organizer.logoOnLight"
            alt=""
            aria-hidden="true"
            class="h-24 w-auto shrink-0"
            loading="lazy"
          />
          <div>
            <p
              class="font-display text-xs font-bold uppercase tracking-[0.26em] text-rally-navy/45 md:text-sm"
            >
              Organizator rajdu
            </p>
            <p
              class="mt-3 font-display text-lg font-semibold uppercase tracking-wide text-rally-navy/70"
            >
              {{ organizer.name }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import SniezkaRidge from "../ui/SniezkaRidge.vue";
import {
  EVENT_NAME,
  location,
  organizer,
  schedule,
} from "../../data/eventConfig.js";

const dateLabel = computed(() =>
  schedule.confirmed ? schedule.dateLabel : schedule.pendingLabel,
);
</script>
