# Releasing

This starter is versioned so that anyone can pin a copy to a known-good
combination of Astro, Node, and USWDS. Every release is a git tag, a GitHub
Release, and a CHANGELOG entry that all agree with each other.

## What the version numbers promise

Full definitions live at the top of [CHANGELOG.md](./CHANGELOG.md). In short:

- **Major** — the Astro major version changed, the minimum Node version rose, or
  existing component markup/props/config changed in a way that needs edits in a
  project already built on this starter.
- **Minor** — new components, pages, collections, CI gates, or config options,
  with existing code untouched.
- **Patch** — fixes and dependency bumps within the same Astro major.

**One major release line per Astro major version.** When Astro ships a new
major, this starter ships a new major — even if nothing else changed. That is
the whole point: `v2.x` means Astro 7, and someone who needs Astro 6 can clone
`v1.x` and get a tree that actually builds.

The compatibility table in [README.md](./README.md#pick-a-release) must be
updated in the same commit as any major release.

## Cutting a release

Releases are cut from `main`, in two steps.

### 1. Land the release commit

On a branch, then merged to `main` through a PR:

- Bump `version` in `package.json`.
- In `CHANGELOG.md`, rename the `## [Unreleased]` section to
  `## [X.Y.Z] - YYYY-MM-DD` and add a fresh empty `## [Unreleased]` above it.
- Update the link reference definitions at the bottom of `CHANGELOG.md`.
- For a **major** release, also update the README compatibility table and the
  Astro version in the README's opening line.
- Run `pnpm ci:check` and make sure CI is green.

### 2. Push the tag

```bash
git checkout main && git pull
git tag v2.0.0
git push origin v2.0.0
```

Pushing a `v*.*.*` tag triggers [`.github/workflows/release.yml`](./.github/workflows/release.yml),
which:

1. **Verifies the tag matches `package.json`** and fails loudly if not, so a
   release can never claim a version the tree does not contain.
2. **Extracts the release notes** from the matching `CHANGELOG.md` section via
   `scripts/changelog-section.mjs`, so the notes on the Releases page are the
   notes committed to the repo — there is no second copy to keep in sync.
3. **Runs `astro check` and a full build** on the tagged commit. A release is a
   "use this exact commit" promise; it is proven before it is published.
4. **Publishes the GitHub Release** with a `.tar.gz` of the tagged source.

A tag containing a hyphen (`v2.1.0-rc.1`) is published as a prerelease.

To preview the notes a tag would publish:

```bash
node scripts/changelog-section.mjs 2.0.0
```

## Writing release notes

The CHANGELOG section *is* the release notes, so write it for someone deciding
whether to adopt this release, not for someone reading the diff.

Every release section starts with the two facts a reader of this template needs
before anything else:

```markdown
## [2.0.0] - 2026-08-22

Targets **Astro 7**. Requires **Node.js 22.12 or newer**.
```

Then, as applicable, `### Added`, `### Changed`, `### Fixed`, `### Removed`,
`### Security` — the [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
sections.

Additionally:

- **Every major release needs an `### Upgrading from N-1.x` section.** This is
  a template, not a dependency: adopters merge changes into their own fork, so
  spell out what they have to change in their copy, with diffs. If a change is
  silent — no error, just different output — say so explicitly and say how to
  detect it.
- **Say what did *not* change.** "No components, pages, routes, props, or
  content collection schemas changed" tells a reader more about their upgrade
  risk than a list of version bumps does.
- **Name concrete versions**, not "latest" — `Astro 6.1.7 → 7.2.4`.
- **Explain pins.** If a dependency is deliberately held back, say why, so the
  next person does not "fix" it.
- **Carry known issues forward.** A `### Known issues` section that survives
  across releases is better than an issue rediscovered by every adopter.

## Backporting to an older line

Older major lines get fixes only. Branch from the tag, fix, tag a patch:

```bash
git checkout -b release/1.x v1.0.0
# ... fix, bump package.json to 1.0.1, add a CHANGELOG section ...
git tag v1.0.1 && git push origin v1.0.1
```

The release workflow runs on any `v*` tag, so a backport publishes the same way.
