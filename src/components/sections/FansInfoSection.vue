<template>
  <section id="kibice" class="bg-rally-navy-ink py-16 md:py-20">
    <div class="mx-auto max-w-7xl px-6 md:px-8">
      <!-- Grafika organizatora, jeśli już jest gotowa. -->
      <button
        v-if="graphic"
        type="button"
        class="group relative block w-full overflow-hidden text-left"
        @click="isOpen = true"
        aria-label="Powiększ grafikę dla kibiców"
      >
        <img
          :src="graphic"
          alt="Informacje dla kibiców"
          class="block h-auto w-full transition-transform duration-300 ease-out group-hover:scale-[1.01]"
        />
        <div
          class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent px-4 py-4 md:px-6 md:py-5"
        >
          <p
            class="font-display text-[11px] font-bold uppercase tracking-[0.25em] text-rally-orange md:text-xs"
          >
            Dla kibiców
          </p>
          <p
            class="mt-1 font-display text-lg font-black uppercase leading-none text-white md:text-2xl"
          >
            Kliknij, aby powiększyć
          </p>
        </div>
      </button>

      <!-- Wersja tekstowa: działa od pierwszego dnia, bez czekania na grafikę. -->
      <div v-else class="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14">
        <div>
          <p
            class="font-display text-sm font-bold uppercase tracking-[0.3em] text-rally-orange"
          >
            Dla kibiców
          </p>
          <h2
            class="text-rally-slant mt-2 font-display text-4xl font-black uppercase leading-none text-white md:text-6xl"
          >
            Kibicuj bezpiecznie
          </h2>
          <p class="mt-5 text-base leading-7 text-rally-snow-dim">
            Odcinki specjalne są rozgrywane na zamkniętych drogach publicznych.
            Samochody rajdowe jadą z pełną prędkością, a każdy metr poza
            wyznaczoną strefą to realne zagrożenie — dla Ciebie i dla załóg.
          </p>

          <div class="mt-8 flex flex-wrap gap-3">
            <RouterLink
              to="/kibice/bezpiecznie"
              class="inline-flex items-center gap-2 bg-rally-orange px-6 py-3 font-display text-sm font-bold uppercase tracking-wider text-rally-navy transition-colors duration-200 hover:bg-rally-orange-dark hover:text-white"
            >
              Zasady bezpieczeństwa
            </RouterLink>
            <RouterLink
              to="/kibice/mieszkancy"
              class="inline-flex items-center gap-2 border border-white/20 px-6 py-3 font-display text-sm font-bold uppercase tracking-wider text-white transition-colors duration-200 hover:border-rally-orange hover:text-rally-orange"
            >
              Jestem mieszkańcem
            </RouterLink>
          </div>
        </div>

        <ul class="grid gap-4">
          <li
            v-for="rule in rules"
            :key="rule.title"
            class="group relative overflow-hidden border border-white/10 bg-white/[0.04] p-6 transition-colors duration-300 hover:border-rally-orange/40"
          >
            <span
              class="pointer-events-none absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-rally-orange transition-transform duration-300 group-hover:scale-y-100"
              aria-hidden="true"
            ></span>
            <h3
              class="font-display text-lg font-bold uppercase tracking-wide text-white"
            >
              {{ rule.title }}
            </h3>
            <p class="mt-2 text-sm leading-6 text-rally-snow-dim">
              {{ rule.desc }}
            </p>
          </li>
        </ul>
      </div>
    </div>

    <Teleport to="body">
      <div
        v-if="isOpen && graphic"
        class="fixed inset-0 z-[120] flex items-center justify-center bg-black/88 p-4 md:p-8"
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
          :src="graphic"
          alt="Informacje dla kibiców"
          class="max-h-full max-w-full object-contain shadow-2xl"
        />
      </div>
    </Teleport>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { RouterLink } from "vue-router";

defineProps({
  // Podaj ścieżkę do grafiki informacyjnej, gdy organizator ją przygotuje.
  graphic: { type: String, default: null },
});

const rules = [
  {
    title: "Stój tylko w strefach kibica",
    desc: "Strefy są oznaczone i zabezpieczone przez obsługę. Poza nimi przebywanie na odcinku jest zabronione.",
  },
  {
    title: "Nigdy nie stawaj na zewnątrz zakrętu",
    desc: "To kierunek, w którym jedzie samochód po utracie przyczepności. Wybieraj miejsca wyżej od drogi i za przeszkodą naturalną.",
  },
  {
    title: "Słuchaj obsługi odcinka",
    desc: "Sędziowie i porządkowi odpowiadają za Twoje bezpieczeństwo. Ich polecenia są obowiązkowe i nie podlegają dyskusji.",
  },
  {
    title: "Przyjedź z zapasem czasu",
    desc: "Drogi dojazdowe zamykane są na długo przed startem pierwszej załogi. Po zamknięciu odcinka nie ma możliwości wjazdu.",
  },
];

const isOpen = ref(false);

function closeModal() {
  isOpen.value = false;
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
