<template>
  <!--
    Przejście między sekcjami w stylu rajdowego pomiaru czasu.
    Zamiast rozbryzgu: ukośne cięcie nawierzchni + smugi prędkości,
    które wystrzeliwują w poprzek ekranu w momencie wejścia w kadr.

    fromColor – kolor sekcji POWYŻEJ (tło pasa)
    toColor   – kolor sekcji PONIŻEJ (masa wjeżdżająca od dołu)
    direction – 'right' = pęd w prawo, 'left' = pęd w lewo
  -->
  <div
    ref="rootRef"
    class="speed-divider relative w-full overflow-hidden"
    :class="[isActive ? 'is-active' : '', `dir-${direction}`]"
    :style="{ background: fromColor, height: height }"
    aria-hidden="true"
  >
    <!-- Smugi prędkości nad linią cięcia. -->
    <div class="absolute inset-0">
      <span
        v-for="streak in streaks"
        :key="streak.id"
        class="streak"
        :style="{
          top: streak.top,
          height: streak.thickness,
          width: streak.width,
          background: `linear-gradient(90deg, transparent, ${accentColor} 55%, ${trailColor})`,
          opacity: streak.opacity,
          '--streak-delay': streak.delay,
          '--streak-duration': streak.duration,
        }"
      ></span>
    </div>

    <!-- Nawierzchnia sekcji poniżej, wjeżdżająca ukośnym cięciem. -->
    <svg
      class="shear absolute inset-0 h-full w-full"
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
    >
      <polygon :points="leadingPoints" :fill="toColor" />
      <!-- Podwójna belka pomiaru czasu zamiast półprzejrzystej plamy. -->
      <polyline
        :points="ghostEdgePoints"
        fill="none"
        :stroke="accentColor"
        stroke-width="2"
        opacity="0.4"
        vector-effect="non-scaling-stroke"
      />
      <polyline
        :points="edgePoints"
        fill="none"
        :stroke="accentColor"
        stroke-width="3"
        vector-effect="non-scaling-stroke"
      />
    </svg>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

const props = defineProps({
  fromColor: { type: String, default: "#ffffff" },
  toColor: { type: String, default: "#0e2133" },
  accentColor: { type: String, default: "#e67730" },
  direction: { type: String, default: "right" },
  height: { type: String, default: "clamp(64px, 9vw, 120px)" },
});

const rootRef = ref(null);
const isActive = ref(false);
let observer = null;

const trailColor = computed(() => "rgba(232, 238, 243, 0)");

const streaks = [
  { id: 1, top: "18%", thickness: "2px", width: "34%", opacity: 0.9, delay: "0ms", duration: "620ms" },
  { id: 2, top: "34%", thickness: "3px", width: "52%", opacity: 0.65, delay: "90ms", duration: "540ms" },
  { id: 3, top: "52%", thickness: "2px", width: "26%", opacity: 0.5, delay: "170ms", duration: "700ms" },
  { id: 4, top: "68%", thickness: "4px", width: "44%", opacity: 0.35, delay: "40ms", duration: "480ms" },
];

// Ukos: przy pędzie w prawo krawędź wznosi się w prawą stronę.
const leadingPoints = computed(() =>
  props.direction === "right"
    ? "0,120 1440,120 1440,34 0,96"
    : "0,120 1440,120 1440,96 0,34",
);

const edgePoints = computed(() =>
  props.direction === "right" ? "0,96 1440,34" : "0,34 1440,96",
);

const ghostEdgePoints = computed(() =>
  props.direction === "right" ? "0,78 1440,16" : "0,16 1440,78",
);

onMounted(() => {
  if (typeof IntersectionObserver === "undefined") {
    isActive.value = true;
    return;
  }

  observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        isActive.value = true;
        observer?.disconnect();
        observer = null;
      }
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.2 },
  );

  if (rootRef.value) {
    observer.observe(rootRef.value);
  }
});

onBeforeUnmount(() => {
  observer?.disconnect();
});
</script>

<style scoped>
.shear {
  transform: translate3d(-101%, 0, 0);
  transition: transform 700ms var(--ease-launch, cubic-bezier(0.7, 0, 0.3, 1));
}

.dir-left .shear {
  transform: translate3d(101%, 0, 0);
}

.is-active .shear {
  transform: translate3d(0, 0, 0);
}

.streak {
  position: absolute;
  left: 0;
  transform: translate3d(-120%, 0, 0);
  opacity: 0;
}

.dir-left .streak {
  transform: translate3d(120%, 0, 0) scaleX(-1);
  transform-origin: right center;
  left: auto;
  right: 0;
}

.is-active .streak {
  animation: streak-run var(--streak-duration, 600ms)
    var(--ease-launch, cubic-bezier(0.7, 0, 0.3, 1)) var(--streak-delay, 0ms) 1
    both;
}

@keyframes streak-run {
  0% {
    transform: translate3d(-110%, 0, 0) scaleX(0.4);
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
  100% {
    transform: translate3d(240%, 0, 0) scaleX(1);
    opacity: 0;
  }
}

.dir-left.is-active .streak {
  animation-name: streak-run-left;
}

@keyframes streak-run-left {
  0% {
    transform: translate3d(110%, 0, 0) scaleX(-0.4);
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
  100% {
    transform: translate3d(-240%, 0, 0) scaleX(-1);
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .shear {
    transform: none !important;
    transition: none;
  }

  .streak {
    display: none;
  }
}
</style>
