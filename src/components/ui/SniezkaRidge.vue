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
    </g>

    <!-- Śnieg na graniach – delikatny akcent, nie pełne wypełnienie. -->
    <path
      d="M612 148 L668 108 L696 130 L640 172 Z
         M500 230 L566 180 L600 212 L544 240 Z
         M840 188 L896 232 L856 248 L818 212 Z"
      :fill="snowColor"
      opacity="0.55"
    />

    <!-- Obserwatorium: jedna bryła z dwóch dysków, wyrastająca ze szczytu.
         Rysowane po śniegu, więc przesłania grań tak jak w rzeczywistości. -->
    <g :fill="nearColor">
      <!-- Maszt na wyższym dysku. -->
      <rect x="698" y="6" width="3" height="34" />

      <!-- Trzon wyższej części – schowany w zboczu, bez widocznej nóżki. -->
      <path d="M678 56 L722 56 L727 114 L673 114 Z" />
      <!-- Wyższy dysk: okap + przeszklony bęben. -->
      <ellipse cx="700" cy="38" rx="66" ry="12" />
      <rect x="644" y="38" width="112" height="19" />
      <ellipse cx="700" cy="57" rx="56" ry="10" />
      <ellipse cx="700" cy="26" rx="44" ry="8" />

      <!-- Trzon niższej części, oparty na tym samym szczycie. -->
      <path d="M762 80 L818 80 L823 172 L757 172 Z" />
      <!-- Niższy dysk – jego okap dotyka spodu wyższego, jak w logo. -->
      <ellipse cx="792" cy="66" rx="52" ry="10" />
      <rect x="740" y="66" width="104" height="15" />
      <ellipse cx="792" cy="81" rx="44" ry="8" />
    </g>

    <!-- Przeszklenia obserwatorium. -->
    <g :fill="skyColor">
      <rect
        v-for="x in 9"
        :key="`top-${x}`"
        :x="656 + (x - 1) * 11"
        y="42"
        width="6"
        height="11"
      />
      <rect
        v-for="x in 7"
        :key="`low-${x}`"
        :x="758 + (x - 1) * 11"
        y="69"
        width="6"
        height="9"
      />
    </g>
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
