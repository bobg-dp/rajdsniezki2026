<template>
  <section
    id="hero"
    class="relative w-full overflow-hidden bg-rally-navy-deep"
    style="height: 100svh; min-height: 620px"
  >
    <!-- Nawierzchnia: gradient asfaltu + opcjonalne zdjęcie rajdowe. -->
    <div class="absolute inset-0 hero-asphalt"></div>
    <div v-if="photo" class="absolute inset-0 hero-photo" :style="photoStyle"></div>
    <div class="absolute inset-0 hero-veil"></div>

    <!-- Masyw Śnieżki – ten sam motyw co w logo rajdu. -->
    <div
      ref="ridgeRef"
      class="pointer-events-none absolute inset-x-0 bottom-0 h-[46%] min-h-60 md:h-[54%]"
    >
      <SniezkaRidge />
    </div>

    <!-- Pomarańczowa wstęga trasy u podnóża gór – motyw z logo rajdu. -->
    <svg
      class="pointer-events-none absolute inset-x-0 bottom-0 h-[18%] w-full md:h-[20%]"
      viewBox="0 0 1440 160"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        ref="trailBackRef"
        d="M-40 150 C260 128 520 136 760 108 C1000 80 1220 86 1480 58"
        fill="none"
        stroke="rgba(232,238,243,0.16)"
        stroke-width="7"
        stroke-linecap="round"
      />
      <path
        ref="trailRef"
        d="M-40 132 C270 110 530 118 772 88 C1012 58 1230 64 1480 34"
        fill="none"
        stroke="#e67730"
        stroke-width="9"
        stroke-linecap="round"
        opacity="0.9"
      />
    </svg>

    <!-- Smugi prędkości przelatujące przez kadr przy starcie. -->
    <div class="pointer-events-none absolute inset-0 overflow-hidden">
      <span
        v-for="streak in streaks"
        :key="streak.id"
        class="hero-streak"
        :style="{
          top: streak.top,
          height: streak.thickness,
          width: streak.width,
          animationDelay: streak.delay,
          opacity: streak.opacity,
        }"
      ></span>
    </div>

    <!-- Treść -->
    <div
      class="relative z-20 mx-auto flex h-full max-w-7xl flex-col justify-center px-6 pt-28 pb-28 md:px-10 md:pt-36 lg:px-14"
    >
      <p
        ref="kickerRef"
        class="font-display text-xs font-bold uppercase tracking-[0.42em] text-rally-orange md:text-sm"
      >
        Automobilklub Karkonosze
      </p>

      <h1 class="mt-3 font-display font-black uppercase leading-[0.84] md:mt-4">
        <span class="hero-line">
          <span
            ref="line1Ref"
            class="text-rally-slant block text-white text-6xl md:text-8xl lg:text-[8.5rem]"
          >
            Rajd
          </span>
        </span>
        <span class="hero-line">
          <span
            ref="line2Ref"
            class="text-rally-slant block text-rally-orange text-6xl md:text-8xl lg:text-[8.5rem]"
          >
            Śnieżki
          </span>
        </span>
      </h1>

      <!-- Termin i miejsce -->
      <div ref="metaRef" class="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
        <span class="h-px w-10 bg-rally-orange md:w-16"></span>
        <span
          class="font-display text-base font-bold uppercase tracking-[0.2em] text-white md:text-xl"
        >
          {{ dateLabel }}
        </span>
        <span class="hidden h-5 w-px bg-white/25 sm:block"></span>
        <span
          class="font-display text-sm font-semibold uppercase tracking-[0.3em] text-rally-snow-dim md:text-base"
        >
          {{ location.city }}
        </span>
      </div>

      <!-- Trzy poziomy imprezy jako tablice startowe -->
      <ul ref="tiersRef" class="mt-8 flex flex-wrap gap-3 md:mt-10 md:gap-4">
        <li v-for="tier in tiers" :key="tier.key">
          <RouterLink
            :to="`/${tier.slug}`"
            class="group flex items-center gap-3 border border-white/15 bg-black/35 px-4 py-3 backdrop-blur-sm transition-colors duration-200 hover:border-rally-orange hover:bg-rally-orange/10 md:px-5"
          >
            <span
              class="font-display text-2xl font-black italic leading-none text-rally-orange md:text-3xl"
            >
              {{ tier.code }}
            </span>
            <span class="h-7 w-px bg-white/15"></span>
            <span
              class="font-display text-xs font-bold uppercase tracking-[0.18em] text-white transition-colors duration-200 group-hover:text-rally-orange md:text-sm"
            >
              {{ tier.name }}
            </span>
          </RouterLink>
        </li>
      </ul>
    </div>

    <ScrollArrow />
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import { gsap } from "gsap";
import ScrollArrow from "../ui/ScrollArrow.vue";
import SniezkaRidge from "../ui/SniezkaRidge.vue";
import { location, schedule, tiers } from "../../data/eventConfig.js";

