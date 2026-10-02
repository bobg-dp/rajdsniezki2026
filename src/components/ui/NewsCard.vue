<template>
  <article class="bg-white rounded-none overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col group">
    <!-- Placeholder zdjęcia -->
    <div class="relative bg-rally-steel overflow-hidden" style="aspect-ratio: 16/9;">
      <div class="absolute inset-0 flex items-center justify-center">
        <svg class="w-12 h-12 text-rally-orange opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
        </svg>
      </div>
      <div
        v-if="news.image"
        class="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
        :style="{ backgroundImage: `url(${news.image})` }"
      ></div>
      <!-- Kategoria badge -->
      <span class="absolute top-3 left-3 bg-rally-orange text-rally-navy font-display font-bold uppercase text-xs px-3 py-1 tracking-wider">
        {{ news.category || 'Aktualności' }}
      </span>
    </div>

    <!-- Content -->
    <div class="flex flex-col flex-1 p-5">
      <time class="font-display text-xs uppercase tracking-widest text-gray-400 mb-2">{{ news.date }}</time>
      <h3 class="font-display font-bold uppercase text-rally-navy text-lg md:text-xl leading-tight mb-3 group-hover:text-rally-orange-dark transition-colors duration-200">
        {{ news.title }}
      </h3>
      <p class="text-gray-600 text-sm leading-relaxed flex-1 mb-4">
        {{ news.excerpt }}
      </p>
      <RouterLink
        :to="news.url || '/aktualnosci'"
        class="font-display font-bold uppercase text-sm tracking-wider text-rally-navy border-b-2 border-rally-orange inline-flex items-center gap-2 w-fit hover:gap-3 transition-all duration-200"
      >
        Czytaj więcej
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
        </svg>
      </RouterLink>
    </div>
  </article>
</template>

<script setup>
import { RouterLink } from 'vue-router'
defineProps({
  news: {
    type: Object,
    required: true,
  },
})
</script>
