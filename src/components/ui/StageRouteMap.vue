<template>
  <div class="relative z-0">
    <div
      ref="mapElement"
      class="h-[24rem] w-full overflow-hidden rounded-[1.5rem] bg-rally-navy-ink md:h-[30rem]"
      :aria-label="`Mapa trasy ${stage.headline}`"
    ></div>

    <div class="absolute right-4 top-4 z-[500] flex flex-col items-end gap-2">
      <button
        type="button"
        class="rounded-full border border-white/15 bg-black/65 px-3 py-2 font-display text-[11px] font-bold uppercase tracking-[0.24em] text-white backdrop-blur-sm transition-all hover:border-rally-orange/50 hover:text-rally-orange"
        @click="openModal"
        :aria-label="`Powiększ mapę trasy ${stage.headline}`"
      >
        Powiększ mapę
      </button>
    </div>
  </div>

  <Teleport to="body">
    <Transition name="map-lightbox" @after-leave="handleAfterLeave">
      <div
        v-if="isExpanded"
        class="fixed inset-0 z-[1500] flex items-center justify-center bg-black/88 p-4 md:p-8"
        @click.self="closeModal"
      >
        <button
          type="button"
          class="absolute top-4 right-4 rounded-full border border-white/20 bg-black/55 px-3 py-2 text-white text-sm backdrop-blur-sm transition-all hover:bg-black/75"
          @click="closeModal"
          aria-label="Zamknij powiększoną mapę"
        >
          Zamknij
        </button>

        <div
          class="map-lightbox-panel h-[80vh] w-[80vw] max-w-[1400px] rounded-[2rem] border border-white/10 bg-rally-navy-ink p-3 shadow-2xl"
        >
          <div
            ref="modalMapElement"
            class="h-full w-full overflow-hidden rounded-[1.5rem]"
            :aria-label="`Powiększona mapa trasy ${stage.headline}`"
          ></div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import "leaflet/dist/leaflet.css";

const props = defineProps({
  stage: {
    type: Object,
    required: true,
  },
});

const mapElement = ref(null);
const modalMapElement = ref(null);
const isExpanded = ref(false);

let leafletLibrary = null;
let mapInstance = null;
let modalMapInstance = null;
let modalResizeTimeout = null;

function openModal() {
  isExpanded.value = true;
}

function closeModal() {
  isExpanded.value = false;
}

function handleAfterLeave() {
  modalMapInstance = destroyMap(modalMapInstance);
}

function handleKeydown(event) {
  if (event.key === "Escape") {
    closeModal();
  }
}

function getStageGeometry() {
  return {
    linePoints: props.stage.shapePoints.map(([longitude, latitude]) => [
      latitude,
      longitude,
    ]),
    startPoint: [props.stage.start[1], props.stage.start[0]],
    finishPoint: [props.stage.finish[1], props.stage.finish[0]],
  };
}

async function getLeafletLibrary() {
  if (leafletLibrary) return leafletLibrary;

  const leafletModule = await import("leaflet");
  leafletLibrary = leafletModule.default ?? leafletModule;
  return leafletLibrary;
}

async function createMap(element, options = {}) {
  if (!element) return null;

  const L = await getLeafletLibrary();
  const { linePoints, startPoint, finishPoint } = getStageGeometry();

  const createPointIcon = ({ icon, label, variant }) =>
    L.divIcon({
      className: "stage-point-marker-wrapper",
      html: `
        <div class="stage-point-marker stage-point-marker--${variant}">
          <span class="stage-point-marker__icon" aria-hidden="true">${icon}</span>
        </div>
      `,
      iconSize: [70, 30],
      iconAnchor: [variant === "start" ? 30 : 10, variant === "start" ? 10 : 10],
      tooltipAnchor: [44, -18],
    });

  const instance = L.map(element, {
    zoomControl: true,
    scrollWheelZoom: options.scrollWheelZoom ?? false,
  });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(instance);

  L.polyline(linePoints, {
    color: "#0E2133",
    weight: 10,
    opacity: 0.45,
    lineCap: "round",
    lineJoin: "round",
  }).addTo(instance);

  L.polyline(linePoints, {
    color: "#F76003",
    weight: 6,
    opacity: 0.95,
    lineCap: "round",
    lineJoin: "round",
  }).addTo(instance);

  L.marker(startPoint, {
    icon: createPointIcon({
      icon: "▶",
      label: "START",
      variant: "start",
    }),
  })
    .addTo(instance)
    .bindTooltip("Start");

  L.marker(finishPoint, {
    icon: createPointIcon({
      icon: "🏁",
      label: "META",
      variant: "finish",
    }),
  })
    .addTo(instance)
    .bindTooltip("Meta");

  const bounds = L.latLngBounds(linePoints);
  bounds.extend(startPoint);
  bounds.extend(finishPoint);

  instance.fitBounds(bounds, {
    padding: [28, 28],
  });

  return instance;
}

