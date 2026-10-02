<template>
  <div>
    <TheHeader />
    <main class="min-h-screen pt-32 md:pt-48 pb-20">
      <div class="max-w-7xl mx-auto px-6 md:px-8">
        <p
          class="font-display font-bold uppercase tracking-[0.3em] text-rally-orange text-sm mb-2"
        >
          Rajd Śnieżki 2026
        </p>
        <h1
          class="font-display font-black uppercase text-rally-navy text-4xl md:text-6xl mb-12"
        >
          Lokalizacje
        </h1>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="loc in locations"
            :key="loc.name"
            class="flex flex-col bg-rally-navy text-white p-8"
          >
            <div class="flex-1">
              <div class="mb-4">
                <svg
                  class="w-10 h-10 text-rally-orange"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path :d="loc.iconPath" />
                </svg>
              </div>
              <p
                class="font-display font-bold uppercase text-xs tracking-widest text-rally-orange mb-2"
              >
                {{ loc.label }}
              </p>
              <h2
                class="font-display font-bold uppercase text-xl mb-4 leading-snug"
              >
                {{ loc.name }}
              </h2>
              <p
                class="text-gray-400 text-sm leading-relaxed whitespace-pre-line"
              >
                {{ loc.address }}
              </p>
            </div>
            <div class="mt-6">
              <a
                :href="loc.mapsUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 bg-rally-orange text-rally-navy font-display font-bold uppercase text-xs tracking-wider px-5 py-2.5 hover:brightness-90 transition-all"
              >
                <svg
                  class="w-4 h-4 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                  />
                </svg>
                Nawiguj
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
    <TheFooter />
  </div>
</template>

<script setup>
import TheHeader from "../components/layout/TheHeader.vue";
import TheFooter from "../components/layout/TheFooter.vue";

const locations = [
  {
    name: "Biuro Rajdu / Biuro Prasowe",
    label: "Administracja · Odbiór Administracyjny · BK 2",
    address: "ul. Nowowiejska 81\n58-500 Jelenia Góra",
    mapsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Nowowiejska+81%2C+Jelenia+G%C3%B3ra",
    // Building / office
    iconPath:
      "M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z",
  },
  {
    name: "Park Serwisowy / Końcowy Park Zamknięty",
    label: "Serwis · Strefa Tankowania",
    address: "Aleja Jana Pawła II 17\n58-500 Jelenia Góra",
    mapsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Aleja+Jana+Paw%C5%82a+II+17%2C+Jelenia+G%C3%B3ra",
    // Wrench / repair
    iconPath:
      "M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z",
  },
  {
    name: "Badanie Kontrolne",
    label: "BK 1 · Stacja Kontroli Pojazdów PZM",
    address: "ul. Wolności 57\n58-500 Jelenia Góra",
    mapsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Wolno%C5%9Bci+57%2C+Jelenia+G%C3%B3ra",
    // Clipboard / checklist
    iconPath:
      "M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z",
  },
  {
    name: "Ceremonia Startu i Mety",
    label: "Start · Meta · Rozdanie Nagród",
    address: "Plac Ratuszowy 2\n58-500 Jelenia Góra",
    mapsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Plac+Ratuszowy+2%2C+Jelenia+G%C3%B3ra",
    // Trophy
    iconPath:
      "M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z",
  },
  {
    name: "Dedykowana Stacja Paliw – ORLEN",
    label: "Paliwo",
    address: "ul. Wincentego Pola 4\n58-500 Jelenia Góra",
    mapsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Wincentego+Pola+4%2C+Jelenia+G%C3%B3ra",
    // Gas pump
    iconPath:
      "M19.77 7.23l.01-.01-3.72-3.72-1.06 1.06 2.11 2.11c-.94.36-1.61 1.26-1.61 2.33 0 1.38 1.12 2.5 2.5 2.5.36 0 .69-.08 1-.21v7.21c0 .55-.45 1-1 1s-1-.45-1-1V14c0-1.1-.9-2-2-2h-1V5c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v16h10v-7.5h1.5v5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V9c0-.69-.28-1.32-.73-1.77zM18 10c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zM8 18v-4.5H6V18H4V5h8v13H8z",
  },
  {
    name: "Park Zamknięty",
    label: "Parc Fermé · Meta Sekcji 1",
    address: "Podwale 25\n58-500 Jelenia Góra",
    mapsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Podwale+25%2C+Jelenia+G%C3%B3ra",
    // Lock / secure
    iconPath:
      "M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z",
  },
];
</script>
