/**
 * Treści specyficzne dla poziomów imprezy.
 *
 * Dokumenty RO, RS i KJS leżą w `public/assets/files`.
 * Harmonogramy trzech poziomów imprezy są w `itineraries.js`.
 */
import { getItinerary } from "./itineraries.js";

const documents = {
  ro: [
    {
      title: "Regulamin Uzupełniający",
      subtitle: "Rajd Śnieżki 2026 — RO",
      fileName: "regulamin-uzupelniajacy-ro.pdf",
    },
    {
      title: "Regulamin RSMDŚ 2026",
      subtitle: "Rajdowe Samochodowe Mistrzostwa Dolnego Śląska",
      fileName: "regulamin-rsmds-2026.pdf",
    },
  ],
  rs: [
    {
      title: "Regulamin Uzupełniający",
      subtitle: "Rajd Śnieżki 2026 — RS",
      fileName: "regulamin-uzupelniajacy-rs.pdf",
    },
    {
      title: "Regulamin RPP 2026",
      subtitle: "Rajdowy Puchar Południa",
      fileName: "regulamin-rpp-2026.pdf",
    },
  ],
  kjs: [
    {
      title: "Regulamin Uzupełniający",
      subtitle: "Rajd Śnieżki 2026 — KJS",
      fileName: "regulamin-uzupelniajacy-kjs.pdf",
    },
    {
      title: "Regulamin AIS 2026",
      subtitle: "Amatorskie Imprezy Samochodowe",
      fileName: "regulamin-ais-2026.pdf",
    },
  ],
};

/**
 * Kafelki strefy zawodnika. `to` może być ścieżką poziomu (`:base`)
 * podmienianą na konkretny slug przy renderowaniu.
 */
const tierShortcuts = [
  {
    key: "notice-board",
    label: "Elektroniczna Tablica Ogłoszeń",
    desc: "Komunikaty, publikacje i dokumenty pobierane na żywo z tablicy ogłoszeń",
    to: ":base/tablica",
    featured: true,
  },
  {
    key: "schedule",
    label: "Harmonogram",
    desc: "Szczegółowy plan wydarzeń i terminarz rajdu",
    to: "/harmonogram?poziom=:tier",
  },
  {
    key: "documents",
    label: "Dokumenty",
    desc: "Regulamin uzupełniający i pozostałe dokumenty rajdu",
    to: ":base/dokumenty",
  },
  {
    key: "stages",
    label: "Mapy i odcinki",
    desc: "Przebieg odcinków specjalnych i najważniejsze informacje o OS-ach",
    to: "/mapy?poziom=:tier",
  },
  {
    key: "locations",
    label: "Lokalizacje",
    desc: "Mapa i nawigacja do wszystkich lokalizacji rajdu",
    to: "/lokalizacje",
  },
  {
    key: "entry-list",
    label: "Lista startowa",
    desc: "Lista zgłoszeń zostanie opublikowana po zamknięciu zapisów",
    disabled: true,
  },
];

export function getTierDocuments(tierKey) {
  return documents[tierKey] ?? [];
}

export function getTierSchedule(tierKey) {
  return getItinerary(tierKey);
}

export function getTierShortcuts(tier) {
  return tierShortcuts.map((shortcut) => ({
    ...shortcut,
    to: shortcut.to
      ?.replace(":base", `/${tier.slug}`)
      .replace(":tier", tier.key),
  }));
}
