import HomeView from "../views/HomeView.vue";
import { allNews } from "../data/news.js";
import { EVENT_FULL_NAME, location, tiers } from "../data/eventConfig.js";

const SUFFIX = `| ${EVENT_FULL_NAME}`;

/**
 * Strefa zawodnika jest identyczna dla każdego poziomu imprezy (RO / RS / KJS),
 * więc trasy powstają z definicji poziomu w `eventConfig.js`. Harmonogram jest
 * wyjątkiem: jedna strona z przełącznikiem, a stare adresy tylko przekierowują.
 */
function buildTierRoutes(tier) {
  const base = `/${tier.slug}`;
  const crumbs = [
    { name: "Strona główna", path: "/" },
    { name: tier.navLabel, path: base },
  ];

  return [
    {
      path: base,
      name: `drivers-${tier.key}`,
      component: () => import("../views/DriversTierView.vue"),
      props: { tierKey: tier.key },
      meta: {
        title: `${tier.navLabel} ${SUFFIX}`,
        description: `Informacje dla zawodników ${tier.name} (${tier.code}) podczas ${EVENT_FULL_NAME}: zasady udziału, dokumenty i harmonogram.`,
        breadcrumbs: crumbs,
      },
    },
    {
      path: `${base}/dokumenty`,
      name: `drivers-${tier.key}-documents`,
      component: () => import("../views/DriversTierDocumentsView.vue"),
      props: { tierKey: tier.key },
      meta: {
        title: `Dokumenty ${tier.code} ${SUFFIX}`,
        description: `Dokumenty dla zawodników ${tier.name} podczas ${EVENT_FULL_NAME}: regulaminy, formularze i pliki do pobrania.`,
        breadcrumbs: [
          ...crumbs,
          { name: "Dokumenty", path: `${base}/dokumenty` },
        ],
      },
    },
    {
      path: `${base}/harmonogram`,
      redirect: { path: "/harmonogram", query: { poziom: tier.key } },
    },
    {
      path: `${base}/tablica`,
      name: `drivers-${tier.key}-notice-board`,
      component: () => import("../views/DriversNoticeBoardView.vue"),
      props: {
        board: tier.key,
        seriesLabel: `${EVENT_FULL_NAME} - ${tier.name}`,
        pageTitle: `Zawodnicy - ${tier.code}`,
        pageDescription: `Elektroniczna Tablica Ogłoszeń dla zawodników ${tier.name}. Komunikaty, dokumenty i publikacje organizatora pobierane są na żywo z systemu tablicy ogłoszeń.`,
        backPath: base,
        backLabel: `Powrót do strefy zawodników ${tier.code}`,
        // Tablica ogłoszeń ma białe tło, więc przekazujemy warianty na jasne.
        logos: tier.cycles
          .filter((cycle) => cycle.confirmed)
          .map((cycle) => ({ src: cycle.srcOnLight, alt: cycle.alt })),
      },
      meta: {
        title: `Elektroniczna Tablica Ogłoszeń ${tier.code} ${SUFFIX}`,
        description: `Elektroniczna Tablica Ogłoszeń dla zawodników ${tier.name} podczas ${EVENT_FULL_NAME}: komunikaty, dokumenty i publikacje organizatora.`,
        breadcrumbs: [
          ...crumbs,
          {
            name: "Elektroniczna Tablica Ogłoszeń",
            path: `${base}/tablica`,
          },
        ],
      },
    },
  ];
}

