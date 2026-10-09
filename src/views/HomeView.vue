<template>
  <div>
    <TheHeader />

    <main>
      <HeroSection />

      <!-- Hero -> Aktualności -->
      <SpeedDivider from-color="#081522" to-color="#f76003" direction="right" />

      <NewsSection />

      <!-- Aktualności -> Skróty -->
      <SpeedDivider
        from-color="#f76003"
        to-color="#18364e"
        accent-color="#081522"
        direction="left"
      />

      <ShortcutsSection />

      <!-- Skróty -> Poziomy imprezy -->
      <SpeedDivider from-color="#0e2133" to-color="#ffffff" direction="right" />

      <TiersSection />
      <DirectorMessageSection />

      <!-- Słowo dyrektora -> Odcinki specjalne -->
      <SpeedDivider from-color="#ffffff" to-color="#0e2133" direction="left" />

      <StageCardsSection />
      <FilmsSection />
      <FansInfoSection />

      <!-- Kibice -> Partnerzy -->
      <SpeedDivider from-color="#081522" to-color="#ffffff" direction="right" />

      <PartnersSection />
      <OrganizersSection />
    </main>

    <TheFooter />
  </div>
</template>

<script setup>
import TheHeader from "../components/layout/TheHeader.vue";
import TheFooter from "../components/layout/TheFooter.vue";
import SpeedDivider from "../components/ui/SpeedDivider.vue";
import HeroSection from "../components/sections/HeroSection.vue";
import DirectorMessageSection from "../components/sections/DirectorMessageSection.vue";
import FansInfoSection from "../components/sections/FansInfoSection.vue";
import NewsSection from "../components/sections/NewsSection.vue";
import ShortcutsSection from "../components/sections/ShortcutsSection.vue";
import TiersSection from "../components/sections/TiersSection.vue";
import StageCardsSection from "../components/sections/StageCardsSection.vue";
import FilmsSection from "../components/sections/FilmsSection.vue";
import PartnersSection from "../components/sections/PartnersSection.vue";
import OrganizersSection from "../components/sections/OrganizersSection.vue";
</script>
