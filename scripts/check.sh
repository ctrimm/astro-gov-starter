#!/usr/bin/env bash
# Run all quality gates locally. Mirror of .github/workflows/ci.yml.
# Usage: bash scripts/check.sh [--skip-build]

set -euo pipefail

SKIP_BUILD=false
for arg in "$@"; do
  [[ "$arg" == "--skip-build" ]] && SKIP_BUILD=true
done

echo "==> astro check (TypeScript)"
pnpm check

if [[ "$SKIP_BUILD" == false ]]; then
  echo "==> Building site"
  pnpm build
fi

echo ""
echo "All local checks passed."
echo "Note: Full a11y, Lighthouse, and link checks require the built site."
echo "Run 'pnpm build && pnpm preview' then run axe-core and lychee manually."
