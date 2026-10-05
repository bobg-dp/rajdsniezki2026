import { getNewsArticleBySlug } from "../data/news.js";
import { getStageBySlug } from "../data/stages.js";
import {
  CONTACT_EMAIL,
  EVENT_FULL_NAME,
  SITE_URL as EVENT_SITE_URL,
  location,
  organizer,
  schedule,
  tiers,
} from "../data/eventConfig.js";

export const SITE_URL = EVENT_SITE_URL;
export const SITE_NAME = EVENT_FULL_NAME;
const DEFAULT_DESCRIPTION = `${EVENT_FULL_NAME} – rajd samochodowy Automobilklubu Karkonosze w trzech rangach: ${tiers
  .map((tier) => tier.code)
  .join(", ")}. Odcinki specjalne w rejonie ${location.region}.`;
const DEFAULT_IMAGE = `${SITE_URL}/logo.png`;

function toAbsoluteUrl(value = '/') {
  if (!value) return SITE_URL
  if (/^https?:\/\//i.test(value)) return value
  return new URL(value, SITE_URL).toString()
}

function buildBreadcrumbSchema(breadcrumbs = []) {
  if (!breadcrumbs.length) return null

  return {
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: toAbsoluteUrl(item.path),
    })),
  }
}

function buildPageSchema(canonicalUrl, seo) {
  const basePage = {
    '@type': seo.schemaType || 'WebPage',
    name: seo.title,
    description: seo.description,
    url: canonicalUrl,
  }

  if (seo.schemaType === 'SportsEvent') {
    return {
      ...basePage,
      startDate: schedule.startIso,
      endDate: schedule.endIso,
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      image: [toAbsoluteUrl(seo.image)],
      location: {
        "@type": "Place",
        name: location.city,
        address: {
          "@type": "PostalAddress",
          addressLocality: location.city,
          addressRegion: location.region,
          addressCountry: "PL",
        },
      },
      organizer: {
        "@type": "MotorSportsOrganization",
        name: organizer.name,
        url: SITE_URL,
        email: CONTACT_EMAIL,
      },
    };
  }

  if (seo.schemaType === 'NewsArticle') {
    return {
      "@type": "NewsArticle",
      headline: seo.title,
      description: seo.description,
      image: [toAbsoluteUrl(seo.image)],
      datePublished: seo.datePublished,
      dateModified: seo.dateModified || seo.datePublished,
      mainEntityOfPage: canonicalUrl,
      author: {
        "@type": "MotorSportsOrganization",
        name: SITE_NAME,
      },
      publisher: {
        "@type": "MotorSportsOrganization",
        name: SITE_NAME,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/logo.png`,
        },
      },
      articleSection: seo.articleSection,
      inLanguage: "pl-PL",
    };
  }

  if (seo.schemaType === 'ContactPage') {
    return {
      ...basePage,
      mainEntity: {
        "@type": "MotorSportsOrganization",
        name: organizer.name,
        email: CONTACT_EMAIL,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Jelenia Góra",
          addressCountry: "PL",
        },
      },
    };
  }

  return basePage
}

function getFallbackSeo(route) {
  return {
    title: route.meta?.title || SITE_NAME,
    description: route.meta?.description || DEFAULT_DESCRIPTION,
    image: route.meta?.image || DEFAULT_IMAGE,
    schemaType: route.meta?.schemaType,
    breadcrumbs: route.meta?.breadcrumbs || [
      { name: "Strona główna", path: "/" },
    ],
    datePublished: route.meta?.datePublished,
    dateModified: route.meta?.dateModified,
    articleSection: route.meta?.articleSection,
    canonicalPath: route.path || '/',
    noindex: route.meta?.noindex ?? false,
  }
}

export function resolveSeo(route) {
  if (route.name === 'news-article') {
    const article = getNewsArticleBySlug(route.params?.slug)

    if (!article) {
      return {
        title: `Artykuł nie został znaleziony | ${SITE_NAME}`,
        description: DEFAULT_DESCRIPTION,
        image: DEFAULT_IMAGE,
        breadcrumbs: [
          { name: 'Strona główna', path: '/' },
          { name: 'Aktualności', path: '/aktualnosci' },
        ],
        canonicalPath: route.path || '/aktualnosci',
        noindex: true,
      }
    }

    return {
      title: article.title,
      description: article.excerpt,
      image: article.image,
      schemaType: 'NewsArticle',
      datePublished: article.publishedAt,
      dateModified: article.modifiedAt,
      articleSection: article.category,
      breadcrumbs: [
        { name: 'Strona główna', path: '/' },
        { name: 'Aktualności', path: '/aktualnosci' },
        { name: article.title, path: article.url },
      ],
      canonicalPath: article.url,
      noindex: false,
    }
  }

  if (route.name === "stage-detail") {
    const stage = getStageBySlug(route.params?.slug);

    if (!stage) {
      return {
        title: `Odcinek nie został znaleziony | ${SITE_NAME}`,
        description: DEFAULT_DESCRIPTION,
        image: DEFAULT_IMAGE,
        breadcrumbs: [{ name: "Strona główna", path: "/" }],
        canonicalPath: route.path || "/oesy",
        noindex: true,
      };
    }

    return {
      title: `${stage.headline} | ${SITE_NAME}`,
      description: `${stage.headline}, ${SITE_NAME}. ${stage.typeLabel}, ${stage.dateLabel}, ${stage.distanceKm.toFixed(2)} km. Sprawdź zarys trasy oraz szybkie linki do startu i mety.`,
      image: DEFAULT_IMAGE,
      breadcrumbs: [
        { name: "Strona główna", path: "/" },
        { name: stage.headline, path: stage.path },
      ],
      canonicalPath: stage.path,
      noindex: false,
    };
  }

  return getFallbackSeo(route)
}

export function buildHeadForRoute(route) {
  const seo = resolveSeo(route)
  const canonicalUrl = toAbsoluteUrl(seo.canonicalPath || route.path || '/')
  const imageUrl = toAbsoluteUrl(seo.image)
  const isArticle = seo.schemaType === 'NewsArticle'

  const graph = [
    {
      "@type": "MotorSportsOrganization",
      name: organizer.name,
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      email: CONTACT_EMAIL,
    },
    {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
      inLanguage: "pl-PL",
    },
  ];

  const breadcrumbSchema = buildBreadcrumbSchema(seo.breadcrumbs)
  if (breadcrumbSchema) {
    graph.push(breadcrumbSchema)
  }

  graph.push(buildPageSchema(canonicalUrl, seo))

  const meta = [
    { name: 'description', content: seo.description },
    {
      name: 'robots',
      content: seo.noindex
        ? 'noindex,nofollow'
        : 'index,follow,max-image-preview:large',
    },
    { property: 'og:title', content: seo.title },
    { property: 'og:description', content: seo.description },
    { property: 'og:type', content: isArticle ? 'article' : 'website' },
    { property: 'og:url', content: canonicalUrl },
    { property: 'og:image', content: imageUrl },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: seo.title },
    { name: 'twitter:description', content: seo.description },
    { name: 'twitter:image', content: imageUrl },
  ]

  if (isArticle && seo.datePublished) {
    meta.push({
      property: 'article:published_time',
      content: seo.datePublished,
    })
  }

  return {
    title: seo.title,
    meta,
    link: [{ rel: 'canonical', href: canonicalUrl }],
    script: [
      {
        key: 'route-jsonld',
        type: 'application/ld+json',
        textContent: JSON.stringify(
          {
            '@context': 'https://schema.org',
            '@graph': graph,
          },
          null,
          2,
        ),
      },
    ],
  }
}