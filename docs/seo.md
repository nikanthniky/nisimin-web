# SEO implementation and verification

Verified locally on 12 November 2026 with Node 22.23.4, npm 10.9.2, and the installed Next.js 16.4.6. Changes are in the repository and generated `out/`; they have not been deployed.

## Audit findings

The App Router contains eight public content pages plus a custom 404. There are no private routes, dynamic product routes, route handlers, or request-dependent rendering. `app/layout.tsx` supplies the shared navigation, main landmark, footer, metadata base, title template, icons, optional analytics, and organization schema. `lib/site.ts` already provided a native Metadata API helper used by every public page.

Before this change, all eight pages already had distinct descriptions, self-referencing canonical URLs, Open Graph fields, and Twitter large-image cards. The homepage search title used only the visual tagline. Organization JSON-LD used raw serialization; WebSite schema and explicit robots directives were absent. The sitemap contained both visibly unfinished legal drafts, and declared a monthly change frequency without an established schedule. It did not fabricate last-modified dates. `robots.txt` already allowed public crawling and referenced the sitemap.

Existing branding includes a valid 1200×630 `/brand/social.png` and `/brand/nisimin-logo.svg`; both are retained. No verified official social profile URLs occur in the project, so no social handles or `sameAs` values were added. PlayTown is preparing for launch; EduNisi is in development. Product metadata continues to reflect those statuses without claiming deployed functionality.

The existing pages have one primary H1, readable server-rendered content, semantic landmarks, descriptive link destinations, a skip link, accessible logo links, and responsive styling. Decorative images intentionally have empty alt text; their enclosing brand illustrations provide accessible labels. Image dimensions already reserve layout space. Internal links connect the homepage, products, company information, contact, and legal pages. The product listing skipped from H1 to card H3; card headings now use H2 on the listing and retain H3 beneath the homepage section H2, with the same CSS styling.

The homepage hero mark was lazy-loaded despite being the largest visible mobile element. It now loads eagerly with high fetch priority; lower-page and other decorative marks keep lazy loading.

## Final metadata and crawl policy

Every row has its own canonical URL under `https://nisimin.com`, unique description, matching Open Graph/Twitter title and description, absolute Open Graph URL, and the existing social image. Child HTML titles use the `%s | NISIMIN` template. The homepage uses an absolute title to prevent a duplicated brand suffix.

| Route                 | HTML title                                         | Indexing        | Sitemap  |
| --------------------- | -------------------------------------------------- | --------------- | -------- |
| `/`                   | NISIMIN \| Technology for Sports and Education     | index, follow   | Included |
| `/products/`          | Our products \| NISIMIN                            | index, follow   | Included |
| `/products/playtown/` | PlayTown — Community Sports Platform \| NISIMIN    | index, follow   | Included |
| `/products/edunisi/`  | EduNisi — Education Technology Platform \| NISIMIN | index, follow   | Included |
| `/about/`             | About NISIMIN \| NISIMIN                           | index, follow   | Included |
| `/contact/`           | Contact NISIMIN \| NISIMIN                         | index, follow   | Included |
| `/privacy/`           | Privacy notice — Draft \| NISIMIN                  | noindex, follow | Excluded |
| `/terms/`             | Website terms — Draft \| NISIMIN                   | noindex, follow | Excluded |
| Custom 404            | Page not found \| NISIMIN                          | noindex         | Excluded |

Draft legal pages remain accessible and crawlable so crawlers can read their `noindex` directives. Once finalized, remove their `{ index: false }` metadata options, add both routes back to `app/sitemap.ts`, and update the export test's draft expectations. The 404 has no homepage canonical. The six sitemap entries use absolute HTTPS apex URLs with trailing slashes; no invented modification dates, change frequencies, or priorities are emitted.

One JSON-LD script per page contains a graph with one Organization and one WebSite, stable entity IDs, and a publisher reference linking them. It reuses the verified logo, company name, contact email, website, and accurate product-focused description. Serialization escapes `<` to prevent embedded content closing the script. No product availability, reviews, ratings, awards, or social profiles are fabricated. BreadcrumbList was omitted because the current UI has no explicit breadcrumb trail; no navigation was added solely for schema.

The static export configuration is unchanged: `output: "export"`, `trailingSlash: true`, and `images.unoptimized: true`. No dependencies, server redirects, DNS records, email settings, or credentials were changed.

## Files changed

- `lib/site.ts`: common site identity, canonical URL builder, metadata options, indexing directives, and social identity.
- `app/layout.tsx`: root metadata defaults and linked Organization/WebSite graph.
- `components/json-ld.tsx` (new): safely serialized JSON-LD component.
- `app/page.tsx`: homepage search metadata and eager hero image.
- `app/products/playtown/page.tsx`, `app/products/edunisi/page.tsx`: descriptive product search titles.
- `app/privacy/page.tsx`, `app/terms/page.tsx`, `app/not-found.tsx`: draft and error indexing policy.
- `app/sitemap.ts`, `app/robots.ts`: shared canonical origin and indexable-only sitemap.
- `app/products/page.tsx`, `components/product-card.tsx`, `app/globals.css`: correct card heading levels with preserved styling.
- `components/logo.tsx`, `components/hero-art.tsx`: explicit homepage hero loading priority.
- `tests/export.test.mjs`: stronger generated metadata, crawl policy, linked schema, and 404 checks.
- `docs/cloudflare.md`: live redirect audit and exact operator instructions.
- `docs/seo.md` (new): this audit, validation results, and follow-up actions.

