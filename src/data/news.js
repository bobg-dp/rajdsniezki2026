import { EVENT_FULL_NAME, schedule, tiers } from "./eventConfig.js";

/**
 * Wpis startowy opisuje wyłącznie potwierdzone fakty o imprezie.
 * Kolejne aktualności (zapisy, regulamin, lista zgłoszeń) dopisuj na początku
 * tablicy i nadawaj rosnące `id`.
 */
const newsArticles = [
  {
    id: 3,
    slug: "listy-zgloszen-opublikowane",
    title: "Listy zgłoszeń opublikowane",
    excerpt:
      "Listy zgłoszeń Rajdu Śnieżki są już dostępne. Sprawdźcie załogi Rajdu Okręgowego, Rally Sprintu i KJS.",
    category: "Listy zgłoszeń",
    breadcrumbLabel: "Listy zgłoszeń",
    dateLabel: "14 października 2026",
    publishedAt: "2026-10-14",
    modifiedAt: "2026-10-14",
    image: "/assets/news/listy-zgloszen-opublikowane.jpg",
    imageAlt:
      "Grafika Rajdu Śnieżki: listy zgłoszeń opublikowane, rajdowy samochód na tle karkonoskiego lasu.",
    body: [
      "Załogi Rajdu Śnieżki 2026 można już zobaczyć na listach zgłoszeń. Opublikowaliśmy składy wszystkich trzech rang: Rajdu Okręgowego, Rally Sprintu i Konkursowej Jazdy Samochodem.",
      "Listy Rajdu Okręgowego i Rally Sprintu są w PDF na Elektronicznej Tablicy Ogłoszeń. Listę KJS znajdziecie na Rally Devil.",
      "Najbardziej aktualna wersja zawsze jest na tablicy ogłoszeń danej rangi.",
      "Widzimy się na starcie w Karkonoszach.",
    ],
    ctas: [
      {
        label: "Lista zgłoszeń RO",
        to: "https://app-cdn.sportity.com/3fec3e38-1c1b-488b-9974-9c16ef890f41/926bebbd-c65e-4c52-8a7b-744ee01ff02d_Lista%20zg%C5%82oszen%CC%81%20RO.pdf",
        theme: "accent",
      },
      {
        label: "Lista zgłoszeń RS",
        to: "https://app-cdn.sportity.com/c5effb27-6d96-4b15-91a9-bedaf3eb2200/b1b05a51-edfa-4aa7-a07d-d41d484e01fd_Lista%20zg%C5%82oszen%CC%81%20RPP%201.pdf",
        theme: "dark",
      },
      {
        label: "Lista zgłoszeń KJS",
        to: "https://rallydevil.com/rajd/rajd-sniezki-2026",
        theme: "dark",
      },
    ],
  },
  {
    id: 2,
    slug: "zostaly-tylko-3-dni-na-zapisy",
    title: "Zostały tylko 3 dni na zapisy do RO i RS",
    excerpt:
      "Lista zgłoszeń Rajdu Okręgowego i Rally Sprintu powoli się zamyka. Zgłoś się już dziś. Na zapisy KJS jest więcej czasu, do 16 października 2026.",
    category: "Zapisy",
    breadcrumbLabel: "3 dni na zapisy",
    dateLabel: "9 października 2026",
    publishedAt: "2026-10-09",
    modifiedAt: "2026-10-09",
    image: "/assets/news/zostaly-3-dni-na-zapisy.jpg",
    imageAlt:
      "Grafika Rajdu Śnieżki: zostały tylko 3 dni na zapisy, rajdowy samochód na tle karkonoskiego lasu.",
    body: [
      "Jeśli jeszcze nie jesteście zapisani na Rajd Okręgowy albo Rally Sprint, to ostatni moment. Lista zgłoszeń powoli się zamyka, więc nie czekajcie do ostatniej chwili.",
      "Zgłoszenie do RO i RS składacie w systemie Inside PZM. Dołączcie do rywalizacji i zgłoście się już dziś.",
      "Na zapisy do Konkursowej Jazdy Samochodem jest więcej czasu. Lista KJS pozostaje otwarta do 16 października 2026 i prowadzi przez Rally Devil.",
      "Widzimy się na trasie.",
    ],
    ctas: [
      {
        label: "Zgłoś się do RO i RS",
        to: "https://insidepzm.pl/accounts/login/?next=/home/",
        theme: "accent",
      },
      {
        label: "Zapisy KJS do 16 października",
        to: "https://rallydevil.com/rajd/rajd-sniezki-2026",
        theme: "dark",
      },
    ],
  },
  {
    id: 1,
    slug: "rajd-sniezki-trzy-poziomy-imprezy",
    title: `${EVENT_FULL_NAME} – trzy poziomy imprezy`,
    excerpt: `Automobilklub Karkonosze zaprasza na Rajd Śnieżki w dniach ${schedule.dateLabel}. Na starcie staną załogi w trzech rangach: Rajd Okręgowy, Rally Sprint oraz Konkursowa Jazda Samochodem.`,
    category: "Zapowiedź",
    breadcrumbLabel: "Zapowiedź rajdu",
    dateLabel: "Zapowiedź",
    publishedAt: "2026-01-01",
    modifiedAt: "2026-01-01",
    image: "/assets/news/rajd-sniezki-2026-zapowiedz.jpg",
    imageAlt: `Plakat ${EVENT_FULL_NAME} – rajdowa Škoda Fabia na asfaltowym odcinku w Karkonoszach, termin ${schedule.shortDateLabel}`,
    body: [
      `Automobilklub Karkonosze rozpoczyna przygotowania do Rajdu Śnieżki – rajdu samochodowego rozgrywanego na asfaltowych drogach Karkonoszy. Impreza odbędzie się w dniach ${schedule.dateLabel}.`,
      `Impreza zostanie rozegrana w trzech rangach: ${tiers
        .map((tier) => `${tier.name} (${tier.code})`)
        .join(
          ", ",
        )}. Dzięki temu w jednym weekendzie zmieszczą się zarówno załogi z licencjami sportowymi, jak i kierowcy stawiający pierwsze kroki w sporcie samochodowym.`,
      "Na mapie rajdu znalazły się dwa odcinki specjalne: Michałowice w gminie Piechowice oraz odcinek na drogach gminy Stara Kamienica. Oba przebiegi rozegrają wszystkie trzy poziomy imprezy. Rajd Okręgowy jedzie do swojej mety lotnej, a Rally Sprint i Konkursowa Jazda Samochodem kończą wcześniej na tych samych drogach.",
      "Regulamin uzupełniający oraz szczegółowy harmonogram zostaną opublikowane na tej stronie oraz na Elektronicznej Tablicy Ogłoszeń. Zapraszamy do śledzenia aktualności.",
    ],
    ctas: [
      {
        label: "Odcinki specjalne",
        to: "/mapy",
        theme: "dark",
      },
      {
        label: "O rajdzie",
        to: "/o-rajdzie",
        theme: "accent",
      },
    ],
  },
];

function withUrl(article) {
  return {
    ...article,
    url: `/aktualnosci/${article.slug}`,
    date: article.dateLabel,
  };
}

export const allNews = newsArticles.map(withUrl);

export function getLatestNews(limit = 3) {
  return allNews.slice(0, limit);
}

export function getNewsArticleBySlug(slug) {
  return allNews.find((article) => article.slug === slug);
}
