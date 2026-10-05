<template>
  <div>
    <TheHeader />
    <main class="min-h-screen pt-48 pb-20">
      <div class="max-w-4xl mx-auto px-6 md:px-8">
        <h1 class="text-rally-slant font-display font-black uppercase text-rally-navy text-4xl md:text-6xl mb-12">Kontakt</h1>
        <div class="max-w-xl">
          <div>
            <h2 class="font-display font-bold uppercase text-xl mb-6">Organizator</h2>
            <div class="flex items-center gap-6">
              <img
                :src="organizer.logoOnLight"
                alt=""
                aria-hidden="true"
                class="h-28 w-auto shrink-0"
              />
              <address class="not-italic space-y-2 text-rally-steel">
                <p class="font-semibold text-rally-navy">{{ organizer.name }}</p>
                <p>{{ location.city }}</p>
                <p>
                  <a
                    :href="`mailto:${CONTACT_EMAIL}`"
                    class="text-rally-orange-dark hover:underline"
                  >
                    {{ CONTACT_EMAIL }}
                  </a>
                </p>
              </address>
            </div>
          </div>
        </div>
      </div>
    </main>
    <TheFooter />
  </div>
</template>

<script setup>
import TheHeader from '../components/layout/TheHeader.vue'
import TheFooter from '../components/layout/TheFooter.vue'
import { CONTACT_EMAIL, location, organizer } from '../data/eventConfig.js'
</script>
