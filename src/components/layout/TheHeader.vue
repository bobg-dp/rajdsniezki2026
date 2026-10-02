<template>
  <header
    class="fixed inset-x-0 top-0 z-50 flex flex-col transition-[filter] duration-300"
    :class="scrolled ? 'shadow-lg' : 'shadow md:shadow-none'"
  >
    <!-- Górny pasek -->
    <div
      class="relative flex items-center justify-between bg-white px-4 transition-[height,min-height,padding] duration-300 md:px-8"
      :style="{ height: topBarHeight, minHeight: topBarHeight }"
    >
      <RouterLink
        to="/"
        class="group relative z-10 flex shrink-0 items-center"
        :aria-label="`${EVENT_NAME} – strona główna`"
      >
        <img
          src="/logo.png"
          :alt="EVENT_NAME"
          class="w-auto transition-[height,transform] duration-300 group-hover:scale-105"
          :class="isCompactHeader ? 'h-10 md:h-12' : 'h-14 md:h-20'"
        />
      </RouterLink>

      <div
        v-if="showCountdown"
        class="pointer-events-none absolute inset-x-0 top-1/2 hidden -translate-y-1/2 justify-center px-40 md:flex"
      >
        <RallyCountdownBanner layout="inline" variant="light" />
      </div>

      <div
        v-if="showCountdown"
        class="pointer-events-none absolute left-1/2 top-1/2 z-0 w-[calc(100%-8rem)] max-w-[13rem] -translate-x-1/2 -translate-y-1/2 md:hidden"
      >
        <RallyCountdownBanner layout="compact" variant="light" />
      </div>

      <!-- Desktop: social + wyniki -->
      <div class="relative z-10 hidden items-center gap-4 md:flex">
        <a
          :href="FACEBOOK_URL"
          target="_blank"
          rel="noopener noreferrer"
          class="text-rally-navy transition-colors duration-200 hover:text-rally-orange"
          aria-label="Facebook"
        >
          <FacebookIcon class="h-6 w-6" />
        </a>
        <a
          :href="INSTAGRAM_URL"
          target="_blank"
          rel="noopener noreferrer"
          class="text-rally-navy transition-colors duration-200 hover:text-rally-orange"
          aria-label="Instagram"
        >
          <InstagramIcon class="h-6 w-6" />
        </a>
        <a
          v-if="resultsUrl"
          :href="resultsUrl"
          class="ml-4 bg-rally-orange px-5 py-2.5 font-display text-sm font-bold uppercase tracking-wider text-rally-navy transition-colors duration-200 hover:bg-rally-orange-dark hover:text-white"
        >
          Wyniki online
        </a>
        <span
          v-else
          class="ml-4 border border-rally-navy/15 px-5 py-2.5 font-display text-sm font-bold uppercase tracking-wider text-rally-navy/45"
        >
          Wyniki wkrótce
        </span>
      </div>

      <!-- Mobile: hamburger -->
      <button
        class="relative z-10 flex flex-col items-center justify-center gap-1.5 p-2 md:hidden"
        @click="mobileMenuOpen = !mobileMenuOpen"
        :aria-expanded="mobileMenuOpen"
        aria-label="Menu"
      >
        <span
          class="block h-0.5 w-6 bg-rally-navy transition-all duration-300"
          :class="mobileMenuOpen ? 'translate-y-2 rotate-45' : ''"
        ></span>
        <span
          class="block h-0.5 w-6 bg-rally-navy transition-all duration-300"
          :class="mobileMenuOpen ? 'opacity-0' : ''"
        ></span>
        <span
          class="block h-0.5 w-6 bg-rally-navy transition-all duration-300"
          :class="mobileMenuOpen ? '-translate-y-2 -rotate-45' : ''"
        ></span>
      </button>

      <!-- Pomarańczowa krawędź paska – motyw wstęgi z logo. -->
      <span
        class="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-rally-orange via-rally-orange/30 to-transparent"
        aria-hidden="true"
      ></span>
    </div>

    <TheNav class="hidden md:block" />

    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="mobileMenuOpen"
        class="overflow-y-auto bg-rally-navy text-white md:hidden"
        :style="{ maxHeight: `calc(100vh - ${topBarHeight})` }"
      >
        <MobileMenu @close="mobileMenuOpen = false" />
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { computed, ref, watch, onMounted, onUnmounted } from "vue";
import { RouterLink, useRoute } from "vue-router";
import TheNav from "./TheNav.vue";
import MobileMenu from "./MobileMenu.vue";
import RallyCountdownBanner from "../ui/RallyCountdownBanner.vue";
import FacebookIcon from "../ui/icons/FacebookIcon.vue";
import InstagramIcon from "../ui/icons/InstagramIcon.vue";
import { FACEBOOK_URL, INSTAGRAM_URL } from "../../constants/socialLinks";
import { EVENT_NAME, resultsUrl, schedule } from "../../data/eventConfig.js";

const route = useRoute();
const scrolled = ref(false);
const isCompactHeader = ref(false);
const mobileMenuOpen = ref(false);
const isMobile = ref(false);
// Licznik w nagłówku pokazujemy dopiero, gdy termin rajdu jest potwierdzony –
// inaczej dublowałby komunikat „termin w przygotowaniu” z sekcji hero.
const showCountdown = computed(
  () => route.name === "home" && schedule.confirmed,
);

watch(mobileMenuOpen, (open) => {
  document.body.style.overflow = open ? "hidden" : "";
});

const topBarHeight = computed(() => {
  if (isMobile.value) {
    return isCompactHeader.value ? "60px" : "90px";
  }

  return isCompactHeader.value ? "60px" : "125px";
});

function handleScroll() {
  scrolled.value = window.scrollY > 10;
  isCompactHeader.value = window.scrollY > 500;
}

function handleResize() {
  isMobile.value = window.innerWidth < 768;
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("resize", handleResize, { passive: true });
  handleResize();
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("resize", handleResize);
  document.body.style.overflow = "";
});
</script>
