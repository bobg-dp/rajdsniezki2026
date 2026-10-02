<template>
  <div>
    <TheHeader />
    <main class="min-h-screen pt-48 pb-20">
      <div class="max-w-7xl mx-auto px-6 md:px-8">
        <h1 class="font-display font-black uppercase text-rally-navy text-4xl md:text-6xl mb-12">Aktualności</h1>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <NewsCard v-for="item in allNews" :key="item.id" :news="item" />
        </div>
      </div>
    </main>
    <TheFooter />
  </div>
</template>

<script setup>
import TheHeader from '../components/layout/TheHeader.vue'
import TheFooter from '../components/layout/TheFooter.vue'
import NewsCard from '../components/ui/NewsCard.vue'
import { allNews } from '../data/news.js'
</script>
