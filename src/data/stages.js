import { schedule } from "./eventConfig.js";

/**
 * Geometria tras pochodzi z mapy organizatora (Google My Maps) i jest
 * uproszczona do kilkudziesięciu punktów na odcinek – wystarczająco dokładnie
 * dla podglądu kształtu trasy, bez obciążania bundla.
 *
 * Jedna droga = jeden wpis. Dystans liczy się od startu do mety lotnej danej
 * rangi (pinezki LOTNA na mapie organizatora). Meta stop jest dalej i nie
 * wchodzi w długość odcinka. Pusty obiekt w `variants` oznacza przebieg RO.
 *
 * TODO: numeracja OS-ów (OS 1, OS 2 ...) oraz daty rozgrywania odcinków
 * czekają na zatwierdzony harmonogram.
 */
const routes = [
  {
    slug: "michalowice",
    name: "Michałowice",
    distanceKm: 7.59,
    variants: {
      ro: {},
      rs: {
        distanceKm: 4.91,
        finish: [15.590510, 50.823590],
        finishMapsUrl:
          "https://www.google.com/maps/dir/?api=1&destination=50.823590,15.590510",
        shapePoints: [
      [15.57806, 50.84681],
      [15.57607, 50.84693],
      [15.57565, 50.84670],
      [15.58068, 50.84360],
      [15.58102, 50.84391],
      [15.58074, 50.84573],
      [15.58244, 50.84688],
      [15.58304, 50.84690],
      [15.58304, 50.84665],
      [15.58195, 50.84607],
      [15.58146, 50.84533],
      [15.58290, 50.84266],
      [15.58389, 50.84153],
      [15.58535, 50.84076],
      [15.58618, 50.83949],
      [15.59115, 50.83684],
      [15.59242, 50.83419],
      [15.59334, 50.83346],
      [15.59331, 50.83315],
      [15.59276, 50.83289],
      [15.59113, 50.83356],
      [15.58728, 50.83417],
      [15.58667, 50.83412],
      [15.58644, 50.83367],
      [15.58637, 50.83234],
      [15.58760, 50.83132],
      [15.58860, 50.82964],
      [15.58870, 50.82873],
      [15.59039, 50.82801],
      [15.59134, 50.82718],
      [15.59009, 50.82566],
      [15.58997, 50.82442],
      [15.59051, 50.82359],
        ],
      },
      kjs: {
        distanceKm: 3.86,
        finish: [15.587212, 50.831655],
        finishMapsUrl:
          "https://www.google.com/maps/dir/?api=1&destination=50.831655,15.587212",
        shapePoints: [
      [15.57806, 50.84681],
      [15.57607, 50.84693],
      [15.57565, 50.84670],
      [15.58068, 50.84360],
      [15.58102, 50.84391],
      [15.58074, 50.84573],
      [15.58244, 50.84688],
      [15.58304, 50.84690],
      [15.58304, 50.84665],
      [15.58195, 50.84607],
      [15.58146, 50.84533],
      [15.58290, 50.84266],
      [15.58389, 50.84153],
      [15.58535, 50.84076],
      [15.58618, 50.83949],
      [15.59115, 50.83684],
      [15.59242, 50.83419],
      [15.59334, 50.83346],
      [15.59318, 50.83304],
      [15.59266, 50.83290],
      [15.59113, 50.83356],
      [15.58680, 50.83418],
      [15.58630, 50.83260],
      [15.58721, 50.83165],
        ],
      },
    },
    start: [15.578060, 50.846810],
    finish: [15.613028, 50.821559],
    startMapsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=50.846810,15.578060",
    finishMapsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=50.821559,15.613028",
    summary:
      "Górski odcinek biegnący przez Michałowice w gminie Piechowice. Wąska, techniczna nawierzchnia asfaltowa z wyraźnym profilem wysokościowym.",
    shapePoints: [
      [15.57806, 50.84681],
      [15.57607, 50.84693],
      [15.57565, 50.84670],
      [15.58068, 50.84360],
      [15.58102, 50.84391],
      [15.58074, 50.84573],
      [15.58244, 50.84688],
      [15.58304, 50.84690],
      [15.58304, 50.84665],
      [15.58195, 50.84607],
      [15.58146, 50.84533],
      [15.58290, 50.84266],
      [15.58389, 50.84153],
      [15.58535, 50.84076],
      [15.58618, 50.83949],
      [15.59115, 50.83684],
      [15.59242, 50.83419],
      [15.59334, 50.83346],
      [15.59331, 50.83315],
      [15.59276, 50.83289],
      [15.59113, 50.83356],
      [15.58728, 50.83417],
      [15.58667, 50.83412],
      [15.58644, 50.83367],
      [15.58637, 50.83234],
      [15.58760, 50.83132],
      [15.58860, 50.82964],
      [15.58870, 50.82873],
      [15.59039, 50.82801],
      [15.59134, 50.82718],
      [15.59015, 50.82586],
      [15.58997, 50.82442],
      [15.59283, 50.81999],
      [15.59439, 50.81949],
      [15.59925, 50.82021],
      [15.60185, 50.81882],
      [15.60385, 50.81825],
      [15.60456, 50.81731],
      [15.60533, 50.81714],
      [15.60631, 50.81629],
      [15.60853, 50.81574],
      [15.61010, 50.81738],
      [15.61201, 50.81840],
      [15.61341, 50.81951],
      [15.61344, 50.81998],
      [15.61186, 50.82128],
      [15.61303, 50.82156],
    ],
  },
  {
    slug: "stara-kamienica",
    name: "Stara Kamienica",
    distanceKm: 9.46,
    variants: {
      ro: {},
      rs: {
        distanceKm: 5.22,
        finish: [15.606281, 50.912818],
        finishMapsUrl:
          "https://www.google.com/maps/dir/?api=1&destination=50.912818,15.606281",
        shapePoints: [
      [15.61023, 50.92263],
      [15.61030, 50.92165],
      [15.60809, 50.92152],
      [15.60695, 50.92068],
      [15.60512, 50.92030],
      [15.60486, 50.91949],
      [15.60425, 50.91899],
      [15.60251, 50.91924],
      [15.59658, 50.91894],
      [15.59169, 50.91928],
      [15.58812, 50.91908],
      [15.58629, 50.91955],
      [15.58425, 50.91953],
      [15.58285, 50.91925],
      [15.58212, 50.91878],
      [15.58125, 50.91871],
      [15.58049, 50.91773],
      [15.57936, 50.91691],
      [15.57728, 50.91685],
      [15.57638, 50.91625],
      [15.57638, 50.91582],
      [15.57855, 50.91468],
      [15.57899, 50.91372],
      [15.58070, 50.91369],
      [15.58346, 50.91256],
      [15.58998, 50.91126],
      [15.59080, 50.91122],
      [15.59277, 50.91183],
      [15.59813, 50.91278],
      [15.60303, 50.91295],
      [15.60628, 50.91282],
        ],
      },
      kjs: {
        distanceKm: 2.01,
        finish: [15.585867, 50.919584],
        finishMapsUrl:
          "https://www.google.com/maps/dir/?api=1&destination=50.919584,15.585867",
        shapePoints: [
      [15.61023, 50.92263],
      [15.61030, 50.92165],
      [15.60809, 50.92152],
      [15.60695, 50.92068],
      [15.60512, 50.92030],
      [15.60471, 50.91928],
      [15.60417, 50.91898],
      [15.60251, 50.91924],
      [15.59658, 50.91894],
      [15.59169, 50.91928],
      [15.58812, 50.91908],
      [15.58587, 50.91958],
        ],
      },
    },
    start: [15.610228, 50.922629],
    finish: [15.628233, 50.889635],
    startMapsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=50.922629,15.610228",
    finishMapsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=50.889635,15.628233",
    summary:
      "Najdłuższy odcinek rajdu, rozgrywany na drogach gminy Stara Kamienica. Szybkie proste przeplatane ciasnymi zakrętami między zabudowaniami.",
    shapePoints: [
      [15.61023, 50.92263],
      [15.61030, 50.92165],
      [15.60809, 50.92152],
      [15.60695, 50.92068],
      [15.60512, 50.92030],
      [15.60486, 50.91949],
      [15.60425, 50.91899],
      [15.60251, 50.91924],
      [15.59658, 50.91894],
      [15.59169, 50.91928],
      [15.58812, 50.91908],
      [15.58629, 50.91955],
      [15.58425, 50.91953],
      [15.58285, 50.91925],
      [15.58212, 50.91878],
      [15.58125, 50.91871],
      [15.58049, 50.91773],
      [15.57931, 50.91689],
      [15.57709, 50.91678],
      [15.57646, 50.91640],
      [15.57638, 50.91582],
      [15.57846, 50.91476],
      [15.57899, 50.91372],
      [15.58070, 50.91369],
      [15.58346, 50.91256],
      [15.59055, 50.91121],
      [15.59326, 50.91193],
      [15.59869, 50.91283],
      [15.60384, 50.91295],
      [15.60889, 50.91274],
      [15.60929, 50.91292],
      [15.60987, 50.91444],
      [15.61493, 50.91367],
      [15.62053, 50.91474],
      [15.62040, 50.91378],
      [15.62103, 50.91266],
      [15.62075, 50.91089],
      [15.62194, 50.91062],
      [15.62178, 50.90850],
      [15.62285, 50.90703],
      [15.62261, 50.90514],
      [15.62081, 50.90205],
      [15.62505, 50.89863],
      [15.62555, 50.89749],
      [15.62563, 50.89580],
      [15.62625, 50.89452],
      [15.62720, 50.89360],
      [15.62742, 50.89170],
      [15.62823, 50.88963],
    ],
  },
];

