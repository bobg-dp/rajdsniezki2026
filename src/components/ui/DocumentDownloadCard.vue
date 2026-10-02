<template>
  <article class="border border-gray-200 bg-gray-50 p-6 md:p-8">
    <div class="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <div class="max-w-2xl">
        <h2
          class="font-display font-bold uppercase text-rally-navy text-xl md:text-2xl mb-3"
        >
          {{ title }}
        </h2>
        <p v-if="subtitle" class="text-rally-steel mb-6">{{ subtitle }}</p>
        <a
          :href="documentUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center justify-center bg-rally-navy text-white font-display font-bold uppercase text-sm tracking-wider px-6 py-3 hover:bg-rally-steel transition-colors"
        >
          Otwórz PDF
        </a>
      </div>

      <button
        type="button"
        class="inline-flex w-fit flex-col items-center gap-3 self-start rounded-sm border border-gray-200 bg-white p-4 text-center shadow-sm transition-transform hover:scale-[1.02]"
        :aria-label="`Powiększ kod QR dla ${title}`"
        @click="openModal"
      >
        <img
          v-if="qrCodeDataUrl"
          :src="qrCodeDataUrl"
          :alt="`Kod QR do ${title}`"
          class="h-[7.8rem] w-[7.8rem] md:h-[9.1rem] md:w-[9.1rem]"
          loading="lazy"
        />
        <div
          v-else
          class="h-[7.8rem] w-[7.8rem] md:h-[9.1rem] md:w-[9.1rem] bg-gray-100 animate-pulse"
        />
        <div>
          <p
            class="font-display font-bold uppercase tracking-[0.2em] text-rally-navy text-[11px] md:text-xs"
          >
            Kod QR
          </p>
          <p class="text-xs text-rally-steel mt-1">Kliknij, aby powiększyć</p>
        </div>
      </button>
    </div>

    <Teleport to="body">
      <div
        v-if="isModalOpen"
        class="fixed inset-0 z-[140] flex items-center justify-center bg-black/90 p-4 md:p-8"
        @click.self="closeModal"
      >
        <div class="relative w-full max-w-md rounded-sm bg-white p-5 md:p-7 shadow-2xl">
          <button
            type="button"
            class="absolute right-4 top-4 rounded-full border border-black/10 bg-white px-3 py-2 text-sm text-rally-navy hover:bg-gray-100"
            aria-label="Zamknij podgląd kodu QR"
            @click="closeModal"
          >
            Zamknij
          </button>

          <div class="flex flex-col items-center gap-5 pt-8">
            <img
              v-if="qrCodeDataUrl"
              :src="qrCodeDataUrl"
              :alt="`Kod QR do ${title}`"
              class="w-full max-w-[26rem]"
            />
            <div
              v-else
              class="flex h-[26rem] w-full max-w-[26rem] items-center justify-center bg-gray-100 text-sm text-rally-steel"
            >
              Nie udało się wygenerować kodu QR.
            </div>

            <div class="text-center">
              <p class="font-display font-bold uppercase text-rally-navy text-xl">
                {{ title }}
              </p>
              <p v-if="subtitle" class="text-rally-steel mt-2">{{ subtitle }}</p>
            </div>

            <a
              :href="documentUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center bg-rally-navy text-white font-display font-bold uppercase text-sm tracking-wider px-6 py-3 hover:bg-rally-steel transition-colors"
            >
              Otwórz PDF
            </a>
          </div>
        </div>
      </div>
    </Teleport>
  </article>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import QRCode from "qrcode";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: "",
  },
  documentUrl: {
    type: String,
    required: true,
  },
  absoluteUrl: {
    type: String,
    required: true,
  },
});

const isModalOpen = ref(false);
const qrCodeDataUrl = ref("");

function openModal() {
  isModalOpen.value = true;
}

function closeModal() {
  isModalOpen.value = false;
}

function handleKeydown(event) {
  if (event.key === "Escape") {
    closeModal();
  }
}

async function generateQrCode() {
  try {
    qrCodeDataUrl.value = await QRCode.toDataURL(props.absoluteUrl, {
      width: 512,
      margin: 1,
      color: {
        dark: "#111111",
        light: "#FFFFFFFF",
      },
    });
  } catch {
    qrCodeDataUrl.value = "";
  }
}

onMounted(() => {
  void generateQrCode();
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});
</script>