export const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      title: `${EVENT_FULL_NAME} | Rajd samochodowy w Karkonoszach`,
      description: `Oficjalna strona ${EVENT_FULL_NAME}. Trzy poziomy imprezy: Rajd Okręgowy, Rally Sprint i KJS. Informacje dla kibiców i zawodników, odcinki specjalne, dokumenty i aktualności.`,
      image: "/logo.png",
      schemaType: "SportsEvent",
      breadcrumbs: [{ name: "Strona główna", path: "/" }],
    },
  },
  {
    path: "/o-rajdzie",
    name: "about-rally",
    component: () => import("../views/AboutRallyView.vue"),
    meta: {
      title: `O rajdzie ${SUFFIX}`,
      description: `Poznaj ${EVENT_FULL_NAME}: charakter wydarzenia, trzy rangi sportowe (RO, RS, KJS) oraz najważniejsze informacje o rajdzie w Karkonoszach.`,
      breadcrumbs: [
        { name: "Strona główna", path: "/" },
        { name: "O rajdzie", path: "/o-rajdzie" },
      ],
    },
  },
  {
    path: "/aktualnosci",
    name: "news",
    component: () => import("../views/NewsView.vue"),
    meta: {
      title: `Aktualności ${SUFFIX}`,
      description: `Najnowsze wiadomości dotyczące ${EVENT_FULL_NAME}: zapisy, komunikaty organizacyjne i informacje dla uczestników.`,
      breadcrumbs: [
        { name: "Strona główna", path: "/" },
        { name: "Aktualności", path: "/aktualnosci" },
      ],
    },
  },
  {
    path: "/aktualnosci/:slug",
    name: "news-article",
    component: () => import("../views/NewsArticleView.vue"),
  },
  ...tiers.flatMap(buildTierRoutes),
  {
    path: "/kibice",
    name: "fans",
    component: () => import("../views/FansView.vue"),
    meta: {
      title: `Kibice ${SUFFIX}`,
      description: `Strefa kibica ${EVENT_FULL_NAME}: praktyczne informacje, zasady bezpieczeństwa i wskazówki dla osób oglądających rajd.`,
      breadcrumbs: [
        { name: "Strona główna", path: "/" },
        { name: "Kibice", path: "/kibice" },
      ],
    },
  },
  {
    path: "/kibice/mieszkancy",
    name: "fans-residents",
    component: () => import("../views/FansResidentsView.vue"),
    meta: {
      title: `Mieszkańcy ${SUFFIX}`,
      description: `Informacje dla mieszkańców rejonów odcinków specjalnych ${EVENT_FULL_NAME}: zamknięcia dróg, harmonogramy i materiały informacyjne.`,
      breadcrumbs: [
        { name: "Strona główna", path: "/" },
        { name: "Kibice", path: "/kibice" },
        { name: "Mieszkańcy", path: "/kibice/mieszkancy" },
      ],
    },
  },
  {
    path: "/kibice/bezpiecznie",
    name: "fans-safety",
    component: () => import("../views/FansSafetyView.vue"),
    meta: {
      title: `Bezpieczeństwo kibiców ${SUFFIX}`,
      description: `Zasady bezpiecznego kibicowania podczas ${EVENT_FULL_NAME}. Sprawdź, jak oglądać rajd odpowiedzialnie i zgodnie z zaleceniami organizatora.`,
      breadcrumbs: [
        { name: "Strona główna", path: "/" },
        { name: "Kibice", path: "/kibice" },
        { name: "Bezpiecznie", path: "/kibice/bezpiecznie" },
      ],
    },
  },
  {
    path: "/partnerzy",
    name: "partners",
    component: () => import("../views/PartnersView.vue"),
    meta: {
      title: `Partnerzy ${SUFFIX}`,
      description: `Partnerzy i sponsorzy ${EVENT_FULL_NAME}. Poznaj marki i instytucje wspierające wydarzenie.`,
      breadcrumbs: [
        { name: "Strona główna", path: "/" },
        { name: "Partnerzy", path: "/partnerzy" },
      ],
    },
  },
  {
    path: "/media",
    name: "media",
    component: () => import("../views/MediaView.vue"),
    meta: {
      title: `Media ${SUFFIX}`,
      description: `Strefa mediów ${EVENT_FULL_NAME} z bezpośrednim dostępem do formularza akredytacji prasowej.`,
      breadcrumbs: [
        { name: "Strona główna", path: "/" },
        { name: "Media", path: "/media" },
      ],
    },
  },
  {
    path: "/lokalizacje",
    name: "locations",
    component: () => import("../views/LocationsView.vue"),
    meta: {
      title: `Lokalizacje ${SUFFIX}`,
      description: `Mapa i lokalizacje związane z ${EVENT_FULL_NAME}. Sprawdź, gdzie odbywają się kluczowe punkty wydarzenia.`,
      breadcrumbs: [
        { name: "Strona główna", path: "/" },
        { name: "Lokalizacje", path: "/lokalizacje" },
      ],
    },
  },
  {
    path: "/harmonogram",
    name: "schedule",
    component: () => import("../views/DriversTierScheduleView.vue"),
    meta: {
      title: `Harmonogram ${SUFFIX}`,
      description: `Harmonogram ${EVENT_FULL_NAME}: osobne itinerery Rajdu Okręgowego, Rally Sprintu i KJS. Godziny pierwszej załogi, odcinki i serwisy.`,
      breadcrumbs: [
        { name: "Strona główna", path: "/" },
        { name: "Harmonogram", path: "/harmonogram" },
      ],
    },
  },
  {
    path: "/mapy",
    name: "stage-maps",
    component: () => import("../views/StageMapsView.vue"),
    meta: {
      title: `Mapy i odcinki specjalne ${SUFFIX}`,
      description: `Poznaj odcinki specjalne ${EVENT_FULL_NAME}: Michałowice i Stara Kamienica, rozgrywane w RO, RS oraz KJS. Sprawdź kształt tras i punkty startu.`,
      breadcrumbs: [
        { name: "Strona główna", path: "/" },
        { name: "Mapy i odcinki", path: "/mapy" },
      ],
    },
  },
  {
    path: "/oesy/:slug",
    name: "stage-detail",
    component: () => import("../views/StageDetailView.vue"),
  },
  {
    path: "/kontakt",
    name: "contact",
    component: () => import("../views/ContactView.vue"),
    meta: {
      title: `Kontakt ${SUFFIX}`,
      description: `Kontakt do organizatora ${EVENT_FULL_NAME}. Dane organizacyjne i adres e-mail biura rajdu.`,
      schemaType: "ContactPage",
      breadcrumbs: [
        { name: "Strona główna", path: "/" },
        { name: "Kontakt", path: "/kontakt" },
      ],
    },
  },
  {
    path: "/polityka-prywatnosci",
    name: "privacy-policy",
    component: () => import("../views/PrivacyPolicyView.vue"),
    meta: {
      title: `Polityka prywatności ${SUFFIX}`,
      description: `Polityka prywatności strony rajdsniezki.pl: kontakt, dane techniczne, licznik odwiedzin, treści osadzone oraz prawa użytkownika.`,
      breadcrumbs: [
        { name: "Strona główna", path: "/" },
        { name: "Polityka prywatności", path: "/polityka-prywatnosci" },
      ],
    },
  },
  /**
   * Trasa dopasowująca resztę adresów. `includedRoutes` w `main.js` prerenderuje
   * ją pod ścieżką `/404`, dzięki czemu w `dist/` powstaje `404.html` – plik,
   * którego hosting statyczny używa dla nieznanych adresów.
   */
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("../views/NotFoundView.vue"),
    meta: {
      title: `Strona nie została znaleziona ${SUFFIX}`,
      description: `Ten adres nie istnieje w serwisie ${EVENT_FULL_NAME}. Przejdź do strony głównej lub skorzystaj ze skrótów do najważniejszych działów.`,
      noindex: true,
      breadcrumbs: [{ name: "Strona główna", path: "/" }],
    },
  },
];

export { location };

export function scrollBehavior(to, from, savedPosition) {
  if (savedPosition) return savedPosition;
  if (to.hash) return { el: to.hash, behavior: "smooth" };
  return { top: 0 };
}

export function newsRoutePaths() {
  return allNews.map((article) => article.url);
}
