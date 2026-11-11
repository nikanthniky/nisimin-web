# Cloudflare deployment runbook

Deployment and DNS changes require explicit approval. Nothing in this project deploys automatically.

## Supported approach

This project uses Next.js App Router with `output: 'export'`, `trailingSlash: true`, and static metadata routes. The build produces `out/`. It needs no runtime, database, adapter, or Worker binding. All pages are generated ahead of time. Dynamic functions, Server Actions, request-dependent APIs, and the default Next image optimizer are intentionally unnecessary here.

Verified against official guidance:

- https://nextjs.org/docs/app/guides/static-exports
- https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/
- https://developers.cloudflare.com/pages/configuration/custom-domains/
- https://developers.cloudflare.com/web-analytics/get-started/

Cloudflare’s static Next.js Pages guide applies directly. Full-stack Next.js guidance and adapters are not needed for this export.

## Before deployment

1. Confirm final brand assets and complete any required trademark review. The user-selected presentation artwork is already integrated.
2. Review and finalize privacy and terms with the responsible operator’s actual details and applicable law.
3. Confirm product descriptions and statuses. Configure analytics only if desired.
4. Run `npm ci`, `npm run lint`, `npm run typecheck`, `npm run build`, `npm test`, and `npm run test:browser`.
5. Review a preview deployment, including the production hostname, mobile layout, email links, canonical URLs, sharing image, and real-device performance.

## Cloudflare Pages build settings

After approval, connect this repository in Workers & Pages → Create → Pages → Connect to Git.

| Setting                | Value                                    |
| ---------------------- | ---------------------------------------- |
| Framework preset       | Next.js (Static HTML Export)             |
| Production branch      | Choose the approved production branch    |
| Root directory         | Repository root                          |
| Build command          | `npm run build`                          |
| Build output directory | `out`                                    |
| Node version           | `22` via `NODE_VERSION=22`               |
| Package manager        | npm, using committed `package-lock.json` |

Next.js 16 requires Node >=20.9; Node 22 is the documented project target. The local validation environment may use a newer Node version; see QA results. The build uses the supported Webpack flag because the local environment restricts Turbopack child-process ports. Fonts are self-hosted and require no remote font fetch during build.

Alternatively, after approval, upload `out/` through Cloudflare Pages Direct Upload. Choose Git integration if automated builds are desired; do not mix deployment modes without reviewing Cloudflare’s current project constraints.

`public/_headers` is copied to the output for Cloudflare Pages security headers. Next’s server-side `headers()` configuration is not used because there is no Next server.

## Domain and DNS

1. Inventory and export current DNS records before touching the zone.
2. Add `nisimin.com` as a custom domain in the Pages project first. Follow the exact target Cloudflare supplies; do not guess a Pages hostname.
3. The apex domain must be an active Cloudflare zone in the account. Review existing apex A/AAAA/CNAME website records before replacing anything. Keep the zone’s existing mail and verification records.
4. Optionally add `www.nisimin.com` and configure an approved redirect to `https://nisimin.com`. Canonical URLs use the apex HTTPS origin.
5. Wait for Pages domain verification and certificate activation. Verify HTTPS and redirects before announcing the site.
6. Verify the existing email service still works.

**Preserve all existing MX, SPF/TXT, DKIM, DMARC, and mail verification records. Do not modify Resend’s verified `mail.nisimin.com` records.** Domain connection must not replace the zone or bulk overwrite records. No repository script modifies DNS.

## Optional analytics

No token was supplied. Analytics remains off by default. To enable it, add `NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN` with the 32-character token from Cloudflare Web Analytics and rebuild. Do not also enable automatic beacon injection for the same site. The public token identifies the analytics property; it is not a secret credential.

Cloudflare Web Analytics supplies page views, including product page visits, and performance metrics. It does **not** provide a supported arbitrary custom-event API. Optional application events `nisimin:interaction` expose `{ name, path }` for product CTA and contact email clicks without personal information. These events are browser-local and are not persisted or transmitted unless a future approved analytics provider listens to them. Do not report click tracking as active with Web Analytics alone.

## After deployment

Check every route by opening its URL directly, `/404.html`, `/robots.txt`, `/sitemap.xml`, `/brand/social.png`, email links, and mobile navigation. Measure Lighthouse and real-user Web Vitals on the actual hosting setup. Targets are LCP <=2.5s, INP <=200ms, CLS <=0.1, performance >=90, accessibility >=95; they are targets, not guarantees.

For rollback, use Cloudflare Pages’ previous successful deployment. Keep DNS and email records untouched during application rollback.
