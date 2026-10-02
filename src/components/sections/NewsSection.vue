<template>
  <section id="aktualnosci" class="bg-rally-orange py-16 md:py-20">
    <div class="mx-auto max-w-7xl px-6 md:px-8">
      <div class="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p
            class="mb-1 font-display text-sm font-bold uppercase tracking-[0.3em] text-rally-navy/60"
          >
            Co słychać
          </p>
          <h2
            class="text-rally-slant font-display text-4xl font-black uppercase leading-none text-rally-navy md:text-6xl"
          >
            Aktualności
          </h2>
        </div>
        <RouterLink
          to="/aktualnosci"
          class="shrink-0 self-start bg-rally-navy px-6 py-3 font-display text-sm font-bold uppercase tracking-wider text-white transition-colors duration-200 hover:bg-rally-navy-deep md:self-auto"
        >
          Zobacz wszystkie
        </RouterLink>
      </div>

      <div :class="gridClass">
        <NewsCard v-for="item in latestNews" :key="item.id" :news="item" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { RouterLink } from "vue-router";
import NewsCard from "../ui/NewsCard.vue";
import { getLatestNews } from "../../data/news.js";

const latestNews = getLatestNews();

// Przy jednym lub dwóch wpisach kafelki nie rozciągają się na całą szerokość.
const gridClass = computed(() => {
  if (latestNews.length === 1) {
    return "grid max-w-xl grid-cols-1 gap-6";
  }

  if (latestNews.length === 2) {
    return "grid grid-cols-1 gap-6 md:grid-cols-2";
  }

  return "grid grid-cols-1 gap-6 md:grid-cols-3";
});
</script>
