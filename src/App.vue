<template>
  <div class="app-wrapper">
    <SeoHead />
    <RouterView />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import SeoHead from './components/layout/SeoHead.vue'
import { trackVisit } from './services/visitCounter.js'

onMounted(() => {
  void trackVisit()
})
</script>
