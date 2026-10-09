<template>
  <div class="px-6 py-4">
    <!-- Social + wyniki -->
    <div class="mb-4 flex items-center gap-4 border-b border-rally-steel pb-4">
      <a
        :href="FACEBOOK_URL"
        target="_blank"
        rel="noopener noreferrer"
        class="text-white transition-colors hover:text-rally-orange"
        aria-label="Facebook"
      >
        <FacebookIcon class="h-5 w-5" />
      </a>
      <a
        :href="INSTAGRAM_URL"
        target="_blank"
        rel="noopener noreferrer"
        class="text-white transition-colors hover:text-rally-orange"
        aria-label="Instagram"
      >
        <InstagramIcon class="h-5 w-5" />
      </a>
      <a
        v-if="resultsUrl"
        :href="resultsUrl"
        class="ml-auto bg-rally-orange px-4 py-2 font-display text-xs font-bold uppercase tracking-wider text-rally-navy"
      >
        Wyniki online
      </a>
      <span
        v-else
        class="ml-auto border border-white/15 px-4 py-2 font-display text-xs font-bold uppercase tracking-wider text-rally-snow-dim"
      >
        Wyniki wkrótce
      </span>
    </div>

    <nav>
      <div class="mb-2">
        <p
          class="mb-1 font-display text-xs font-bold uppercase tracking-widest text-rally-orange"
        >
          Informacje
        </p>
        <RouterLink to="/o-rajdzie" :class="subItemClass" @click="$emit('close')">
          O rajdzie
        </RouterLink>
        <RouterLink to="/aktualnosci" :class="subItemClass" @click="$emit('close')">
          Aktualności
        </RouterLink>
      </div>

      <div
        v-for="tier in tiers"
        :key="tier.key"
        class="border-t border-rally-steel pt-2"
      >
        <RouterLink
          :to="`/${tier.slug}`"
          :class="groupItemClass"
          @click="$emit('close')"
        >
          {{ tier.navLabel }}
        </RouterLink>
        <RouterLink
          :to="`/${tier.slug}/tablica`"
          :class="subItemClass"
          @click="$emit('close')"
        >
          Elektroniczna Tablica Ogłoszeń
        </RouterLink>
        <RouterLink
          :to="`/${tier.slug}/dokumenty`"
          :class="subItemClass"
          @click="$emit('close')"
        >
          Dokumenty
        </RouterLink>
        <RouterLink
          :to="`/harmonogram?poziom=${tier.key}`"
          :class="subItemClass"
          @click="$emit('close')"
        >
          Harmonogram
        </RouterLink>
        <RouterLink
          :to="`/mapy?poziom=${tier.key}`"
          :class="subItemClass"
          @click="$emit('close')"
        >
          Odcinki specjalne
        </RouterLink>
        <RouterLink
          to="/lista-startowa"
          :class="subItemClass"
          @click="$emit('close')"
        >
          Lista startowa / Zapisy
        </RouterLink>
      </div>

      <div class="border-t border-rally-steel">
        <p
          class="mb-1 mt-2 font-display text-xs font-bold uppercase tracking-widest text-rally-orange"
        >
          Kibice
        </p>
        <RouterLink to="/kibice" :class="subItemClass" @click="$emit('close')">
          Strefa kibica
        </RouterLink>
        <RouterLink
          to="/kibice/mieszkancy"
          :class="subItemClass"
          @click="$emit('close')"
        >
          Mieszkańcy
        </RouterLink>
        <RouterLink
          to="/kibice/bezpiecznie"
          :class="subItemClass"
          @click="$emit('close')"
        >
          Kibicuj bezpiecznie
        </RouterLink>
      </div>

      <RouterLink to="/mapy" :class="topItemClass" @click="$emit('close')">
        Mapy i odcinki
      </RouterLink>
      <RouterLink to="/lokalizacje" :class="topItemClass" @click="$emit('close')">
        Lokalizacje
      </RouterLink>
      <RouterLink to="/partnerzy" :class="topItemClass" @click="$emit('close')">
        Partnerzy
      </RouterLink>
      <RouterLink to="/media" :class="topItemClass" @click="$emit('close')">
        Media
      </RouterLink>
      <RouterLink to="/kontakt" :class="topItemClass" @click="$emit('close')">
        Kontakt
      </RouterLink>
    </nav>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { FACEBOOK_URL, INSTAGRAM_URL } from "../../constants/socialLinks";
import { resultsUrl, tiers } from "../../data/eventConfig.js";
import FacebookIcon from "../ui/icons/FacebookIcon.vue";
import InstagramIcon from "../ui/icons/InstagramIcon.vue";

defineEmits(["close"]);

const subItemClass =
  "block py-2 px-3 font-display font-semibold uppercase text-sm text-white hover:text-rally-orange transition-colors";

const groupItemClass =
  "block py-2 font-display font-bold uppercase text-sm text-white hover:text-rally-orange transition-colors";

const topItemClass = `${groupItemClass} border-t border-rally-steel`;
</script>
