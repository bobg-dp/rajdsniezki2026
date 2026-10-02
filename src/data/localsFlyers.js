import { allStages } from "./stages.js";

/**
 * Ulotki dla mieszkańców (awers/rewers) dostarcza organizator przed rajdem.
 * Dopisz pliki do `public/assets/locals/<slug>/` i wpisz je poniżej pod
 * kluczem równym slugowi odcinka – sekcja pojawi się automatycznie.
 */
const flyerFiles = {};

export const localsSections = allStages.map((stage) => ({
  id: stage.slug,
  code: stage.code,
  name: stage.name,
  typeLabel: stage.typeLabel,
  dateLabel: stage.dateLabel,
  flyers: (flyerFiles[stage.slug] ?? []).map((flyer) => ({
    ...flyer,
    alt: `Ulotka dla mieszkańców – ${stage.name}, strona ${flyer.side.toLowerCase()}`,
    label: flyer.side,
  })),
}));

export const hasAnyFlyers = localsSections.some(
  (section) => section.flyers.length > 0,
);
