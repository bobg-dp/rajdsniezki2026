<template>
  <div>
    <TheHeader />
    <main class="min-h-screen pt-48 pb-20 bg-white">
      <div class="max-w-6xl mx-auto px-6 md:px-8">
        <p class="font-display font-bold uppercase tracking-[0.3em] text-rally-orange text-sm mb-2">
          Kibice
        </p>
        <h1 class="font-display font-black uppercase text-rally-navy text-4xl md:text-6xl mb-6">
          Mieszkańcy
        </h1>
        <p class="text-rally-steel text-base md:text-lg leading-relaxed max-w-3xl mb-10">
          Informacje dla mieszkańców rejonów odcinków specjalnych Rajdu Śnieżki.
          Dla każdego odcinka publikujemy ulotkę z harmonogramem zamknięć dróg i
          najważniejszymi wskazówkami.
        </p>

        <PendingPanel
          v-if="!hasAnyFlyers"
          class="mb-12"
          title="Ulotki dla mieszkańców w przygotowaniu"
          description="Materiały z harmonogramem zamknięć dróg powstają po zatwierdzeniu harmonogramu rajdu i uzgodnieniach z gminami Piechowice i Stara Kamienica. Poniżej znajdziesz już przebieg odcinków, których dotyczą zamknięcia."
          action-to="/mapy"
          action-label="Zobacz przebieg odcinków"
        />

        <nav
          class="sticky top-[7.5rem] z-30 -mx-6 md:-mx-8 px-6 md:px-8 py-4 mb-10 bg-white/95 backdrop-blur border-y border-gray-100"
          aria-label="Nawigacja do odcinków specjalnych"
        >
          <p class="font-display font-bold uppercase tracking-[0.2em] text-xs text-gray-400 mb-3">
            Przejdź do odcinka
          </p>
          <div class="flex flex-wrap gap-3">
            <button
              v-for="section in localsSections"
              :key="section.id"
              type="button"
              class="font-display font-bold uppercase tracking-wider text-xs md:text-sm px-4 py-2.5 bg-rally-navy text-white hover:bg-rally-steel transition-colors"
              @click="scrollToSection(section.id)"
            >
              {{ section.code }} {{ section.name }}
            </button>
          </div>
        </nav>

        <div class="space-y-16 md:space-y-20">
          <section
            v-for="section in localsSections"
            :key="section.id"
            :id="section.id"
            class="scroll-mt-48"
          >
            <div class="mb-6">
              <p class="font-display font-bold uppercase tracking-[0.25em] text-rally-orange text-xs mb-1">
                {{ section.typeLabel }}
              </p>
              <h2 class="font-display font-black uppercase text-rally-navy text-2xl md:text-4xl">
                {{ section.code }} {{ section.name }}
              </h2>
              <p class="mt-2 text-sm text-gray-500">{{ section.dateLabel }}</p>
            </div>

            <div
              v-if="section.flyers.length"
              class="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6"
            >
              <button
                v-for="flyer in section.flyers"
                :key="flyer.src"
                type="button"
                class="group relative overflow-hidden bg-rally-navy text-left border border-gray-200 hover:border-rally-orange transition-colors"
                @click="openModal(flyer)"
              >
                <img
                  :src="flyer.src"
                  :alt="flyer.alt"
                  class="block w-full h-auto max-h-72 object-contain bg-white transition-transform duration-300 group-hover:scale-[1.01]"
                  loading="lazy"
                />
                <div
                  class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent px-4 py-4"
                >
                  <p class="font-display font-bold uppercase tracking-[0.2em] text-white text-xs md:text-sm">
                    {{ flyer.label }}
                  </p>
                  <p class="mt-1 text-[11px] uppercase tracking-wider text-white/70">
                    Kliknij, aby powiększyć
                  </p>
                </div>
              </button>
            </div>

            <p
              v-else
              class="border border-dashed border-rally-navy/15 bg-rally-snow/40 px-6 py-8 text-sm leading-6 text-rally-steel"
            >
              Ulotka dla tego odcinka nie została jeszcze opublikowana.
              <RouterLink
                :to="`/oesy/${section.id}`"
                class="font-semibold text-rally-orange-dark hover:underline"
              >
                Sprawdź przebieg trasy
              </RouterLink>
              , aby zobaczyć, których dróg dotyczą zamknięcia.
            </p>
          </section>
        </div>
      </div>
    </main>
    <TheFooter />

    <Teleport to="body">
      <div
        v-if="selectedImage"
        class="fixed inset-0 z-[140] flex items-center justify-center bg-black/92 p-[5vh] md:p-[5vw]"
        @click.self="closeModal"
      >
        <button
          type="button"
          class="absolute top-4 right-4 rounded-full border border-white/20 bg-black/50 px-4 py-2 text-white text-sm backdrop-blur-sm hover:bg-black/70"
          @click="closeModal"
          aria-label="Zamknij podgląd"
        >
          Zamknij
        </button>
        <img
          :src="selectedImage.src"
          :alt="selectedImage.alt"
          class="w-[90vw] h-[90vh] object-contain shadow-2xl"
        />
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { RouterLink } from "vue-router";
import TheHeader from "../components/layout/TheHeader.vue";
import TheFooter from "../components/layout/TheFooter.vue";
import PendingPanel from "../components/ui/PendingPanel.vue";
import { hasAnyFlyers, localsSections } from "../data/localsFlyers.js";

const selectedImage = ref(null);

function openModal(image) {
  selectedImage.value = image;
  document.body.style.overflow = "hidden";
}

function closeModal() {
  selectedImage.value = null;
  document.body.style.overflow = "";
}

function scrollToSection(sectionId) {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function handleKeydown(event) {
  if (event.key === "Escape") {
    closeModal();
  }
}

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
  document.body.style.overflow = "";
});
</script>
