<template>
  <svg
    :viewBox="`0 0 ${shape.width} ${shape.height}`"
    class="h-full w-full"
    role="img"
    :aria-label="ariaLabel"
  >
    <defs>
      <linearGradient
        id="stage-shape-stroke"
        x1="0%"
        y1="0%"
        x2="100%"
        y2="100%"
      >
        <stop offset="0%" stop-color="#F76003" />
        <stop offset="100%" stop-color="#FC8E4A" />
      </linearGradient>
    </defs>

    <rect
      x="0"
      y="0"
      :width="shape.width"
      :height="shape.height"
      rx="22"
      fill="#081522"
    />

    <path
      :d="shape.pathD"
      fill="none"
      stroke="rgba(232,238,243,0.16)"
      stroke-width="9"
      stroke-linecap="round"
      stroke-linejoin="round"
      opacity="0.5"
    />
    <path
      :d="shape.pathD"
      fill="none"
      stroke="url(#stage-shape-stroke)"
      stroke-width="5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />

    <circle
      v-if="shape.start"
      :cx="shape.start.x"
      :cy="shape.start.y"
      r="6"
      fill="#F76003"
      stroke="#081522"
      stroke-width="2"
    />
    <circle
      v-if="shape.finish"
      :cx="shape.finish.x"
      :cy="shape.finish.y"
      r="5"
      fill="#ffffff"
      stroke="#081522"
      stroke-width="2"
    />
  </svg>
</template>

<script setup>
import { computed } from "vue";
import { buildStageShape } from "../../utils/stageShape.js";

const props = defineProps({
  points: {
    type: Array,
    required: true,
  },
  ariaLabel: {
    type: String,
    default: "Podgląd kształtu trasy",
  },
  width: {
    type: Number,
    default: 160,
  },
  height: {
    type: Number,
    default: 112,
  },
  padding: {
    type: Number,
    default: 12,
  },
});

const shape = computed(() =>
  buildStageShape(props.points, {
    width: props.width,
    height: props.height,
    padding: props.padding,
  }),
);
</script>
