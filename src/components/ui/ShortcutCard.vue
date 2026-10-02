<template>
  <component
    :is="item.disabled ? 'div' : RouterLink"
    v-bind="item.disabled ? { 'aria-disabled': 'true' } : { to: item.to }"
    :class="[
      'group flex flex-col items-center text-center p-8 border transition-all duration-300',
      item.disabled
        ? 'border-rally-steel/40 bg-rally-navy/40 cursor-not-allowed opacity-75'
        : 'border-rally-steel hover:border-rally-orange hover:bg-rally-steel cursor-pointer',
    ]"
  >
    <!-- Ikona / logotypy -->
    <div
      v-if="item.logos?.length"
      class="mb-5 flex flex-wrap items-center justify-center gap-3 md:gap-4 min-h-20"
    >
      <div
        v-for="logo in item.logos"
        :key="logo.src"
        :class="[
          'flex items-center justify-center w-20 h-12 md:w-24 md:h-14 transition-transform duration-300',
          item.disabled ? '' : 'group-hover:scale-105',
        ]"
      >
        <img
          :src="logo.src"
          :alt="logo.alt"
          class="max-w-full max-h-full object-contain drop-shadow-lg"
          loading="lazy"
        />
      </div>
    </div>

    <div
      v-else
      :class="[
        'w-16 h-16 mb-5 flex items-center justify-center text-rally-orange transition-transform duration-300',
        item.disabled ? '' : 'group-hover:scale-110',
      ]"
    >
      <component :is="iconComponents[item.icon]" class="w-full h-full" />
    </div>

    <h3
      :class="[
        'font-display font-bold uppercase text-xl tracking-wide mb-2 transition-colors duration-200',
        item.disabled ? 'text-white' : 'text-white group-hover:text-rally-orange',
      ]"
    >
      {{ item.label }}
    </h3>
    <p class="text-gray-400 text-sm leading-relaxed">{{ item.desc }}</p>
    <p v-if="item.note" class="mt-2 text-xs font-display font-bold uppercase tracking-[0.2em] text-rally-orange/90">
      {{ item.note }}
    </p>

    <!-- Arrow indicator -->
    <div
      v-if="!item.disabled"
      class="mt-4 w-8 h-0.5 bg-rally-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
    ></div>
  </component>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { defineComponent, h } from 'vue'

defineProps({
  item: { type: Object, required: true },
})

// Inline SVG icons
const SteeringIcon = defineComponent({
  render() {
    return h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
      h('circle', { cx: '12', cy: '12', r: '10' }),
      h('circle', { cx: '12', cy: '12', r: '3' }),
      h('line', { x1: '12', y1: '2', x2: '12', y2: '9' }),
      h('line', { x1: '4.22', y1: '16', x2: '9.58', y2: '13.5' }),
      h('line', { x1: '19.78', y1: '16', x2: '14.42', y2: '13.5' }),
    ])
  },
})

const FlagIcon = defineComponent({
  render() {
    return h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
      h('path', { d: 'M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z' }),
      h('line', { x1: '4', y1: '22', x2: '4', y2: '15' }),
    ])
  },
})

const MapPinIcon = defineComponent({
  render() {
    return h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
      h('path', { d: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z' }),
      h('circle', { cx: '12', cy: '10', r: '3' }),
    ])
  },
})

const CalendarIcon = defineComponent({
  render() {
    return h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
      h('rect', { x: '3', y: '4', width: '18', height: '18', rx: '2', ry: '2' }),
      h('line', { x1: '16', y1: '2', x2: '16', y2: '6' }),
      h('line', { x1: '8', y1: '2', x2: '8', y2: '6' }),
      h('line', { x1: '3', y1: '10', x2: '21', y2: '10' }),
    ])
  },
})

const MapIcon = defineComponent({
  render() {
    return h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
      h('polygon', { points: '3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21' }),
      h('line', { x1: '9', y1: '3', x2: '9', y2: '18' }),
      h('line', { x1: '15', y1: '6', x2: '15', y2: '21' }),
    ])
  },
})

const StarIcon = defineComponent({
  render() {
    return h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
      h('polygon', { points: '12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' }),
    ])
  },
})

const iconComponents = {
  steering: SteeringIcon,
  flag: FlagIcon,
  'map-pin': MapPinIcon,
  calendar: CalendarIcon,
  map: MapIcon,
  star: StarIcon,
}
</script>
