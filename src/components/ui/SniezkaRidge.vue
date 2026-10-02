<template>
  <svg
    viewBox="0 0 1440 420"
    :preserveAspectRatio="preserveAspectRatio"
    class="block h-full w-full"
    aria-hidden="true"
    focusable="false"
  >
    <!-- Warstwa najdalsza – grzbiet Karkonoszy za masywem Śnieżki. -->
    <path
      d="M0 330 L140 306 L280 322 L420 262 L540 292 L648 216 L720 172 L804 232 L930 206 L1060 264 L1190 238 L1310 282 L1440 262 L1440 420 L0 420 Z"
      :fill="farColor"
    />

    <!-- Warstwa środkowa. -->
    <path
      d="M0 366 L160 344 L320 354 L450 302 L560 326 L664 256 L740 292 L870 256 L1000 308 L1140 278 L1270 318 L1380 302 L1440 324 L1440 420 L0 420 Z"
      :fill="midColor"
    />

    <!-- Masyw Śnieżki – pierwszy plan. -->
    <g :fill="nearColor">
      <path
        d="M0 420 L0 360 L150 340 L330 300 L500 230 L640 120 L720 70 L812 152 L980 240 L1150 310 L1300 350 L1440 368 L1440 420 Z"
      />
      <!-- Światło na grani – bez niego sylwetka gubi się w tle. -->
      <polyline
        points="0 360 150 340 330 300 500 230 640 120 720 70 812 152 980 240 1150 310 1300 350 1440 368"
        fill="none"
        :stroke="rimColor"
        stroke-width="2.5"
        vector-effect="non-scaling-stroke"
      />

      <!-- Wyższa wieża obserwatorium, wsparta na szczycie. -->
      <rect x="714" y="34" width="11" height="42" />
      <ellipse cx="719" cy="34" rx="66" ry="13" />
      <ellipse cx="719" cy="22" rx="48" ry="9" />

      <!-- Druga, niższa kopuła – jak w logo rajdu. -->
      <rect x="836" y="130" width="9" height="42" />
      <ellipse cx="840" cy="130" rx="48" ry="10" />
      <ellipse cx="840" cy="121" rx="34" ry="7" />
    </g>

    <!-- Przeszklenia obserwatorium. -->
    <g :fill="skyColor">
      <rect
        v-for="x in 9"
        :key="`top-${x}`"
        :x="667 + (x - 1) * 12"
        y="29"
        width="6"
        height="9"
      />
      <rect
        v-for="x in 6"
        :key="`low-${x}`"
        :x="804 + (x - 1) * 13"
        y="125"
        width="6"
        height="8"
      />
    </g>

    <!-- Śnieg na graniach – delikatny akcent, nie pełne wypełnienie. -->
    <path
      d="M640 120 L720 70 L762 108 L716 128 L686 110 Z
         M500 230 L566 180 L600 212 L544 240 Z
         M812 152 L868 200 L826 214 L790 178 Z"
      :fill="snowColor"
      opacity="0.55"
    />
  </svg>
</template>

<script setup>
defineProps({
  farColor: { type: String, default: "rgba(36, 69, 95, 0.55)" },
  midColor: { type: String, default: "rgba(24, 54, 78, 0.85)" },
  nearColor: { type: String, default: "#081522" },
  rimColor: { type: String, default: "rgba(232, 238, 243, 0.2)" },
  skyColor: { type: String, default: "rgba(232, 238, 243, 0.3)" },
  snowColor: { type: String, default: "rgba(232, 238, 243, 0.22)" },
  // „none” rozciąga grzbiet na pełną szerokość i nie obcina szczytu.
  preserveAspectRatio: { type: String, default: "none" },
});
</script>