## Validation results

| Command or check           | Actual result                                                                        |
| -------------------------- | ------------------------------------------------------------------------------------ |
| `npm run build`            | Passed; all eight content routes, metadata routes, and custom 404 exported to `out/` |
| `npm run typecheck`        | Passed after the completed build                                                     |
| `npm run lint`             | Passed                                                                               |
| `npm test`                 | Six export tests passed                                                              |
| `npm run test:browser`     | Eight passed; two intentional project-specific skips                                 |
| `npm run test:performance` | Completed; mobile Lighthouse scores below                                            |
| `git diff --check`         | Passed                                                                               |

The first standalone typecheck overlapped with the build clearing generated `.next/types` files and reported missing generated files. The build's typecheck and the subsequent standalone check passed. Run the standalone typecheck after the build rather than concurrently with it. The sandbox initially blocked the browser server's port; the browser suite passed when rerun with permission to start the local server.

Export tests inspect actual HTML rather than only source configuration. They verify unique titles/descriptions, exactly one self canonical per public route, matching social metadata, correct index/noindex directives, a single H1, valid JSON-LD parsing and linked entity IDs, local logo/asset availability, internal destinations, exact sitemap membership, open robots rules, draft notices, security headers, and the noindex 404. `out/sitemap.xml` and `out/robots.txt` were also inspected directly.

Browser coverage uses the production export on desktop and mobile Chromium: every content route returns 200, automated axe WCAG 2 A/AA and 2.1 AA reports no violations, navigation/email destinations work, reduced-motion content remains available, no client errors occur, and pages fit the tested 320–1440px widths. Safari, Firefox, physical devices, and manual screen-reader review are not covered.

## Performance measurements and remaining limits

These are individual localhost Lighthouse simulated-mobile runs of the current assets, before and after the hero loading correction. They are not production Core Web Vitals or a statistically controlled comparison.

| Metric         | Before hero loading correction | After           |
| -------------- | ------------------------------ | --------------- |
| Performance    | 80                             | 85              |
| Accessibility  | 100                            | 100             |
| Best practices | 96                             | 96              |
| SEO            | 100                            | 100             |
| LCP            | 5.5 seconds                    | 4.4 seconds     |
| TBT            | 0 milliseconds                 | 20 milliseconds |
| CLS            | 0.001                          | 0.001           |

The final audit no longer flags LCP request discovery. LCP remains above the 2.5-second target in this lab run. Remaining opportunities include render-blocking CSS/font requests, image delivery, framework JavaScript, and cache policy. The supplied 232×239 raster brand mark is below the resolution requested on high-density displays; an original higher-resolution or vector asset is needed to fix that without merely upscaling existing artwork. No replacement artwork or appearance changes were made. The static preview server does not reproduce Cloudflare caching or network behavior. INP and production field performance remain unmeasured. The full latest Lighthouse JSON is at `/tmp/nisimin-lighthouse.json`.

The graph is JSON-parsed and checked locally; external Schema.org and Google structured-data validators should also be run against the deployed URL. Local SEO scores do not establish indexing or ranking.

## Cloudflare and Search Console follow-up

The live apex homepage returned HTTP 200. The tested live www product URL also returned HTTP 200 without a redirect. Configure the hostname-only permanent redirect described in [the Cloudflare runbook](cloudflare.md#seo-redirect-www-to-the-canonical-apex), retaining path and query string. No Cloudflare change was performed. Keep existing DNS and mail records intact.

After deploying `out/` through the existing Cloudflare Pages workflow:

1. Verify the six indexable apex URLs, `/robots.txt`, `/sitemap.xml`, `/brand/social.png`, and `/brand/nisimin-logo.svg` in production. Confirm www redirects, draft noindex directives, and real 404 status responses. Check that no hosting header overrides the intended indexing policy.
2. In Search Console, confirm the submitted `https://nisimin.com/sitemap.xml` is fetched with the six current entries; resubmit it if needed. Do not submit draft legal pages for indexing.
3. Use URL Inspection's live test for the homepage, products listing, and both product pages. Confirm crawling is allowed and the declared canonical is the corresponding HTTPS apex URL. Request indexing once for changed indexable URLs; inspect Google's selected canonical when indexed data becomes available.
4. Monitor Page indexing for the specific exclusion reason and last crawl time. Investigate reported canonical, crawl, or content-quality issues instead of repeatedly requesting indexing. A successful live test confirms fetchability, not inclusion in Google's index.
5. Check the homepage schema with Schema.org Validator and supported rich-result types with Google's Rich Results Test. A WebSite node need not produce a rich-result feature. Review actual social previews and measure deployed performance in PageSpeed Insights/Search Console as field data becomes available.

Google says crawling can take days to weeks, repeat requests do not accelerate it, and inclusion is not guaranteed. See [Google's recrawl guidance](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl). Implementation follows the native [Next.js Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata) and [JSON-LD guidance](https://nextjs.org/docs/app/guides/json-ld).
