<template>
  <div>
    <TheHeader />

    <main class="min-h-screen bg-rally-navy pt-28 md:pt-40">
      <FilmsSection sync-query />
    </main>

    <TheFooter />
  </div>
</template>

<script setup>
import TheHeader from "../components/layout/TheHeader.vue";
import TheFooter from "../components/layout/TheFooter.vue";
import FilmsSection from "../components/sections/FilmsSection.vue";
</script>
