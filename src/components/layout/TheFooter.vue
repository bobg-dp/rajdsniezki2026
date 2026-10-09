<template>
  <footer class="surface-asphalt py-12 text-white">
    <div class="mx-auto max-w-7xl px-6 md:px-8">
      <div class="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
        <!-- Logo + info -->
        <div>
          <!-- Logo jest ciemne, więc na asfalcie stoi na jasnej płytce. -->
          <div class="mb-4 inline-flex bg-white/92 px-4 py-3">
            <img :src="'/logo.png'" :alt="EVENT_NAME" class="h-14 w-auto" />
          </div>
          <p class="text-sm leading-relaxed text-rally-snow-dim">
            {{ EVENT_FULL_NAME }}<br />
            {{ dateLabel }} | {{ location.city }}
          </p>
        </div>

        <!-- Nawigacja -->
        <div>
          <h3
            class="mb-4 font-display text-sm font-bold uppercase tracking-wider text-rally-orange"
          >
            Nawigacja
          </h3>
          <ul class="space-y-2">
            <li v-for="link in navLinks" :key="link.to">
              <RouterLink
                :to="link.to"
                class="text-sm text-rally-snow-dim transition-colors hover:text-white"
              >
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Kontakt -->
        <div>
          <h3
            class="mb-4 font-display text-sm font-bold uppercase tracking-wider text-rally-orange"
          >
            Kontakt
          </h3>
          <img
            :src="organizer.logoOnDark"
            alt=""
            aria-hidden="true"
            class="mb-4 h-20 w-auto"
            loading="lazy"
          />
          <address class="space-y-1 text-sm not-italic text-rally-snow-dim">
            <p>{{ organizer.name }}</p>
            <p>{{ location.city }}</p>
            <p>
              <a
                :href="`mailto:${CONTACT_EMAIL}`"
                class="transition-colors hover:text-white"
              >
                {{ CONTACT_EMAIL }}
              </a>
            </p>
          </address>
        </div>
      </div>

      <div
        class="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 md:flex-row"
      >
        <div
          class="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-rally-snow-dim/70"
        >
          <p>© {{ EVENT_EDITION }} {{ EVENT_NAME }}. Wszelkie prawa zastrzeżone.</p>
          <RouterLink
            to="/polityka-prywatnosci"
            class="transition-colors hover:text-white"
          >
            Polityka prywatności
          </RouterLink>
        </div>

        <div
          v-if="visitCountLabel"
          class="rounded-full border border-white/12 px-4 py-2 text-xs text-rally-snow-dim"
        >
          Licznik odwiedzin:
          <span class="font-semibold text-white">{{ visitCountLabel }}</span>
        </div>

        <a
          href="https://driftingpixel.com"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2 text-xs text-rally-snow-dim/70 transition-colors hover:text-white"
        >
          <span>Projekt i realizacja:</span>
          <img
            src="/assets/brand/drifting-pixel.webp"
            alt=""
            class="h-8 w-auto"
          />
          <span class="font-semibold">DriftingPixel.com</span>
        </a>

        <div class="flex items-center gap-4">
          <a
            :href="FACEBOOK_URL"
            target="_blank"
            rel="noopener noreferrer"
            class="text-rally-snow-dim/70 transition-colors hover:text-rally-orange"
            aria-label="Facebook"
          >
            <FacebookIcon class="h-5 w-5" />
          </a>
          <a
            :href="INSTAGRAM_URL"
            target="_blank"
            rel="noopener noreferrer"
            class="text-rally-snow-dim/70 transition-colors hover:text-rally-orange"
            aria-label="Instagram"
          >
            <InstagramIcon class="h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from "vue";
import { RouterLink } from "vue-router";
import { FACEBOOK_URL, INSTAGRAM_URL } from "../../constants/socialLinks";
import { visitCounterState } from "../../services/visitCounter.js";
import FacebookIcon from "../ui/icons/FacebookIcon.vue";
import InstagramIcon from "../ui/icons/InstagramIcon.vue";
import {
  CONTACT_EMAIL,
  EVENT_EDITION,
  EVENT_FULL_NAME,
  EVENT_NAME,
  location,
  organizer,
  schedule,
  tiers,
} from "../../data/eventConfig.js";

const dateLabel = computed(() =>
  schedule.confirmed ? schedule.dateLabel : schedule.pendingLabel,
);

const navLinks = [
  { to: "/o-rajdzie", label: "O rajdzie" },
  { to: "/aktualnosci", label: "Aktualności" },
  ...tiers.map((tier) => ({ to: `/${tier.slug}`, label: tier.navLabel })),
  { to: "/mapy", label: "Mapy i odcinki" },
  { to: "/filmy", label: "Filmy" },
  { to: "/partnerzy", label: "Partnerzy" },
  { to: "/kontakt", label: "Kontakt" },
];

const visitCountLabel = computed(() => {
  if (visitCounterState.totalVisits === null) {
    return null;
  }

  return new Intl.NumberFormat("pl-PL").format(visitCounterState.totalVisits);
});
</script>
