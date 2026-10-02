<template>
  <div v-if="isVisible" :class="containerClass">
    <!-- Dopóki organizator nie ogłosi terminu, zamiast licznika pokazujemy zapowiedź. -->
    <template v-if="!schedule.confirmed">
      <p :class="compactTextClass">{{ schedule.pendingLabel }}</p>
    </template>

    <template v-else-if="layout === 'compact'">
      <p :class="compactTextClass">
        {{ compactText }}
      </p>
    </template>

    <template v-else-if="layout === 'inline'">
      <div class="flex items-center gap-3 whitespace-nowrap">
        <p :class="headingClass">
          {{ heading }}
        </p>

        <div :class="dividerClass"></div>

        <div class="flex items-center gap-2">
          <div v-for="unit in units" :key="unit.label" :class="inlineUnitClass">
            <span :class="inlineValueClass">{{ unit.value }}</span>
            <span :class="inlineLabelClass">{{ unit.label }}</span>
          </div>
        </div>
      </div>
    </template>

    <template v-else>
      <p :class="headingClass">
        {{ heading }}
      </p>

      <div class="mt-3 flex items-stretch gap-2 md:gap-3">
        <div v-for="unit in units" :key="unit.label" :class="stackedUnitClass">
          <p :class="stackedValueClass">{{ unit.value }}</p>
          <p :class="stackedLabelClass">{{ unit.label }}</p>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { schedule } from "../../data/eventConfig.js";

const props = defineProps({
  layout: {
    type: String,
    default: "stacked",
  },
  variant: {
    type: String,
    default: "dark",
  },
});

const START_DATE = new Date(schedule.startIso);
const END_DATE = new Date(schedule.endIso);
const MS_IN_SECOND = 1000;
const MS_IN_MINUTE = 60 * 1000;
const MS_IN_HOUR = 60 * MS_IN_MINUTE;
const MS_IN_DAY = 24 * MS_IN_HOUR;

const now = ref(new Date());
const isReady = ref(false);
let intervalId = null;

const status = computed(() => {
  if (now.value < START_DATE) return "before";
  if (now.value < END_DATE) return "live";
  return "after";
});

const targetDate = computed(() =>
  status.value === "before" ? START_DATE : END_DATE,
);

const isVisible = computed(
  () => isReady.value && (!schedule.confirmed || status.value !== "after"),
);

const heading = computed(() =>
  status.value === "before" ? "Do startu:" : "Rajd trwa - do końca",
);

const timeLeft = computed(() => {
  const diff = Math.max(0, targetDate.value.getTime() - now.value.getTime());
  const days = Math.floor(diff / MS_IN_DAY);
  const hours = Math.floor((diff % MS_IN_DAY) / MS_IN_HOUR);
  const minutes = Math.floor((diff % MS_IN_HOUR) / MS_IN_MINUTE);
  const seconds = Math.floor((diff % MS_IN_MINUTE) / MS_IN_SECOND);

  return {
    days: String(days).padStart(2, "0"),
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
  };
});

const units = computed(() => [
  { label: "d", value: timeLeft.value.days },
  { label: "h", value: timeLeft.value.hours },
  { label: "m", value: timeLeft.value.minutes },
  { label: "s", value: timeLeft.value.seconds },
]);

const compactPrefix = computed(() =>
  status.value === "before" ? "Start za" : "Rajd trwa",
);

const compactTime = computed(() => {
  if (Number(timeLeft.value.days) > 0) {
    return `${Number(timeLeft.value.days)}:${timeLeft.value.hours}:${timeLeft.value.minutes}:${timeLeft.value.seconds}`;
  }

  return `${timeLeft.value.hours}:${timeLeft.value.minutes}:${timeLeft.value.seconds}`;
});

const compactText = computed(
  () => `${compactPrefix.value} ${compactTime.value}`,
);

const containerClass = computed(() => {
  if (props.variant === "light" && props.layout === "compact") {
    return "mx-auto block max-w-full overflow-hidden rounded-full border border-rally-navy/10 bg-white/92 px-3 py-1.5 text-center shadow-[0_8px_20px_rgba(0,0,0,0.10)] backdrop-blur-md";
  }

  if (props.variant === "light" && props.layout === "inline") {
    return "mx-auto inline-flex max-w-full items-center rounded-full border border-rally-navy/10 bg-white/92 px-3 py-2 text-center shadow-[0_10px_24px_rgba(0,0,0,0.12)] backdrop-blur-md";
  }

  return "mx-auto inline-flex max-w-full flex-col items-center rounded-2xl border border-rally-orange/35 bg-black/55 px-4 py-3 text-center backdrop-blur-md shadow-[0_16px_42px_rgba(0,0,0,0.45)] md:px-6 md:py-4";
});

const headingClass = computed(() => {
  if (props.variant === "light" && props.layout === "inline") {
    return "font-display text-[11px] font-bold uppercase tracking-[0.22em] text-rally-navy";
  }

  return "font-display text-xs font-bold uppercase tracking-[0.28em] text-rally-orange/95";
});

const compactTextClass = computed(() => {
  if (props.variant === "light") {
    return "block truncate font-display text-[15px] font-black uppercase tracking-[0.14em] text-rally-navy";
  }

  return "block truncate font-display text-[15px] font-black uppercase tracking-[0.14em] text-white";
});

const dividerClass = computed(() => {
  if (props.variant === "light") {
    return "h-6 w-px bg-rally-navy/10";
  }

  return "h-6 w-px bg-white/15";
});

const inlineUnitClass = computed(() => {
  if (props.variant === "light") {
    return "flex items-baseline gap-1 rounded-full bg-rally-orange/16 px-2.5 py-1";
  }

  return "flex items-baseline gap-1 rounded-full bg-white/8 px-2.5 py-1";
});

const inlineValueClass = computed(() => {
  if (props.variant === "light") {
    return "font-display text-lg font-black leading-none text-rally-navy";
  }

  return "font-display text-lg font-black leading-none text-white";
});

const inlineLabelClass = computed(() => {
  if (props.variant === "light") {
    return "font-display text-[10px] font-bold uppercase tracking-[0.16em] text-rally-navy/70";
  }

  return "font-display text-[10px] font-bold uppercase tracking-[0.16em] text-rally-snow-dim";
});

const stackedUnitClass = computed(() => {
  if (props.variant === "light") {
    return "min-w-18 rounded-xl border border-rally-navy/10 bg-rally-orange/12 px-3 py-2 md:min-w-20 md:px-4";
  }

  return "min-w-18 rounded-xl border border-white/12 bg-white/5 px-3 py-2 md:min-w-20 md:px-4";
});

const stackedValueClass = computed(() => {
  if (props.variant === "light") {
    return "font-display text-2xl font-black leading-none text-rally-navy md:text-3xl";
  }

  return "font-display text-2xl font-black leading-none text-white md:text-3xl";
});

const stackedLabelClass = computed(() => {
  if (props.variant === "light") {
    return "mt-1 font-display text-[11px] font-bold uppercase tracking-[0.22em] text-rally-navy/70";
  }

  return "mt-1 font-display text-[11px] font-bold uppercase tracking-[0.22em] text-rally-snow-dim";
});

onMounted(() => {
  isReady.value = true;
  now.value = new Date();

  intervalId = window.setInterval(() => {
    now.value = new Date();
  }, MS_IN_SECOND);
});

onBeforeUnmount(() => {
  if (intervalId) {
    window.clearInterval(intervalId);
  }
});
</script>
