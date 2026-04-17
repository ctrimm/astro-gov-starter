## Summary

<!-- What does this PR change? One or two sentences. -->

## Type of change

- [ ] Bug fix
- [ ] New USWDS component wrapper
- [ ] New page template
- [ ] CI / quality gate improvement
- [ ] Documentation
- [ ] Dependency update
- [ ] Other: ___

## Checklist

### Code quality
- [ ] `pnpm check` passes (TypeScript)
- [ ] `pnpm build` succeeds with 0 errors
- [ ] `node scripts/compliance-check.mjs` passes
- [ ] `node scripts/plain-language.mjs` passes (content changes only)
- [ ] `npx html-validate 'dist/**/*.html'` passes (if HTML was changed)

### Accessibility
- [ ] New UI elements have appropriate ARIA labels / roles
- [ ] Keyboard navigation works for any interactive elements
- [ ] Color contrast meets WCAG 2.1 AA (4.5:1 for normal text, 3:1 for large)
- [ ] Tested with a screen reader or axe browser extension

### USWDS compliance
- [ ] Uses USWDS classes / patterns — no reimplementation of existing components
- [ ] USA Banner and USA Identifier remain on every page
- [ ] Follows USWDS [component guidance](https://designsystem.digital.gov/components/)

### i18n
- [ ] English and Spanish pages updated in sync (if content changed)
- [ ] New translatable strings added to `src/i18n/translations/`

### Documentation
- [ ] README updated (if user-facing behavior changed)
- [ ] COMPLIANCE.md updated (if compliance posture changed)
- [ ] Inline comments added only where the WHY is non-obvious

## Related issues

Closes #
