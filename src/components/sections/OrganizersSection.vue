<template>
  <section class="bg-rally-navy-deep py-16 md:py-20">
    <div class="mx-auto max-w-7xl px-6 md:px-8">
      <div class="mb-12 text-center">
        <p
          class="mb-1 font-display text-sm font-bold uppercase tracking-[0.3em] text-rally-orange/80"
        >
          Organizacja
        </p>
        <h2
          class="text-rally-slant font-display text-4xl font-black uppercase leading-none text-white md:text-6xl"
        >
          Organizatorzy<br />i cykle
        </h2>
      </div>

      <div class="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <h3
            class="mb-8 text-center font-display text-sm font-bold uppercase tracking-widest text-rally-orange"
          >
            Organizatorzy
          </h3>
          <div class="flex flex-col gap-6">
            <div class="group flex items-center gap-5">
              <!-- Logo klubu jest w wersji na ciemne tło – stąd granatowe kółko. -->
              <div
                class="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border border-rally-orange/40 bg-rally-navy p-2 shadow-lg"
              >
                <img
                  :src="organizer.logo"
                  :alt="organizer.name"
                  class="h-full w-full object-contain"
                  loading="lazy"
                />
              </div>
              <div>
                <p
                  class="font-display text-base font-bold uppercase tracking-wide text-white transition-colors duration-200 group-hover:text-rally-orange"
                >
                  {{ organizer.name }}
                </p>
                <p class="text-sm text-rally-snow-dim/70">Organizator główny</p>
              </div>
            </div>

            <div class="group flex items-center gap-5">
              <div
                class="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#fff005] p-2 shadow-lg"
              >
                <img
                  src="/assets/pzm.webp"
                  alt="Polski Związek Motorowy"
                  class="h-full w-full object-contain"
                  loading="lazy"
                />
              </div>
              <div>
                <p
                  class="font-display text-base font-bold uppercase tracking-wide text-white transition-colors duration-200 group-hover:text-rally-orange"
                >
                  Polski Związek Motorowy
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3
            class="mb-8 text-center font-display text-sm font-bold uppercase tracking-widest text-rally-orange"
          >
            Rajd w cyklu
          </h3>

          <div v-if="confirmedCycles.length" class="flex flex-col gap-6">
            <div
              v-for="cycle in confirmedCycles"
              :key="`${cycle.tierCode}-${cycle.src}`"
              class="group flex items-center gap-5"
            >
              <div
                class="flex h-16 w-28 shrink-0 items-center justify-center p-2 md:w-32"
              >
                <img
                  :src="cycle.src"
                  :alt="cycle.alt"
                  class="h-full w-full object-contain"
                  loading="lazy"
                />
              </div>
              <div>
                <p
                  class="font-display text-base font-bold uppercase tracking-wide text-white transition-colors duration-200 group-hover:text-rally-orange"
                >
                  {{ cycle.alt }}
                </p>
                <p class="text-sm text-rally-snow-dim/70">{{ cycle.tierName }}</p>
              </div>
            </div>
          </div>

          <!-- Przynależność do cykli nie jest jeszcze potwierdzona. -->
          <div
            v-else
            class="border border-dashed border-white/15 p-7 text-center"
          >
            <p
              class="font-display text-xs font-bold uppercase tracking-[0.28em] text-rally-orange/80"
            >
              W ustaleniu
            </p>
            <p class="mt-3 text-sm leading-6 text-rally-snow-dim">
              Przynależność Rajdu Śnieżki do cykli mistrzowskich zostanie
              ogłoszona po zatwierdzeniu kalendarza sportowego.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { organizer, tiers } from "../../data/eventConfig.js";

const confirmedCycles = computed(() =>
  tiers.flatMap((tier) =>
    (tier.cycles ?? [])
      .filter((cycle) => cycle.confirmed)
      .map((cycle) => ({
        ...cycle,
        tierCode: tier.code,
        tierName: tier.name,
      })),
  ),
);
</script>
