import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { allNews } from "../src/data/news.js";
import { allStages } from "../src/data/stages.js";
import { SITE_URL, tiers } from "../src/data/eventConfig.js";

const baseRoutes = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/o-rajdzie", changefreq: "monthly", priority: "0.8" },
  { path: "/aktualnosci", changefreq: "weekly", priority: "0.9" },
  { path: "/kibice", changefreq: "weekly", priority: "0.8" },
  { path: "/kibice/mieszkancy", changefreq: "monthly", priority: "0.7" },
  { path: "/kibice/bezpiecznie", changefreq: "monthly", priority: "0.6" },
  { path: "/partnerzy", changefreq: "monthly", priority: "0.6" },
  { path: "/media", changefreq: "monthly", priority: "0.6" },
  { path: "/mapy", changefreq: "weekly", priority: "0.8" },
  { path: "/harmonogram", changefreq: "weekly", priority: "0.8" },
  { path: "/lista-startowa", changefreq: "daily", priority: "0.8" },
  { path: "/lokalizacje", changefreq: "monthly", priority: "0.7" },
  { path: "/kontakt", changefreq: "yearly", priority: "0.5" },
  { path: "/polityka-prywatnosci", changefreq: "yearly", priority: "0.3" },
];

const tierRoutes = tiers.flatMap((tier) => [
  { path: `/${tier.slug}`, changefreq: "weekly", priority: "0.8" },
  { path: `/${tier.slug}/dokumenty`, changefreq: "weekly", priority: "0.7" },
  { path: `/${tier.slug}/tablica`, changefreq: "daily", priority: "0.7" },
]);

const newsRoutes = allNews.map((article) => ({
  path: article.url,
  changefreq: "monthly",
  priority: "0.6",
  lastmod: article.modifiedAt,
}));

const stageRoutes = allStages.map((stage) => ({
  path: stage.path,
  changefreq: "weekly",
  priority: "0.7",
}));

const allRoutes = [
  ...baseRoutes,
  ...tierRoutes,
  ...newsRoutes,
  ...stageRoutes,
];

function toAbsoluteUrl(path) {
  return new URL(path, SITE_URL).toString();
}

function renderUrlEntry(route) {
  const lines = ["  <url>", `    <loc>${toAbsoluteUrl(route.path)}</loc>`];

  if (route.lastmod) {
    lines.push(`    <lastmod>${route.lastmod}</lastmod>`);
  }

  lines.push(`    <changefreq>${route.changefreq}</changefreq>`);
  lines.push(`    <priority>${route.priority}</priority>`);
  lines.push("  </url>");

  return lines.join("\n");
}

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  "",
  allRoutes.map(renderUrlEntry).join("\n\n"),
  "",
  "</urlset>",
  "",
].join("\n");

writeFileSync(resolve("public/sitemap.xml"), xml, "utf8");
