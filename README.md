# NISIMIN

The official corporate website foundation for **NISIMIN**, an emerging independent technology product brand. Built with Next.js App Router, strict TypeScript, Tailwind CSS, Motion, Lucide, and self-hosted Manrope.

## Local development

Use Node 22 LTS and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. `npm run build` generates a portable static site in `out/`. Preview the built output with `npm start` at http://127.0.0.1:4173. This uses a local static server rather than a Next.js runtime.

## Checks

```sh
npm run lint
npm run typecheck
npm run build
npm test
npx playwright install chromium
npm run test:browser
npm run test:performance
```

Export checks require the production build. Browser checks serve that same export and cover all eight pages at desktop and mobile sizes, WCAG A/AA checks using axe, client errors, horizontal overflow, product navigation, email destinations, mobile menu keyboard dismissal, and reduced motion. Automated checks do not replace manual keyboard, screen reader, or real-device review.

## Visual review

- [Desktop homepage](docs/screenshots/home-desktop.png)
- [Mobile homepage](docs/screenshots/home-mobile.png)
- [Selected NISIMIN logo](public/brand/nisimin-logo.svg)

## Architecture

- `app/`: static routes, root layout, design tokens, sitemap, robots, and 404.
- `components/`: navigation, logo, editorial/product sections, footer, motion, optional analytics bridge.
- `lib/site.ts`: site information, product summaries, metadata helper.
- `public/brand/`: selected logo artwork and sharing graphics.
- `tests/`: production-export and Playwright checks.
- `docs/brand.md`: selected brand identity and asset guidance.
- `docs/cloudflare.md`: deployment settings, domain/DNS instructions, analytics limits.
- `docs/qa.md`: verification results and remaining launch requirements.

Routes: `/`, `/products/`, `/products/playtown/`, `/products/edunisi/`, `/about/`, `/contact/`, `/privacy/`, `/terms/`.

Static content uses React Server Components. Client components are limited to mobile navigation, small motion reveals, and the optional analytics event bridge. No API, database, contact form, or user storage is required. Buttons navigate to real pages or open an email enquiry. Product graphics are abstract brand illustrations, not fictional interfaces.

## Configuration and publication

Official canonical origin: `https://nisimin.com`. Copy `.env.example` to `.env.local` only if configuring optional analytics. No analytics token was provided. Cloudflare Web Analytics tracks page views when enabled; custom CTA events have no external destination configured. See the runbook for details.

The legal pages are clearly marked **drafts requiring review**. The site uses the **user-selected logo from the supplied brand presentation**; trademark status remains unverified. The repository includes no deployment automation. Deployment and live DNS changes require explicit approval; preserve all existing email records, especially Resend’s `mail.nisimin.com` records.
