# astro-gov-starter

> A production-ready [Astro 6](https://astro.build) starter template for government service websites.

[![CI](https://github.com/ctrimm/astro-gov-starter/actions/workflows/ci.yml/badge.svg)](https://github.com/ctrimm/astro-gov-starter/actions/workflows/ci.yml)
[![USWDS 3.x](https://img.shields.io/badge/USWDS-3.x-0050d8)](https://designsystem.digital.gov/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)

**USWDS-native · Section 508 / WCAG 2.1 AA · i18n (en + es) · Zero client JS · Deploy anywhere**

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
| **i18n** | English (`/`) and Spanish (`/es/`) with Astro's built-in routing |
| **Content collections** | Services, announcements, FAQs, pages — Zod-typed, MDX-ready |
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
  domain: 'dhs.state.gov',
  url: 'https://dhs.state.gov',
  description: 'Programs and services for eligible residents.',
  identifierLinks: {
    about: 'https://dhs.state.gov/about/',
    accessibility: 'https://dhs.state.gov/accessibility/',
    foia: 'https://www.foia.gov/',
    noFear: 'https://www.opm.gov/about-us/no-fear-act/',
    inspector: 'https://dhs.state.gov/inspector-general/',
    performance: 'https://dhs.state.gov/performance/',
    privacy: 'https://dhs.state.gov/privacy/',
  },
};
```

---

## Project structure

```
src/
├── config/site.ts              # Agency name, domain, identifier links ← edit this first
├── content/                    # Markdown content (services, faqs, announcements, pages)
├── components/uswds/           # 20 USWDS pattern wrappers (Alert, Accordion, Hero, …)
├── i18n/                       # Translation strings (en, es) + useTranslations helper
├── layouts/                    # BaseLayout, ServiceLayout, ApplyLayout
├── pages/                      # Route files — English at /, Spanish at /es/
│   └── internal/components/    # Dev-only component preview (not linked publicly)
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

## Compliance

See [COMPLIANCE.md](./COMPLIANCE.md) for Section 508, WCAG 2.1 AA, 21st Century IDEA Act,
and USWDS version details.

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

Code: [MIT](./LICENSE)  
Seed content: CC0 — no rights reserved, free to adapt for any agency.
