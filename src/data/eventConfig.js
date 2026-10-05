/**
 * Jedno źródło prawdy o imprezie.
 *
 * Dane oznaczone jako `confirmed: false` są widoczne na stronie jako
 * "w przygotowaniu" zamiast konkretnych wartości, dopóki organizator ich
 * nie zatwierdzi. Nie zmieniaj flagi bez potwierdzonego komunikatu.
 */

export const EVENT_NAME = "Rajd Śnieżki";
export const EVENT_EDITION = "2026";
export const EVENT_FULL_NAME = `${EVENT_NAME} ${EVENT_EDITION}`;
export const SITE_URL = "https://rajdsniezki.pl";
export const CONTACT_EMAIL = "biuro@rajdsniezki.pl";

export const schedule = {
  confirmed: true,
  // Wykorzystywane przez licznik odliczający oraz schema.org SportsEvent.
  startIso: "2026-10-17T09:00:00+02:00",
  endIso: "2026-10-18T18:00:00+02:00",
  dateLabel: "17–18 października 2026",
  shortDateLabel: "17–18.10.2026",
  pendingLabel: "Termin w przygotowaniu",
};

export const location = {
  city: "Jelenia Góra",
  region: "Karkonosze",
  // Odcinki potwierdzone na mapie organizatora: Michałowice i gmina Stara Kamienica.
  municipalities: ["Piechowice", "Stara Kamienica"],
};

export const organizer = {
  name: "Automobilklub Karkonosze",
  // Pełny lockup (godło + napis) do sekcji treści, emblemat bez napisu tam,
  // gdzie logo jest niskie i napis byłby nieczytelny. Przyrostek mówi o tle,
  // na którym wariant ma stanąć, a nie o kolorze samego pliku.
  logoOnLight: "/assets/akk/lockup-on-light.webp",
  logoOnDark: "/assets/akk/lockup-on-dark.webp",
  emblemOnLight: "/assets/akk/emblem-on-light.webp",
  emblemOnDark: "/assets/akk/emblem-on-dark.webp",
  url: "https://www.facebook.com/automobilklubkarkonosze",
};

/**
 * Trzy poziomy imprezy. Każdy poziom generuje własny zestaw tras
 * (strefa zawodnika, tablica ogłoszeń, dokumenty, harmonogram).
 */
export const tiers = [
  {
    key: "ro",
    slug: "zawodnicy-ro",
    code: "RO",
    name: "Rajd Okręgowy",
    navLabel: "Zawodnicy RO",
    tagline: "Najwyższa ranga sportowa Rajdu Śnieżki",
    description:
      "Rajd Okręgowy to najwyższa ranga Rajdu Śnieżki: pełne odcinki specjalne, licencje sportowe i klasyfikacja w cyklu wojewódzkim.",
    shortDescription: "Pełne OS-y, licencja sportowa, klasyfikacja cyklu",
    accent: "orange",
    licenceRequired: true,
    cycles: [
      {
        src: "/assets/cycles/rsmds.webp",
        alt: "Rajdowe Samochodowe Mistrzostwa Dolnego Śląska",
        confirmed: false,
      },
    ],
  },
  {
    key: "rs",
    slug: "zawodnicy-rs",
    code: "RS",
    name: "Rally Sprint",
    navLabel: "Zawodnicy RS",
    tagline: "Krótsze dystanse, ten sam rajdowy charakter",
    description:
      "Rally Sprint to krótszy format rozgrywany na tych samych odcinkach specjalnych. Dobry wybór dla załóg wchodzących w sport rajdowy.",
    shortDescription: "Skrócony format na tych samych odcinkach",
    accent: "snow",
    licenceRequired: true,
    cycles: [
      {
        src: "/assets/cycles/rpp-transparent.webp",
        alt: "Rajdowy Puchar Południa",
        confirmed: false,
      },
    ],
  },
  {
    key: "kjs",
    slug: "zawodnicy-kjs",
    code: "KJS",
    name: "Konkursowa Jazda Samochodem",
    navLabel: "Zawodnicy KJS",
    tagline: "Pierwszy krok w rajdach – bez licencji sportowej",
    description:
      "Konkursowa Jazda Samochodem to najprostsza droga do startu w rajdzie. Wystarczy prawo jazdy, seryjne auto i licencja KJS wydawana na miejscu.",
    shortDescription: "Start bez licencji sportowej, seryjnym samochodem",
    accent: "steel",
    licenceRequired: false,
    cycles: [],
  },
];

export const tiersByKey = Object.fromEntries(
  tiers.map((tier) => [tier.key, tier]),
);

export function getTier(key) {
  return tiersByKey[key];
}

export const resultsUrl = null; // TODO: podmień na link do wyników po uruchomieniu rajdu w systemie.
