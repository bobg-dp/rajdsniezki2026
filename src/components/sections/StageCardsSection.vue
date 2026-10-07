<template>
  <section id="oesy" class="surface-asphalt relative overflow-hidden py-16 md:py-20">
    <div
      class="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top,rgba(247,96,3,0.2),transparent_58%)]"
      aria-hidden="true"
    ></div>

    <div class="relative mx-auto max-w-7xl px-6 md:px-8">
      <div class="mb-10 max-w-3xl">
        <p
          class="font-display text-sm font-bold uppercase tracking-[0.32em] text-rally-orange/85"
        >
          Poznaj trasy rajdu
        </p>
        <h2
          class="text-rally-slant mt-3 font-display text-4xl font-black uppercase leading-none text-white md:text-6xl"
        >
          {{ activeTier.key === "kjs" ? "Próby sportowe" : "Odcinki specjalne" }}
        </h2>
        <p class="mt-5 text-base leading-7 text-rally-snow-dim">
          Przebieg tras pochodzi z mapy organizatora. Numeracja odcinków oraz
          godziny startów zostaną potwierdzone w harmonogramie rajdu.
        </p>
      </div>

      <!--
        Każdy poziom imprezy jedzie te same drogi na własnych dystansach,
        dlatego listę filtrujemy przełącznikiem zamiast pokazywać wszystko razem.
      -->
      <div
        class="mb-6 flex flex-wrap items-center gap-2"
        role="group"
        aria-label="Wybierz poziom imprezy"
      >
        <button
          v-for="tier in tiers"
          :key="tier.key"
          type="button"
          :aria-pressed="tier.key === activeTierKey"
          class="flex items-baseline gap-2 border px-4 py-2.5 transition-all duration-200"
          :class="
            tier.key === activeTierKey
              ? 'border-rally-orange bg-rally-orange text-white'
              : 'border-white/15 text-rally-snow-dim hover:border-rally-orange/45 hover:text-white'
          "
          @click="activeTierKey = tier.key"
        >
          <span
            class="font-display text-xs font-bold uppercase tracking-[0.22em]"
          >
            {{ tier.code }}
          </span>
          <span class="hidden text-sm font-semibold sm:inline">
            {{ tier.name }}
          </span>
        </button>
      </div>

      <p class="mb-10 max-w-3xl text-sm leading-6 text-rally-snow-dim/75">
        Wszystkie poziomy jadą na tych samych drogach. Rally Sprint i KJS
        kończą wcześniej, na własnej mecie lotnej.
      </p>

      <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
        <RouterLink
          v-for="stage in visibleStages"
          :key="stage.slug"
          :to="stage.path"
          class="group flex h-full flex-col border border-white/10 bg-white/[0.04] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-rally-orange/45 hover:bg-white/[0.07]"
        >
          <div class="flex items-start justify-between gap-3">
            <div>
              <p
                class="font-display text-xs font-bold uppercase tracking-[0.28em] text-rally-orange/85"
              >
                {{ stage.code }}
              </p>
              <h3
                class="text-rally-slant mt-3 font-display text-3xl font-black uppercase leading-none text-white"
              >
                {{ stage.name }}
              </h3>
              <p class="mt-2 text-sm text-rally-snow-dim/80">
                {{ stage.typeLabel }}
              </p>
            </div>

            <div class="border border-white/10 px-3 py-2 text-right">
              <p
                class="font-display text-[11px] font-bold uppercase tracking-[0.22em] text-rally-snow-dim/70"
              >
                Dystans
              </p>
              <p class="font-display text-xl font-black leading-none text-white">
                {{ formatStageDistance(stage.distanceKm) }}
                <span class="text-sm text-rally-snow-dim/70">km</span>
              </p>
            </div>
          </div>

          <div class="mt-6 overflow-hidden border border-white/10 bg-black/40 p-3">
            <div class="aspect-[10/7]">
              <StageShapePreview
                :points="stage.shapePoints"
                :aria-label="`Kształt trasy ${stage.headline}`"
              />
            </div>
          </div>

          <!-- Poziomy imprezy, które rozgrywają ten odcinek. -->
          <ul class="mt-5 flex flex-wrap gap-2">
            <li
              v-for="tierKey in stage.tiers"
              :key="tierKey"
              class="border px-2.5 py-1 font-display text-[11px] font-bold uppercase tracking-[0.18em]"
              :class="
                tierKey === activeTierKey
                  ? 'border-rally-orange bg-rally-orange/15 text-rally-orange'
                  : 'border-white/15 text-rally-snow-dim/65'
              "
            >
              {{ tiersByKey[tierKey].code }}
            </li>
          </ul>

          <p class="mt-4 flex-1 text-sm leading-6 text-rally-snow-dim">
            {{ stage.cardSummary }}
          </p>

          <span
            class="mt-5 inline-flex items-center gap-2 font-display text-sm font-bold uppercase tracking-[0.22em] text-rally-orange transition-all duration-200 group-hover:gap-3"
          >
            Przejdź do odcinka
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </span>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from "vue";
import { RouterLink } from "vue-router";
import { getStagesForTier } from "../../data/stages.js";
import { tiers, tiersByKey } from "../../data/eventConfig.js";
import { formatStageDistance } from "../../utils/stageShape.js";
import StageShapePreview from "../ui/StageShapePreview.vue";

// Domyślnie pokazujemy najwyższy poziom – to jego pełne przebiegi trafiają
// do prerenderowanego HTML-a.
const activeTierKey = ref(tiers[0].key);
const activeTier = computed(() => tiersByKey[activeTierKey.value]);
const visibleStages = computed(() => getStagesForTier(activeTierKey.value));
</script>
