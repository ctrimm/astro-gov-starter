# astro-gov-starter

A production-ready [Astro](https://astro.build) starter template for government service websites.

**USWDS-native · Accessible by default · Privacy-respecting · Deploy anywhere**

---

## What's included

- **[USWDS 3.x](https://designsystem.digital.gov/)** — official U.S. Web Design System, no reimplementation
- **Section 508 / WCAG 2.1 AA defaults** — skip nav, landmarks, focus management, contrast
- **USA Banner + Identifier** — required gov components on every page
- **i18n routing** — English at `/`, Spanish at `/es/`
- **Zero client JS on content pages** — islands only where needed
- **CI quality gates** — a11y, Lighthouse, plain language, links, HTML, TS
- **Static output** — deploys to GitHub Pages, Cloud.gov Pages, Netlify, Vercel, S3

## Quick start

```bash
# Use as a GitHub template (recommended)
# Click "Use this template" on GitHub

# Or clone directly
git clone https://github.com/ctrimm/astro-gov-starter.git my-site
cd my-site
pnpm install   # also works with npm or yarn
pnpm dev
```

Your site will be at `http://localhost:4321`.

## First-time setup

`pnpm dev` and `pnpm build` automatically copy USWDS fonts, images, and JS
from `node_modules` to `public/uswds/`. You can also run this manually:

```bash
pnpm setup
```

## Configuration

Edit `src/config/site.ts` to set your agency name, domain, and required link URLs:

```ts
export const siteConfig = {
  name: 'Your Agency Name',
  domain: 'youragency.gov',
  // ...
};
```

## Project structure

```
src/
├── config/site.ts          # Agency name, domain, required links
├── i18n/                   # Translation files (en, es) + helper
├── components/uswds/       # USWDS pattern wrappers
├── layouts/BaseLayout.astro
├── pages/
│   ├── index.astro         # Homepage (English)
│   ├── 404.astro
│   └── es/index.astro      # Homepage (Spanish)
└── styles/
    ├── uswds.scss          # USWDS entry point
    └── globals.css         # Tailwind utilities + custom
```

## Deploy

### GitHub Pages

Push to `main`. The included `.github/workflows/deploy-pages.yml` workflow
deploys automatically. Enable Pages in repository Settings → Pages → Source: GitHub Actions.

### Cloud.gov Pages

```yaml
# .cloudgov/pages.yml
build:
  command: pnpm build
  destination: dist
```

### Netlify / Vercel

Both auto-detect Astro. Set build command to `pnpm build` and publish directory to `dist`.

### Any static host (S3, CloudFront, etc.)

```bash
pnpm build   # outputs to dist/
```
Upload `dist/` contents to your bucket/CDN.

## Quality gates

Run all checks locally:

```bash
bash scripts/check.sh
```

| Gate | Tool | Threshold |
|---|---|---|
| TypeScript | `astro check` | 0 errors |
| Accessibility | `@axe-core/cli` | 0 violations |
| Performance | Lighthouse CI | perf ≥ 90, a11y = 100 |
| Plain language | textstat | avg grade ≤ 8 |
| Links | lychee | 0 broken |
| HTML | html-validate | 0 errors |
| USWDS compliance | custom check | banner + identifier present |

Gates are wired in CI. M3 fully implements each gate; they're structured stubs today.

## Compliance

See [COMPLIANCE.md](./COMPLIANCE.md) for Section 508, WCAG 2.1 AA, 21st Century IDEA Act, and USWDS version details.

## Adding content

Content collections (services, announcements, FAQs, pages) are implemented in M2.
Until then, edit the seed data directly in the page files under `src/pages/`.

## License

Code: [MIT](./LICENSE)
Seed content: CC0 — no rights reserved, free to adapt for any agency.
