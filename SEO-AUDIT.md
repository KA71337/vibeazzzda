# VIBE AZ SEO Audit

Audit date: 2026-08-18

## Status

| Check | Result | Evidence |
| --- | --- | --- |
| Domain | PASS | `https://vibeaz.org` is the single canonical site origin. |
| Robots | PASS | Dynamic `app/robots.ts`; exact directives are listed below. |
| Sitemap | PASS | Dynamic `app/sitemap.ts`; 129 URLs: 1 home, 1 catalog, 15 used categories, 112 products. |
| Canonical | PASS | Absolute canonical URLs use `https://vibeaz.org/...`; local HTTP audit passed 129/129 URLs. |
| Metadata | PASS | Unique title and description for home, catalog, each used category and each product. |
| H1 | PASS | One logical H1 on home, catalog/category and product pages. |
| Product Schema | PASS | Product JSON-LD includes price, AZN, image, SKU, seller and real stock availability for 112 products. |
| Breadcrumb | PASS | BreadcrumbList JSON-LD and visible breadcrumbs are present on product pages. |
| Hreflang | N/A | AZ/RU/EN are client-side language variants without separate URL routes; no false hreflang URLs are emitted. Default language is AZ. |
| Open Graph | PASS | Home, catalog/category and product metadata use the canonical URL, title, description and image. |
| Organization Schema | PASS | Organization and WebSite JSON-LD use verified site/contact/social data only. |
| Image SEO | PASS | Product images have descriptive alt text, stable dimensions/frames, Next Image optimization and sitemap image entries. |
| Internal Linking | PASS | Home -> category -> product links use stable slash-canonical routes; products link back to their category. |
| Core Web Vitals | TECHNICAL PASS / FIELD DATA PENDING | Next Image optimization is enabled, image dimensions are constrained, local fonts are used and the production build succeeds. CrUX/PageSpeed field data is not available in this local audit. |

## Robots

Production output must remain exactly:

```text
User-Agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: https://vibeaz.org/sitemap.xml
```

There is no `Host` directive and no legacy host in the generated robots file.

## Sitemap Contract

The sitemap contains only absolute HTTPS URLs on `vibeaz.org`:

- `/`
- `/catalog/`
- Used category routes under `/catalog/<category>/`
- Existing product routes under `/product/<id>/`

It excludes query URLs, redirects, private routes, admin/API paths, localhost and legacy domains. The static HTTP audit verified `129/129` public URLs with HTTP 200, indexable pages and matching canonicals.

Admin catalog changes are committed to the configured GitHub repository. The resulting Vercel build regenerates the static catalog, product routes and sitemap, so added products enter the sitemap and deleted products leave it on the next deployment.

## Indexability

Public home, catalog, category and product pages use `index, follow`. Cart, favorites, order and 404 pages use `noindex`; admin and admin API responses are marked `X-Robots-Tag: noindex, nofollow, noarchive`.

## Domain Migration

The old sitemap/robots origin caused the previous 129 Search Console errors. All generated SEO URLs, canonicals, Open Graph URLs, JSON-LD URLs and internal links now use `https://vibeaz.org`.

Permanent host redirects are configured for the legacy aliases `vibe.az`, `vibeaz.vercel.app` and `vibeazzz.vercel.app`. These aliases appear only in redirect configuration, not in SEO output. The `vibe.az.official` strings retained in social profile URLs are external account handles, not site hosts.

## Fixed

- Replaced the legacy robots sitemap and removed the obsolete `Host` directive.
- Replaced query-string category sitemap entries with stable category routes.
- Added dynamic category metadata, CollectionPage/ItemList schema and clean redirects from legacy category queries.
- Added product metadata, Product schema, real `InStock`/`OutOfStock` availability and BreadcrumbList schema.
- Added Organization and WebSite schema with absolute canonical URLs.
- Added natural AZ home SEO copy and category/product internal links without keyword stuffing.
- Added descriptive product/gallery alt text and enabled Next/Vercel image optimization.
- Added noindex controls for non-SEO workflows and admin/API paths.
- Preserved the Google verification file at `public/google714a63d792693c9a.html` unchanged.

## Validation Commands

```text
npm run typecheck       PASS
npm run lint            PASS
npm test                PASS (14 tests)
npm run security:smoke  PASS
npm run seo:check       PASS (112 products, 15 categories, 129 sitemap URLs)
npm run build           PASS
node scripts/seo-audit.mjs --http=http://127.0.0.1:3102  PASS (129/129)
```

Production URLs are rechecked after each Vercel deployment: `/robots.txt`, `/sitemap.xml`, representative home/category/product pages and `/google714a63d792693c9a.html`.
