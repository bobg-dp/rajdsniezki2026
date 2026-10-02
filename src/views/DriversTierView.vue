<template>
  <div>
    <TheHeader />

    <main class="min-h-screen pt-32 pb-20 md:pt-48">
      <div class="mx-auto max-w-7xl px-6 md:px-8">
        <TierPageHeader :tier="tier" show-tagline />

        <!-- Przełącznik poziomów – ta sama strefa dla RO, RS i KJS. -->
        <TierSwitcher :active-key="tier.key" class="mb-10" />

        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <component
            v-for="shortcut in shortcuts"
            :key="shortcut.key"
            :is="shortcut.disabled ? 'div' : RouterLink"
            v-bind="shortcut.disabled ? {} : { to: shortcut.to }"
            :class="[
              'group block p-8 transition-colors duration-200',
              shortcut.disabled
                ? 'cursor-not-allowed select-none bg-rally-navy/40'
                : shortcut.featured
                  ? 'bg-rally-orange text-rally-navy hover:bg-rally-orange-dark'
                  : 'bg-rally-navy text-white hover:bg-rally-steel',
            ]"
          >
            <h2
              :class="[
                'mb-2 font-display text-xl font-bold uppercase',
                shortcut.featured && !shortcut.disabled
                  ? ''
                  : 'text-white transition-colors group-hover:text-rally-orange',
              ]"
            >
              {{ shortcut.label }}
            </h2>
            <p
              :class="[
                'text-sm',
                shortcut.featured && !shortcut.disabled
                  ? 'text-rally-navy/75'
                  : 'text-rally-snow-dim/70',
              ]"
            >
              {{ shortcut.desc }}
            </p>
          </component>
        </div>
      </div>
    </main>

    <TheFooter />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { RouterLink } from "vue-router";
import TheHeader from "../components/layout/TheHeader.vue";
import TheFooter from "../components/layout/TheFooter.vue";
import TierPageHeader from "../components/layout/TierPageHeader.vue";
import TierSwitcher from "../components/ui/TierSwitcher.vue";
import { getTier } from "../data/eventConfig.js";
import { getTierShortcuts } from "../data/tierContent.js";

const props = defineProps({
  tierKey: { type: String, required: true },
});

const tier = computed(() => getTier(props.tierKey));
const shortcuts = computed(() => getTierShortcuts(tier.value));
</script>
