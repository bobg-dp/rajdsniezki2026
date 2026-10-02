---
name: add-seo-page
description: "Add or update a Vue page with routing, Polish SEO metadata, breadcrumbs, and SSG-safe behavior. Use for new subpages, route changes, content pages, and SEO updates."
argument-hint: "Describe the page goal, route path, and whether it needs new content sections or data."
user-invocable: true
---

# Add SEO Page

## When To Use

- Add a new static page or subpage to the rally website.
- Update route metadata such as title, description, breadcrumbs, or schema type.
- Extend the site with a new informational page for kibice, zawodnicy, partnerzy, kontakt, or similar static content.

## Procedure

1. Start from the smallest owning surface.
   - Add or update a view in `src/views`.
   - Reuse existing layout, section, and UI components before creating new ones.

2. Register or update the route in `src/router/index.js`.
   - Keep Polish path slugs in kebab-case.
   - Add `meta.title`, `meta.description`, and `meta.breadcrumbs` when the page is indexable.
   - Add `schemaType` only when it materially improves structured data.

3. Keep the page SSG-safe.
   - Do not access browser-only globals during module evaluation.
   - Put browser-only behavior inside `onMounted` or behind runtime guards.

4. Preserve project content conventions.
   - User-facing copy should stay in Polish.
   - If the page affects news or dynamic article URLs, check whether `src/main.js` route inclusion or data sources need an update.
   - If the page changes SEO meaningfully, review `src/components/layout/SeoHead.vue` consumers and route metadata consistency.

5. Validate the result.
   - Run `npm run build`.
   - Confirm the generated route renders correctly and no SSG regression appears.

## Output Expectations

- The page should be reachable by router path.
- The route should carry intentional SEO metadata.
- The implementation should fit the current folder structure and avoid duplicating existing component patterns.