const stageNaming = {
  ro: { code: "OS", typeLabel: "Odcinek specjalny" },
  rs: { code: "OS", typeLabel: "Odcinek specjalny" },
  kjs: { code: "PS", typeLabel: "Próba sportowa" },
};

function withDerived(stage) {
  return {
    ...stage,
    headline: `${stage.code} ${stage.name}`,
    path: `/oesy/${stage.slug}`,
    dateLabel: schedule.confirmed ? schedule.dateLabel : schedule.pendingLabel,
    cardSummary: stage.summary,
  };
}

function resolveForTier(route, tierKey) {
  const { variants, ...base } = route;
  return withDerived({
    ...base,
    ...stageNaming[tierKey],
    ...variants[tierKey],
    tierKey,
    tiers: Object.keys(variants),
  });
}

export const allStages = routes.map((route) => {
  const tiers = Object.keys(route.variants);
  const { variants, ...base } = route;
  return withDerived({
    ...base,
    // Strona odcinka jest wspólna dla wszystkich poziomów, więc opisujemy ją
    // nazewnictwem najwyższego z nich, a dystanse pokazujemy per poziom.
    ...stageNaming[tiers[0]],
    tiers,
    tierStages: tiers.map((tierKey) => resolveForTier(route, tierKey)),
  });
});

export function getStageBySlug(slug) {
  return allStages.find((stage) => stage.slug === slug);
}

export function getStagesForTier(tierKey) {
  return routes
    .filter((route) => tierKey in route.variants)
    .map((route) => resolveForTier(route, tierKey));
}
