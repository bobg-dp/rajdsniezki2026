<template>
  <div>
    <TheHeader />

    <main class="min-h-screen bg-white pb-20 pt-32 md:pt-48">
      <div class="mx-auto max-w-6xl px-6 md:px-8">
        <p
          class="mb-2 font-display text-sm font-bold uppercase tracking-[0.3em] text-rally-orange"
        >
          Kibice
        </p>
        <h1
          class="text-rally-slant mb-8 font-display text-4xl font-black uppercase text-rally-navy md:text-6xl"
        >
          Kibicuj bezpiecznie
        </h1>

        <div class="surface-asphalt mb-10 p-8 text-white shadow-xl md:p-12">
          <p class="mb-5 text-base leading-relaxed md:text-lg">
            Rajd to sport pełen emocji i nieprzewidywalnych sytuacji.
            Bezpieczeństwo zawodników, kibiców i służb zabezpieczenia zawsze
            pozostaje najważniejsze.
          </p>
          <p class="mb-8 text-base leading-relaxed md:text-lg">
            Podczas Rajdu Śnieżki oglądaj odcinki specjalne wyłącznie z
            wyznaczonych stref kibica i stosuj się do poleceń organizatora oraz
            służb porządkowych.
          </p>

          <div class="grid grid-cols-1 gap-8 lg:grid-cols-2 md:gap-10">
            <section>
              <h2
                class="mb-4 font-display text-2xl font-black uppercase text-rally-orange md:text-3xl"
              >
                Pamiętaj
              </h2>
              <ul class="space-y-3 text-sm leading-relaxed md:text-base">
                <li v-for="item in dos" :key="item" class="flex gap-3">
                  <span class="font-bold text-rally-orange" aria-hidden="true">✓</span>
                  <span>{{ item }}</span>
                </li>
              </ul>
            </section>

            <section>
              <h2
                class="mb-4 font-display text-2xl font-black uppercase text-white md:text-3xl"
              >
                Nigdy nie stawaj
              </h2>
              <ul
                class="space-y-3 text-sm leading-relaxed text-rally-snow-dim md:text-base"
              >
                <li v-for="item in donts" :key="item" class="flex gap-3">
                  <span class="font-bold text-red-400" aria-hidden="true">✕</span>
                  <span>{{ item }}</span>
                </li>
              </ul>
            </section>
          </div>

          <p
            class="mt-8 font-display text-sm font-bold uppercase tracking-wider text-rally-orange md:text-base"
          >
            Samochód rajdowy może opuścić drogę w każdej chwili.
          </p>
        </div>

        <section v-if="gallery.length">
          <div class="mb-6 flex items-end justify-between gap-4">
            <div>
              <p
                class="mb-1 font-display text-xs font-bold uppercase tracking-[0.25em] text-rally-orange"
              >
                Galeria
              </p>
              <h2
                class="font-display text-2xl font-black uppercase text-rally-navy md:text-4xl"
              >
                Grafiki dla kibiców
              </h2>
            </div>
            <p class="text-sm text-gray-500">Kliknij, aby powiększyć</p>
          </div>

          <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <button
              v-for="image in gallery"
              :key="image.src"
              type="button"
              class="group relative overflow-hidden bg-rally-navy text-left"
              @click="openModal(image)"
            >
              <img
                :src="image.src"
                :alt="image.alt"
                class="block h-auto w-full transition-transform duration-300 group-hover:scale-[1.01]"
              />
              <div
                class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent px-4 py-4"
              >
                <p
                  class="font-display text-xs font-bold uppercase tracking-[0.2em] text-white md:text-sm"
                >
                  {{ image.label }}
                </p>
              </div>
            </button>
          </div>
        </section>

        <PendingPanel
          v-else
          title="Grafiki informacyjne w przygotowaniu"
          description="Plakaty i grafiki dla kibiców zostaną opublikowane przed rajdem razem z mapami stref kibica. W międzyczasie sprawdź przebieg odcinków specjalnych."
          action-to="/mapy"
          action-label="Zobacz odcinki specjalne"
        />
      </div>
    </main>

    <TheFooter />

    <Teleport to="body">
      <div
        v-if="selectedImage"
        class="fixed inset-0 z-[140] flex items-center justify-center bg-black/90 p-4 md:p-8"
        @click.self="closeModal"
      >
        <button
          type="button"
          class="absolute right-4 top-4 rounded-full border border-white/20 bg-black/50 px-3 py-2 text-sm text-white backdrop-blur-sm hover:bg-black/70"
          @click="closeModal"
          aria-label="Zamknij podgląd"
        >
          Zamknij
        </button>
        <img
          :src="selectedImage.src"
          :alt="selectedImage.alt"
          class="max-h-full max-w-full object-contain shadow-2xl"
        />
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import TheHeader from "../components/layout/TheHeader.vue";
import TheFooter from "../components/layout/TheFooter.vue";
import PendingPanel from "../components/ui/PendingPanel.vue";

const dos = [
  "Wybieraj tylko oznaczone miejsca dla kibiców",
  "Stosuj się do poleceń sędziów i służb zabezpieczenia",
  "Zachowaj szczególną ostrożność przy trasie rajdu",
  "Dzieci trzymaj zawsze pod opieką",
  "Zwierzęta trzymaj pod pełną kontrolą",
];

const donts = [
  "Na zewnętrznej stronie zakrętów",
  "Na wyjściach z zakrętów",
  "Poniżej poziomu drogi",
  "W miejscach oznaczonych jako niebezpieczne",
  "Na trasie odcinka specjalnego",
];

// TODO: dopisz grafiki z `public/assets/docs/`, gdy organizator je przygotuje.
const gallery = [];

const selectedImage = ref(null);

function openModal(image) {
  selectedImage.value = image;
}

function closeModal() {
  selectedImage.value = null;
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
});
</script>
