<template>
  <a
    href="#aktualnosci"
    class="absolute bottom-20 md:bottom-10 left-1/2 -translate-x-1/2 z-31 group pointer-events-auto"
    aria-label="Przewiń do aktualności"
  >
    <div ref="arrowRef" class="relative">
      <div class="absolute inset-0 rounded-full bg-rally-navy/55 blur-md scale-110"></div>
      <div class="relative flex items-center gap-3 rounded-full border-2 border-rally-orange bg-rally-navy/80 px-3 py-2 shadow-[0_12px_30px_rgba(0,0,0,0.45)] transition-transform duration-300 ease-out group-hover:scale-105">
        <svg class="w-9 h-9 md:w-10 md:h-10 shrink-0 text-rally-orange drop-shadow-[0_0_12px_rgba(247,96,3,0.35)]" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 10V52" stroke="currentColor" stroke-width="4.5" stroke-linecap="round"/>
          <path d="M18 13C24 10 30 10 36 13C42 16 48 16 54 13V34C48 37 42 37 36 34C30 31 24 31 18 34V13Z" stroke="currentColor" stroke-width="4.5" stroke-linejoin="round"/>
          <path d="M24 16H30V22H24V16Z" fill="currentColor"/>
          <path d="M30 22H36V28H30V22Z" fill="currentColor"/>
          <path d="M36 16H42V22H36V16Z" fill="currentColor"/>
          <path d="M42 22H48V28H42V22Z" fill="currentColor"/>
          <path d="M24 28H30V34H24V28Z" fill="currentColor"/>
          <path d="M36 28H42V34H36V28Z" fill="currentColor"/>
        </svg>
        <span class="font-display font-bold uppercase tracking-[0.25em] text-white text-xs md:text-sm drop-shadow-sm whitespace-nowrap">
          News
        </span>
      </div>
    </div>
  </a>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

const arrowRef = ref(null)
let anim = null

onMounted(() => {
  anim = gsap.to(arrowRef.value, {
    y: 8,
    duration: 0.8,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
  })
})

onUnmounted(() => {
  anim?.kill()
})
</script>
