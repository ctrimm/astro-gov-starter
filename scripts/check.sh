#!/usr/bin/env bash
# Run all quality gates locally. Mirrors .github/workflows/ci.yml.
# Usage: bash scripts/check.sh [--skip-build] [--verbose]

set -euo pipefail

SKIP_BUILD=false
VERBOSE=false
for arg in "$@"; do
  [[ "$arg" == "--skip-build" ]] && SKIP_BUILD=true
  [[ "$arg" == "--verbose" ]] && VERBOSE=true
done

VERBOSE_FLAG=""
[[ "$VERBOSE" == true ]] && VERBOSE_FLAG="--verbose"

echo "==> astro check (TypeScript)"
pnpm check

if [[ "$SKIP_BUILD" == false ]]; then
  echo "==> Building site"
  pnpm build
fi

echo ""
echo "==> Plain language check"
node scripts/plain-language.mjs $VERBOSE_FLAG

echo ""
echo "==> USWDS compliance check"
node scripts/compliance-check.mjs $VERBOSE_FLAG

echo ""
echo "==> HTML validation"
npx html-validate 'dist/**/*.html'

echo ""
echo "All local checks passed."
echo ""
echo "Note: Accessibility (axe-core) and Lighthouse CI require a running"
echo "browser and are only run in GitHub Actions. To test locally:"
echo "  pnpm preview  then  npx @axe-core/cli http://localhost:4321/"
