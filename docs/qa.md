# Verification results

Verified locally on 12 November 2026, using Node 24.12.0, npm 11.6.2, Next.js 16.4.6, React 19.3.1, and Chromium 158 through Playwright. The deployment runbook targets Node 22 LTS; a Node 22-specific build has not been run locally.

## Completed checks

| Check                       | Result                                                                                                                                |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run typecheck`         | Pass, strict TypeScript                                                                                                               |
| `npm run lint`              | Pass, no warnings                                                                                                                     |
| `npm run build`             | Pass, static export of all eight requested routes, metadata routes, and 404                                                           |
| `npm test`                  | 4 export tests passed                                                                                                                 |
| `npm run test:browser`      | 8 passed, 2 intentionally skipped (the mobile-only menu check and desktop-run viewport sweep each run only in their relevant project) |
| axe WCAG 2 A/AA and 2.1 AA  | No detected violations on all eight pages at desktop and mobile sizes                                                                 |
| Client JavaScript errors    | None detected during page visits                                                                                                      |
| Layout overflow             | None detected across all eight pages at 320, 375, 390, 768, 1024, 1280, and 1440px widths                                             |
| Production dependency audit | `npm audit --omit=dev`: 0 reported vulnerabilities                                                                                    |
| Homepage visual inspection  | Desktop and mobile screenshots reviewed                                                                                               |

Export tests verify unique metadata, canonical URLs, Open Graph and Twitter cards, single h1 headings, internal links, local assets, sitemap, robots, security header file, legal draft notices, and analytics disabled without a token.

Browser checks verify product navigation and email destinations, mobile menu navigation, Escape dismissal and focus return, reduced-motion content availability, page errors, responsive fit, and automated accessibility. These use the production export, not a development build.

The first accessibility run identified low contrast in the philosophy step numbers. Their color was corrected and all page checks passed afterward. The original Turbopack build could not bind its child-process port in the local sandbox; the project uses Next.js’s supported Webpack build option and successfully exports without an adapter.

## Selected-logo update

Integrated the exact symbol and wordmark from the user-supplied brand presentation in the header, footer, hero, favicon, Apple touch icon, and sharing image. Re-ran lint, TypeScript, production build, all 4 export tests, and browser checks (8 passed, 2 intentional project skips). Updated screenshots reflect the selected logo.

## Lighthouse mobile lab run (before selected-logo update)

`npm run test:performance` audits the exported homepage using Lighthouse’s default simulated mobile settings and a local Chromium instance. The full report is saved to `/tmp/nisimin-lighthouse.json` on each run. The recorded report for this handoff is `docs/lighthouse-report.json`.

| Category or metric       | Local result    |
| ------------------------ | --------------- |
| Performance              | 100             |
| Accessibility            | 100             |
| Best practices           | 100             |
| SEO                      | 100             |
| Largest Contentful Paint | 0.9 seconds     |
| Total Blocking Time      | 50 milliseconds |
| Cumulative Layout Shift  | 0.001           |

These are historical single-run localhost lab measurements from before the selected-logo asset update, not production guarantees. Performance has not been re-measured after that update. INP requires real interactions or field data and has not been measured; TBT is reported separately. The static test server does not reproduce Cloudflare cache headers, CDN latency, TLS, or the optional analytics beacon. Re-measure the deployed site and real-user Web Vitals after approval. Lighthouse still identifies opportunities around framework JavaScript, render-blocking styles, font dependencies, and cache lifetime despite the category scores.

## Known limitations and launch review

- Full development dependency audit reports seven moderate findings in a single transitive `minimatch` advisory chain under TypeScript ESLint. `npm audit fix` did not resolve it within the upstream compatible range. These lint dependencies are not included in the static website. Review an upstream patch before CI accepts untrusted repository content; no major transitive override was forced.
- Browser coverage uses desktop and mobile Chromium; Safari, Firefox, physical devices, and manual screen reader review remain unverified.
- Legal pages require founder and legal review. The selected logo is extracted from the user-supplied presentation. SVG containers embed raster artwork; an original vector source would improve large-format sharpness. Trademark status remains unverified.
- No Cloudflare analytics token was supplied. Analytics is disabled. The custom click-event bridge has no collection provider and does not report click metrics to Cloudflare Web Analytics.
- No site was deployed. No DNS or email records were changed. Actual domain, TLS, mail delivery, hosting behavior, and field performance remain to be verified after approved deployment.
