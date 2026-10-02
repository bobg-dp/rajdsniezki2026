<template>
  <div>
    <TheHeader />

    <main class="min-h-screen pt-32 pb-20 md:pt-48">
      <div class="mx-auto max-w-5xl px-6 md:px-8">
        <TierPageHeader :tier="tier" subtitle="Dokumenty" />

        <TierSwitcher :active-key="tier.key" class="mb-10" />

        <section v-if="documents.length" class="grid gap-6">
          <DocumentDownloadCard
            v-for="document in documents"
            :key="document.fileName"
            :title="document.title"
            :subtitle="document.subtitle"
            :document-url="document.documentUrl"
            :absolute-url="document.absoluteUrl"
          />
        </section>

        <PendingPanel
          v-else
          title="Dokumenty w przygotowaniu"
          :description="`Regulamin uzupełniający i pozostałe dokumenty ${tier.name} zostaną opublikowane po zatwierdzeniu przez organizatora. Komunikaty pojawią się równolegle na Elektronicznej Tablicy Ogłoszeń.`"
          :action-to="`/${tier.slug}/tablica`"
          action-label="Przejdź do tablicy ogłoszeń"
        />
      </div>
    </main>

    <TheFooter />
  </div>
</template>

<script setup>
import { computed } from "vue";
import TheHeader from "../components/layout/TheHeader.vue";
import TheFooter from "../components/layout/TheFooter.vue";
import TierPageHeader from "../components/layout/TierPageHeader.vue";
import TierSwitcher from "../components/ui/TierSwitcher.vue";
import DocumentDownloadCard from "../components/ui/DocumentDownloadCard.vue";
import PendingPanel from "../components/ui/PendingPanel.vue";
import { getTier } from "../data/eventConfig.js";
import { getTierDocuments } from "../data/tierContent.js";
import { SITE_URL } from "../seo/updateSeo.js";

const props = defineProps({
  tierKey: { type: String, required: true },
});

const tier = computed(() => getTier(props.tierKey));

const documents = computed(() =>
  getTierDocuments(props.tierKey).map((document) => {
    const documentUrl = `/assets/files/${encodeURIComponent(document.fileName)}`;

    return {
      ...document,
      documentUrl,
      absoluteUrl: new URL(documentUrl, SITE_URL).toString(),
    };
  }),
);
</script>
