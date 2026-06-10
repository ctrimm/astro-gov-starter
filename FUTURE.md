# Future improvements

Items identified during a full template review (June 2026) that were
deliberately deferred. They are ordered roughly by impact. None of them block
using the template today — all quality gates pass — but each one removes a
class of future bugs or unlocks functionality the scaffolding only hints at.

## 1. Consolidate the English/Spanish page duplication

**Problem:** `src/pages/es/` hand-mirrors `src/pages/`. Every structural change
to an English page must be manually replicated in Spanish, which is exactly how
the two trees drifted apart before the June 2026 parity fixes (missing form
fields, missing sections).

**Direction:** Extract the shared structure of each page pair into a component
that takes `locale` (e.g. `<ContactPage locale={...} />`, `<AboutPage … />`,
`<HelpPage … />`), leaving the route files as thin wrappers. Alternatively,
adopt Astro's `[locale]` dynamic routing with `getStaticPaths()` over the
locale list so one file serves both languages. Either approach makes parity
structural instead of disciplinary.

**Scope:** touches every route file; do it as its own PR with visual diffing.

## 2. Single source of truth for the locale set

**Problem:** Adding a third language currently requires touching at least five
places that each hardcode the `en`/`es` pair:

- `LOCALES` in `astro.config.mjs` (now the intended source of truth)
- the `Locale` type and `translations` map in `src/i18n/utils.ts`
- the hreflang/`og:locale` logic in `src/layouts/BaseLayout.astro`
- `localizeUrl()` (hardcodes the `/es` prefix)
- default footer columns and language toggle in `Footer.astro` / `Header.astro`

**Direction:** Move the locale list (and its OG/hreflang metadata) into a
shared module (e.g. `src/i18n/locales.ts`) imported by both `astro.config.mjs`
and the runtime code; derive the `Locale` type from it
(`type Locale = keyof typeof LOCALES`). Generate hreflang links by mapping over
the list instead of writing one `<link>` per language. Consider Astro's
`Astro.currentLocale` to stop threading `locale` props by hand.

## 3. Unify the site-origin configuration

**Problem:** Absolute URLs (canonical, hreflang, og:url) are built from
`siteConfig.domain` in `src/config/site.ts`, while the build also receives a
`SITE` env var (exposed as `Astro.site`) from the deploy workflow. Two sources
of truth that can disagree — a deploy to a staging domain still emits
`https://agency.gov/...` canonicals.

**Direction:** Prefer `Astro.site` when set and fall back to
`siteConfig.domain`, or validate at build time that they agree. Update
`init-agency.mjs` to set both from one answer.

## 4. Wire the form and search backends (M3)

All interactive endpoints are accessible scaffolding with no backend:

- **Contact form** (`/contact/`, `/es/contact/`) — `action="#"`, see the
  `TODO (M3)` comments. Options: Formspree, API Gateway + Lambda, agency CRM.
- **Apply flow** (`/apply/[program]`) — posts to `/apply/check-eligibility`,
  which does not exist. The M3 plan is client-side islands with preserved
  state per step, plus a real eligibility endpoint.
- **Search** (`Search` component on the help pages) — submits to `/search` /
  `/es/search`, which do not exist. For a static site,
  [Pagefind](https://pagefind.app/) is the natural fit: it indexes `dist/` at
  build time, needs no server, and supports multilingual indexes.

## 5. Translated content collections

The Spanish routes reuse the English markdown bodies from
`src/content/services/` and `src/content/faqs/` (the schema has `esSlug` /
`esQuestion` hooks, but no Spanish bodies exist). Decide on a convention —
e.g. `src/content/services/es/snap.md` or per-locale frontmatter — and render
the localized body on `/es/` routes with the English version as an explicit,
labeled fallback.

## 6. Security headers on the chosen production host

`public/_headers` (clickjacking, MIME-sniffing, referrer policy, HSTS) only
takes effect on Netlify/Cloudflare Pages; GitHub Pages ignores it (documented
in README.md and SECURITY.md). Before production launch, either deploy to a
host that supports response headers or front Pages with a CDN that adds them.
Once on HTTPS-stable infrastructure, enable the HSTS line (start with a short
`max-age`).

## 7. CI scaling knobs

Current settings favor coverage over speed; revisit if CI time becomes a
problem:

- The axe-core job tests every built page sequentially in one browser
  session. If the page count grows substantially, shard the URL list across
  parallel jobs or switch to `--crawl`.
- Lighthouse runs 3× per page against the full `dist/`. Scope it to a
  representative URL subset (`lighthouserc.json` → `collect.url`) if the
  matrix gets slow.
- The `/internal/` component preview is excluded from html-validate and
  axe (it intentionally renders components out of document context, e.g.
  multiple `<h1>` Heroes). If a per-component test harness is ever added,
  test components there instead.

## 8. Smaller cleanups

- **Analytics:** the CSP comments in `astro.config.mjs` explain how to allow
  DAP (`dap.digitalgov.gov`); consider a first-class, documented opt-in.
- **Placeholder content:** the office address, Google Maps link, and TTY
  number in the contact/help pages are sample values; `init-agency.mjs`
  could prompt for them alongside the agency name and domain.
- **README/SECURITY.md overlap:** the GitHub Pages header warning appears in
  both; if it changes, change both (or link one to the other).
- **`localizeUrl()` adoption:** several pages still build `/es/...` URLs with
  string templates instead of calling `localizeUrl()`.