function destroyMap(instance) {
  if (!instance) return null;
  instance.remove();
  return null;
}

onMounted(async () => {
  window.addEventListener("keydown", handleKeydown);
  mapInstance = await createMap(mapElement.value, {
    scrollWheelZoom: false,
  });
});

watch(isExpanded, async (expanded) => {
  if (expanded) {
    await nextTick();
    modalMapInstance = destroyMap(modalMapInstance);
    modalMapInstance = await createMap(modalMapElement.value, {
      scrollWheelZoom: true,
    });

    if (modalResizeTimeout) {
      window.clearTimeout(modalResizeTimeout);
    }

    window.requestAnimationFrame(() => {
      modalMapInstance?.invalidateSize();
    });

    modalResizeTimeout = window.setTimeout(() => {
      modalMapInstance?.invalidateSize();
      modalResizeTimeout = null;
    }, 240);

    return;
  }

  if (modalResizeTimeout) {
    window.clearTimeout(modalResizeTimeout);
    modalResizeTimeout = null;
  }
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeydown);
  if (modalResizeTimeout) {
    window.clearTimeout(modalResizeTimeout);
    modalResizeTimeout = null;
  }
  mapInstance = destroyMap(mapInstance);
  modalMapInstance = destroyMap(modalMapInstance);
});
</script>

<style scoped>
.map-lightbox-enter-active,
.map-lightbox-leave-active {
  transition: opacity 220ms ease;
}

.map-lightbox-enter-from,
.map-lightbox-leave-to {
  opacity: 0;
}

.map-lightbox-enter-active .map-lightbox-panel,
.map-lightbox-leave-active .map-lightbox-panel {
  transition:
    transform 240ms cubic-bezier(0.22, 1, 0.36, 1),
    opacity 240ms ease;
}

.map-lightbox-enter-from .map-lightbox-panel,
.map-lightbox-leave-to .map-lightbox-panel {
  opacity: 0;
  transform: scale(0.96) translateY(12px);
}

:deep(.leaflet-container) {
  z-index: 0;
  font-family: inherit;
}

:deep(.leaflet-control-attribution) {
  background: rgba(17, 17, 17, 0.72);
  color: rgba(255, 255, 255, 0.82);
}

:deep(.leaflet-control-attribution a) {
  color: #F76003;
}

:deep(.leaflet-tooltip) {
  border: 0;
  border-radius: 9999px;
  background: rgba(17, 17, 17, 0.9);
  color: #ffffff;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.22);
  font-family: var(--font-family-display);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.18em;
  padding: 8px 12px;
  text-transform: uppercase;
}

:deep(.leaflet-tooltip::before) {
  display: none;
}

:deep(.stage-point-marker-wrapper) {
  background: transparent;
  border: 0;
}

:deep(.stage-point-marker) {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  border-radius: 9px;
  border: 2px solid #0E2133;
  background: #ffffff;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.28);
  padding: 5px 5px;
  font-family: var(--font-family-display);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.18em;
  line-height: 1;
}

:deep(.stage-point-marker__icon) {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 9999px;
  font-size: 11px;
  line-height: 1;
}

:deep(.stage-point-marker__label) {
  transform: translateY(1px);
}

:deep(.stage-point-marker--start) {
  background: #F76003;
  color: #121212;
}

:deep(.stage-point-marker--start .stage-point-marker__icon) {
  background: rgba(0, 0, 0, 0.14);
}

:deep(.stage-point-marker--finish) {
  background: #ffffff;
  color: #121212;
}

:deep(.stage-point-marker--finish .stage-point-marker__icon) {
  background: rgba(0, 0, 0, 0.08);
}
</style>
