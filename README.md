# astro-gov-starter

> A production-ready [Astro 6](https://astro.build) starter template for government service websites.

[![CI](https://github.com/ctrimm/astro-gov-starter/actions/workflows/ci.yml/badge.svg)](https://github.com/ctrimm/astro-gov-starter/actions/workflows/ci.yml)
[![USWDS 3.x](https://img.shields.io/badge/USWDS-3.x-0050d8)](https://designsystem.digital.gov/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)

**USWDS-native · Section 508 / WCAG 2.1 AA · i18n (en + es) · Zero client JS · Deploy anywhere**

---

<img width="2619" height="2157" alt="pretty_snap_2026_3_18_6_15" src="https://github.com/user-attachments/assets/f7c5085c-6fe2-4aac-9f37-a3eda91f597d" />

---

## Use this template

Click **"Use this template"** on GitHub to create your own repository, then run the setup wizard:

```bash
pnpm install
node scripts/init-agency.mjs   # configure your agency name, domain, and identifier links
pnpm dev
```

Your site will be at `http://localhost:4321`.

---

## What's included

| Category | Details |
|---|---|
| **Design system** | [USWDS 3.x](https://designsystem.digital.gov/) via SCSS — no reimplementation |
| **Accessibility** | Section 508 / WCAG 2.1 AA — skip nav, landmarks, focus management |
| **Required components** | USA Banner + USA Identifier on every page |
| **Component library** | 20 thin Astro wrappers for USWDS patterns |
| **i18n** | English (`/`) and Spanish (`/es/`) — one route file per page serves both locales |
| **Search** | [Pagefind](https://pagefind.app/) static search at `/search/` — self-hosted, language-aware |
| **Content collections** | Services, announcements, FAQs — Zod-typed, MDX-ready |
| **CI quality gates** | TypeScript, HTML, axe-core, Lighthouse, links, plain language, USWDS compliance |
| **Output** | Static — deploys to GitHub Pages, Cloud.gov Pages, Netlify, Vercel, S3 |

---

## Quick start (from template)

1. Click **Use this template** → **Create a new repository**
2. Clone your new repo and install:
   ```bash
   git clone https://github.com/YOUR-ORG/YOUR-REPO.git
   cd YOUR-REPO
   pnpm install
   ```
3. Run the agency setup wizard:
   ```bash
   node scripts/init-agency.mjs
   ```
   This updates `src/config/site.ts` with your agency name, domain, and the
   seven required [USA Identifier](https://designsystem.digital.gov/components/identifier/) links.
4. Replace seed content in `src/content/` with your programs and FAQs.
5. `pnpm dev` — live preview at `http://localhost:4321`
6. `pnpm build` — production build in `dist/`

---

## Configuration

All agency-specific settings live in one file:

```ts
// src/config/site.ts
export const siteConfig = {
  name: 'Department of Human Services',
  shortName: 'DHS',
  domain: 'dhs.state.gov',
  description: 'Programs and services for eligible residents.',
  locale: 'en-US',

  // Required links for the USA Identifier footer component
  links: {
    about: '/about/',
    accessibility: '/accessibility/',
    foia: 'https://www.foia.gov/',
    noFear: 'https://www.eeoc.gov/no-fear-act-data',
    oig: 'https://www.oversight.gov/',
    privacy: '/privacy/',
    budget: '/',
    usagov: 'https://www.usa.gov/',
  },
} as const;
```

---

## Project structure

```
src/
├── config/site.ts              # Agency name, domain, identifier links ← edit this first
├── content/                    # Markdown content (services, faqs, announcements)
├── components/uswds/           # 20 USWDS pattern wrappers (Alert, Accordion, Hero, …)
├── i18n/                       # Translation strings (en, es) + useTranslations helper
├── layouts/                    # BaseLayout, ServiceLayout, ApplyLayout
├── pages/
│   ├── [...lang]/              # One route file per page serves BOTH / and /es/
│   │   ├── index.astro         #   (locale comes from getStaticPaths via localeStaticPaths())
│   │   ├── services/           #   services index + [slug] detail pages
│   │   ├── apply/[program].astro
│   │   └── search.astro        #   Pagefind-powered site search
│   ├── 404.astro
│   └── internal/components.astro  # Dev-only component preview (not linked publicly)
└── styles/
    ├── uswds-theme.scss         # USWDS entry point (settings + full import)
    └── globals.css              # Tailwind utilities + custom CSS
scripts/
├── init-agency.mjs             # One-time agency setup wizard
├── setup-uswds.mjs             # Copies USWDS assets to public/uswds/
├── plain-language.mjs          # Flesch-Kincaid readability gate (avg grade ≤ 8)
├── compliance-check.mjs        # USWDS compliance check on built HTML
└── check.sh                    # Runs all local quality gates
```

---

## USWDS component library

All 20 components live in `src/components/uswds/`. Preview them at `/internal/components/` during local dev.

| Component | USWDS pattern |
|---|---|
| `Alert` / `SiteAlert` | [Alert](https://designsystem.digital.gov/components/alert/) |
| `Accordion` / `AccordionItem` | [Accordion](https://designsystem.digital.gov/components/accordion/) |
| `Breadcrumb` | [Breadcrumb](https://designsystem.digital.gov/components/breadcrumb/) |
| `CallToAction` | [Banner section pattern](https://designsystem.digital.gov/patterns/) |
| `Footer` | [Footer](https://designsystem.digital.gov/components/footer/) |
| `Header` | [Header](https://designsystem.digital.gov/components/header/) |
| `Hero` | [Hero](https://designsystem.digital.gov/components/hero/) |
| `Pagination` | [Pagination](https://designsystem.digital.gov/components/pagination/) |
| `ProcessList` / `ProcessListItem` | [Process list](https://designsystem.digital.gov/components/process-list/) |
| `Search` | [Search](https://designsystem.digital.gov/components/search/) |
| `ServiceCard` | [Card](https://designsystem.digital.gov/components/card/) |
| `SideNav` | [Side navigation](https://designsystem.digital.gov/components/side-navigation/) |
| `StepIndicator` | [Step indicator](https://designsystem.digital.gov/components/step-indicator/) |
| `SummaryBox` | [Summary box](https://designsystem.digital.gov/components/summary-box/) |
| `Tag` | [Tag](https://designsystem.digital.gov/components/tag/) |
| `USABanner` | [Banner](https://designsystem.digital.gov/components/banner/) |
| `USAIdentifier` | [Identifier](https://designsystem.digital.gov/components/identifier/) |

---

## Quality gates

Run all checks locally before pushing:

```bash
bash scripts/check.sh           # TypeScript + build + HTML + plain language + compliance
bash scripts/check.sh --verbose # same, with per-file output
```

| Gate | Tool | Threshold |
|---|---|---|
| TypeScript | `astro check` | 0 errors |
| HTML | `html-validate` | 0 errors |
| Accessibility | `@axe-core/cli` (CI only) | 0 violations |
| Lighthouse | `@lhci/cli` (CI only) | perf ≥ 90, a11y = 100, BP ≥ 90, SEO ≥ 90 |
| Links | `linkinator` (CI only) | 0 broken internal links |
| Plain language | `scripts/plain-language.mjs` | avg Flesch-Kincaid grade ≤ 8 |
| USWDS compliance | `scripts/compliance-check.mjs` | banner + identifier + skip nav present |

---

## Deploy

### GitHub Pages (included)

Push to `main`. The workflow in `.github/workflows/deploy-pages.yml` deploys automatically.
Enable Pages: **Settings → Pages → Source: GitHub Actions**.

> **⚠️ Security headers:** GitHub Pages does **not** support custom HTTP response
> headers, so the headers in `public/_headers` (clickjacking protection via
> `frame-ancestors`, `X-Frame-Options`, HSTS, etc.) are silently ignored on
> GitHub Pages. They only take effect on Netlify or Cloudflare Pages. If you need
> these protections — and production government sites should have them — deploy
> to a host that supports response headers, or put a CDN/reverse proxy (e.g.
> CloudFront) in front of Pages and set the headers there.

### Cloud.gov Pages

```yaml
# federalist.json
{
  "build": {
    "command": "pnpm install && pnpm build",
    "destination": "dist"
  }
}
```

### Netlify / Vercel

Both auto-detect Astro. Set **build command** to `pnpm build` and **publish directory** to `dist`.

### Any static host (S3, CloudFront, Azure Blob)

```bash
pnpm build   # outputs to dist/
```
Upload the contents of `dist/` to your bucket or CDN origin.

---

## Search

Site search is powered by [Pagefind](https://pagefind.app/). The `pnpm build`
script indexes `dist/` after the Astro build and writes the index to
`dist/pagefind/`. Results are served at `/search/` (English) and `/es/search/`
(Spanish) — Pagefind splits the index by each page's `<html lang>`, so each
locale searches its own content.

- Search only works on a **production build** (`pnpm build && pnpm preview`);
  the dev server has no index.
- The CSP includes `'wasm-unsafe-eval'` because Pagefind runs its index as
  same-origin WebAssembly (this does **not** allow JavaScript `eval()`).
- No third-party requests: the index and UI are self-hosted static files.

---

## Forms

The contact form (`/contact/`) and eligibility screeners (`/apply/*`) are
**accessible scaffolding only** — they do not submit anywhere out of the box.
Before launch, wire the `action` attributes to your backend of choice
(Formspree, API Gateway + Lambda, your agency's form service, etc.). Look for
the `TODO (M3)` comments in `src/pages/[...lang]/contact.astro` and
`src/pages/[...lang]/apply/[program].astro`.

---

## Adding a new language

The template ships with English (`/`) and Spanish (`/es/`). Every page lives
once in `src/pages/[...lang]/` and renders for each locale returned by
`localeStaticPaths()`, so there is no page tree to mirror. To add another
language (e.g. French):

1. Add `fr: 'fr-FR'` to `LOCALES` in `astro.config.mjs`
2. Add `'fr'` to the `Locale` type and `locales` array, and register
   `fr.json` in the `translations` map, in `src/i18n/utils.ts`
   (create `src/i18n/fr.json` by copying `en.json` and translating)
3. Add a `fr` entry to each page's `copy` object in
   `src/pages/[...lang]/*.astro` — TypeScript will point you at every one
4. Add translated fields to content collections as needed (see `esSlug` /
   `esQuestion` in `src/content.config.ts` for the pattern)
5. Add the locale to the hreflang/og:locale logic in
   `src/layouts/BaseLayout.astro` and the language toggle in the Header

---

## Compliance

See [COMPLIANCE.md](./COMPLIANCE.md) for Section 508, WCAG 2.1 AA, 21st Century IDEA Act,
and USWDS version details.

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

Code: [MIT](./LICENSE)  
Seed content: CC0 — no rights reserved, free to adapt for any agency.