const props = defineProps({
  // Zdjęcie rajdowe jest opcjonalne – bez niego hero stoi na grafice wektorowej.
  photo: { type: String, default: null },
});

const photoStyle = computed(() =>
  props.photo ? { backgroundImage: `url(${props.photo})` } : {},
);

const dateLabel = computed(() =>
  schedule.confirmed ? schedule.dateLabel : schedule.pendingLabel,
);

const streaks = [
  { id: 1, top: "22%", thickness: "2px", width: "38%", opacity: 0.7, delay: "260ms" },
  { id: 2, top: "31%", thickness: "3px", width: "56%", opacity: 0.45, delay: "180ms" },
  { id: 3, top: "58%", thickness: "2px", width: "30%", opacity: 0.55, delay: "420ms" },
  { id: 4, top: "72%", thickness: "4px", width: "46%", opacity: 0.3, delay: "340ms" },
];

const ridgeRef = ref(null);
const trailRef = ref(null);
const trailBackRef = ref(null);
const kickerRef = ref(null);
const line1Ref = ref(null);
const line2Ref = ref(null);
const metaRef = ref(null);
const tiersRef = ref(null);

onMounted(() => {
  // Stan początkowy ustawiamy z JS, nie klasami – bez skryptu treść jest widoczna.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const titleLines = [line1Ref.value, line2Ref.value];
  const tierChips = Array.from(tiersRef.value.children);

  gsap.timeline({ defaults: { ease: "expo.out" } })
    .from(ridgeRef.value, { yPercent: 14, opacity: 0, duration: 1.1 })
    .from(
      kickerRef.value,
      { opacity: 0, x: -24, duration: 0.5, ease: "power3.out" },
      "-=0.75",
    )
    // Tytuł wjeżdża „zza maski” – szybka maska clip-path zamiast zwykłego fade.
    .from(
      titleLines,
      {
        clipPath: "inset(0 100% 0 0)",
        xPercent: -6,
        skewX: -9,
        duration: 0.72,
        stagger: 0.11,
      },
      "-=0.3",
    )
    .from(metaRef.value, { opacity: 0, y: 18, duration: 0.5 }, "-=0.24")
    .from(
      tierChips,
      { opacity: 0, y: 22, skewX: -8, duration: 0.45, stagger: 0.08 },
      "-=0.3",
    );

  // Trasa rysuje się od startu do mety.
  [trailBackRef.value, trailRef.value].forEach((path, index) => {
    const length = path.getTotalLength();
    gsap.fromTo(
      path,
      { strokeDasharray: length, strokeDashoffset: length },
      {
        strokeDashoffset: 0,
        duration: 1.5,
        delay: 0.25 + index * 0.08,
        ease: "power2.inOut",
      },
    );
  });
});
</script>

<style scoped>
.hero-asphalt {
  background:
    radial-gradient(ellipse at 18% 28%, rgba(230, 119, 48, 0.16) 0%, transparent 58%),
    radial-gradient(ellipse at 82% 12%, rgba(232, 238, 243, 0.1) 0%, transparent 52%),
    linear-gradient(168deg, #0e2133 0%, #18364e 46%, #0e2133 100%);
}

.hero-photo {
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 0.4;
}

.hero-veil {
  background: linear-gradient(
    180deg,
    rgba(8, 21, 34, 0.55) 0%,
    rgba(14, 33, 51, 0.3) 38%,
    rgba(8, 21, 34, 0.82) 100%
  );
}

/* Maska dla wierszy tytułu – nic nie wystaje poza linię bazową. */
.hero-line {
  display: block;
  overflow: hidden;
}

.hero-streak {
  position: absolute;
  left: 0;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(230, 119, 48, 0.9) 60%,
    rgba(232, 238, 243, 0)
  );
  animation: rally-streak 900ms cubic-bezier(0.7, 0, 0.3, 1) both;
}

@media (prefers-reduced-motion: reduce) {
  .hero-streak {
    display: none;
  }
}
</style>
