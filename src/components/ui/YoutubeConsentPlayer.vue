<template>
  <article class="flex h-full flex-col border border-white/10 bg-white/[0.04]">
    <div class="aspect-video bg-black">
      <div
        v-if="!isConsentGranted"
        class="flex h-full flex-col justify-between bg-[radial-gradient(circle_at_top,rgba(247,96,3,0.18),transparent_45%),linear-gradient(145deg,#181818,#050505)] p-5 text-white"
      >
        <div>
          <p
            class="font-display text-xs font-bold uppercase tracking-[0.26em] text-rally-orange"
          >
            YouTube
          </p>
          <h3 class="mt-3 font-display text-xl font-black uppercase leading-none">
            {{ title }}
          </h3>
          <p v-if="subtitle" class="mt-2 text-sm text-rally-snow-dim">
            {{ subtitle }}
          </p>
        </div>
        <button
          type="button"
          class="mt-5 inline-flex w-fit items-center justify-center bg-rally-orange px-4 py-2.5 font-display text-xs font-bold uppercase tracking-[0.16em] text-rally-navy transition-colors hover:bg-rally-orange-dark"
          @click="isConsentGranted = true"
        >
          Wyrażam zgodę i odtwarzam
        </button>
      </div>
      <iframe
        v-else
        class="h-full w-full"
        :src="`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`"
        :title="title"
        loading="lazy"
        referrerpolicy="strict-origin-when-cross-origin"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    </div>
  </article>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  videoId: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, default: "" },
});

const isConsentGranted = ref(false);
</script>
