import { EVENT_FULL_NAME, schedule, tiers } from "./eventConfig.js";

/**
 * Wpis startowy opisuje wyłącznie potwierdzone fakty o imprezie.
 * Kolejne aktualności (zapisy, regulamin, lista zgłoszeń) dopisuj na początku
 * tablicy i nadawaj rosnące `id`.
 */
const newsArticles = [
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
        to: "https://rallydevil.com/otwarte-zapisy",
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
        .join(", ")}. Dzięki temu w jednym weekendzie zmieszczą się zarówno załogi z licencjami sportowymi, jak i kierowcy stawiający pierwsze kroki w sporcie samochodowym.`,
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
