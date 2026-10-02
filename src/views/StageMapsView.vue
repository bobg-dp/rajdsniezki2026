<template>
  <div>
    <TheHeader />

    <main class="min-h-screen bg-rally-navy pt-32 md:pt-44">
      <StageCardsSection />
    </main>

    <TheFooter />
  </div>
</template>

<script setup>
import TheHeader from '../components/layout/TheHeader.vue'
import TheFooter from '../components/layout/TheFooter.vue'
import StageCardsSection from '../components/sections/StageCardsSection.vue'
</script>