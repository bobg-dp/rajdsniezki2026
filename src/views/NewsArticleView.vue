<template>
  <div>
    <TheHeader />
    <main class="min-h-screen pt-32 md:pt-48 pb-20">
      <div class="max-w-4xl mx-auto px-6 md:px-8" v-if="article">
        <nav
          class="flex items-center gap-2 text-xs font-display font-bold uppercase tracking-wider text-gray-400 mb-10"
        >
          <RouterLink to="/" class="hover:text-rally-orange transition-colors"
            >Strona główna</RouterLink
          >
          <span>/</span>
          <RouterLink
            to="/aktualnosci"
            class="hover:text-rally-orange transition-colors"
            >Aktualności</RouterLink
          >
          <span>/</span>
          <span class="text-rally-navy">{{ article.breadcrumbLabel }}</span>
        </nav>

        <div class="mb-10">
          <span
            class="inline-block bg-rally-orange text-rally-navy font-display font-bold uppercase text-xs px-3 py-1 tracking-wider mb-4"
            >{{ article.category }}</span
          >
          <h1
            class="font-display font-black uppercase text-rally-navy text-3xl md:text-5xl leading-tight mb-4"
          >
            {{ article.title }}
          </h1>
          <time class="font-display text-sm uppercase tracking-widest text-gray-400"
            >{{ article.date }}</time
          >
        </div>

        <!-- Plakaty mają proporcje kwadratu, dlatego zamiast kadrowania skalujemy całą grafikę. -->
        <img
          v-if="article.image"
          :src="article.image"
          :alt="article.imageAlt || article.title"
          class="mx-auto mb-10 max-h-140 w-full max-w-3xl object-contain"
        />

        <div
          class="prose-custom max-w-none mb-12 space-y-5 text-rally-steel leading-relaxed text-base md:text-lg"
        >
          <p v-for="paragraph in article.body" :key="paragraph">
            {{ paragraph }}
          </p>
        </div>

        <div class="flex flex-col sm:flex-row gap-4">
          <component
            v-for="cta in article.ctas"
            :key="cta.to"
            :is="isExternalLink(cta.to) ? 'a' : RouterLink"
            v-bind="getCtaLinkProps(cta.to)"
            :class="getCtaClass(cta.theme)"
          >
            <svg
              class="w-4 h-4 shrink-0"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                v-if="isExternalLink(cta.to)"
                d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3zM5 5h6V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-6h-2v6H5V5z"
              />
              <path
                v-else
                d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zM7 12h5v5H7z"
              />
            </svg>
            {{ cta.label }}
          </component>
        </div>
      </div>

      <div v-else class="max-w-4xl mx-auto px-6 md:px-8 text-center">
        <h1 class="font-display font-black uppercase text-rally-navy text-3xl md:text-5xl mb-4">
          Artykuł nie został znaleziony
        </h1>
        <RouterLink
          to="/aktualnosci"
          class="inline-flex items-center justify-center gap-2 bg-rally-navy text-white font-display font-bold uppercase text-sm tracking-wider px-7 py-4 hover:bg-rally-steel transition-colors"
        >
          Wróć do aktualności
        </RouterLink>
      </div>
    </main>
    <TheFooter />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { RouterLink, useRoute } from "vue-router";
import TheHeader from "../components/layout/TheHeader.vue";
import TheFooter from "../components/layout/TheFooter.vue";
import { getNewsArticleBySlug } from "../data/news.js";

const route = useRoute();
const article = computed(() => getNewsArticleBySlug(route.params.slug));

function isExternalLink(url) {
  return /^https?:\/\//.test(url);
}

function getCtaLinkProps(url) {
  if (isExternalLink(url)) {
    return {
      href: url,
      target: "_blank",
      rel: "noopener noreferrer",
    };
  }

  return { to: url };
}

function getCtaClass(theme) {
  return theme === "dark"
    ? "inline-flex items-center justify-center gap-2 bg-rally-navy text-white font-display font-bold uppercase text-sm tracking-wider px-7 py-4 hover:bg-rally-steel transition-colors"
    : "inline-flex items-center justify-center gap-2 bg-rally-orange text-rally-navy font-display font-bold uppercase text-sm tracking-wider px-7 py-4 hover:brightness-90 transition-all";
}
</script>