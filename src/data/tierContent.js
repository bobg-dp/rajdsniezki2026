/**
 * Treści specyficzne dla poziomów imprezy.
 *
 * Dokumenty i harmonogramy Rajdu Śnieżki nie zostały jeszcze opublikowane,
 * dlatego listy są puste – widoki renderują wtedy panel „w przygotowaniu”.
 * Po otrzymaniu plików wystaw je w `public/assets/files/` i dopisz tutaj.
 */

const documents = {
  ro: [],
  rs: [],
  kjs: [],
};

const schedules = {
  ro: [],
  rs: [],
  kjs: [],
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
    to: ":base/harmonogram",
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
    to: "/mapy",
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
  return schedules[tierKey] ?? [];
}

export function getTierShortcuts(tier) {
  return tierShortcuts.map((shortcut) => ({
    ...shortcut,
    to: shortcut.to?.replace(":base", `/${tier.slug}`),
  }));
}
