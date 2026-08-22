# Changelog

All notable changes to this starter are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## What the version numbers mean

This is a **template you copy**, not a package you install, so semver is applied
to the contract a template can actually keep: what you have to change in *your*
copy to move to a newer release.

| Bump | Means | Example |
|---|---|---|
| **Major** | The Astro major version changed, the minimum Node version rose, or an existing component's markup, props, or config changed in a way that needs edits in a project already built on this starter. | Astro 6 → Astro 7 |
| **Minor** | New components, pages, content collections, CI gates, or config options. Existing code keeps working untouched. | Adding a new USWDS component wrapper |
| **Patch** | Fixes and dependency bumps within the same Astro major — accessibility fixes, copy corrections, CI repairs, USWDS patch releases. | USWDS 3.13 → 3.14 |

**Each major release line targets exactly one Astro major version.** Pin the
release that matches the Astro version you want to build on — see the
compatibility table in [README.md](./README.md#pick-a-release). Because this is
a template, upgrading means merging changes into your own fork rather than
bumping a dependency; the "Upgrading" notes in each major release tell you what
to look for.

---

## [Unreleased]

The `1.x` line targets Astro 6 and receives fixes only. New work happens on
`main`, which targets the current Astro major — see
[the releases page](https://github.com/ctrimm/astro-gov-starter/releases).

---

## [1.0.0] - 2026-08-22

Targets **Astro 6**. Requires **Node.js 18.17.1 or newer**.

First tagged release. This marks the starter as stable and establishes the
versioning contract described above; it is the last release on the Astro 6
line and receives fixes only.

### Added

- **USWDS 3.x design system** wired through SCSS, with assets copied from
  `node_modules` to `public/uswds/` by `scripts/setup-uswds.mjs` — no
  reimplemented components.
- **20 Astro component wrappers** for USWDS patterns: Accordion, Alert,
  Breadcrumb, CallToAction, Footer, Header, Hero, IconList, LanguageSelector,
  Pagination, ProcessList, Search, ServiceCard, SideNav, SiteAlert,
  StepIndicator, SummaryBox, Table, Tag, USABanner, USAIdentifier.
- **Required federal elements on every page**: the USA Banner
  ("An official website of the United States government") and the USA
  Identifier with its seven required links.
- **Bilingual routing.** English at `/` and Spanish at `/es/`, served from one
  `[...lang]` route file per page rather than duplicated page trees.
- **Content collections** for services, announcements, and FAQs, Zod-typed and
  MDX-ready.
- **Static search** via Pagefind at `/search/`, self-hosted and language-aware.
- **Type-safe environment variables** through `astro:env`, so the same build
  config works for local dev, a GitHub Pages subpath, and a custom domain.
- **Content Security Policy** generated at build time, with Astro hashing the
  inline scripts and styles it emits so `unsafe-inline` is not required.
- **Seven CI quality gates**: TypeScript, HTML validation, axe-core
  accessibility, Lighthouse, link checking, plain language (Flesch-Kincaid
  grade ≤ 8), and USWDS compliance. `pnpm ci:check` runs the non-browser gates
  locally.
- **Agency setup wizard** (`node scripts/init-agency.mjs`) to configure agency
  name, domain, and identifier links in one pass.
- **GitHub Pages deploy workflow**, plus a `public/_headers` example for hosts
  that support response headers.

[Unreleased]: https://github.com/ctrimm/astro-gov-starter/compare/v1.0.0...release/1.x
[1.0.0]: https://github.com/ctrimm/astro-gov-starter/releases/tag/v1.0.0
