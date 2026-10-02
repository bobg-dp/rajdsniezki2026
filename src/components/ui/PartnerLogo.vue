<template>
  <component
    :is="href ? 'a' : 'div'"
    :href="href || undefined"
    :title="linkTitle || label"
    :target="href ? '_blank' : undefined"
    :rel="href ? 'noopener noreferrer' : undefined"
    class="relative bg-gray-50 border border-gray-200 flex items-center justify-center p-4 overflow-hidden transition-all duration-300 group"
    :class="href ? 'hover:border-rally-orange hover:bg-white hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(19,20,20,0.14)]' : 'hover:border-rally-orange hover:shadow-[0_10px_24px_rgba(19,20,20,0.08)]'"
    style="aspect-ratio: 3/2;"
  >
    <div
      class="absolute inset-x-0 top-0 h-1 bg-rally-orange origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
      aria-hidden="true"
    ></div>

    <img
      v-if="logo"
      :src="logo"
      :alt="label"
      class="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
      loading="lazy"
    />
    <span v-else class="font-display font-semibold uppercase text-xs tracking-wider text-gray-400 group-hover:text-gray-600 transition-colors text-center">
      {{ label }}
    </span>

    <span
      v-if="href"
      class="absolute right-3 top-3 inline-flex items-center justify-center w-7 h-7 rounded-full bg-rally-orange text-rally-navy opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0"
      aria-hidden="true"
    >
      <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M9 7h8v8" />
      </svg>
    </span>
  </component>
</template>

<script setup>
defineProps({
  label: { type: String, default: 'Partner' },
  logo:  { type: String, default: null },
  href: { type: String, default: null },
  linkTitle: { type: String, default: null },
})
</script>
