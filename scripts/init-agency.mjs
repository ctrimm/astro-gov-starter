#!/usr/bin/env node
/**
 * Agency initialization wizard.
 * Run once after cloning the template to configure your agency's site.
 *
 * Usage: node scripts/init-agency.mjs
 *   Or:  pnpm init-agency
 */

import { createInterface } from 'readline';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const ROOT = process.cwd();

// ─── Prompt helper ────────────────────────────────────────────────────────────

const rl = createInterface({ input: process.stdin, output: process.stdout });

function ask(question, defaultValue = '') {
  const hint = defaultValue ? ` [${defaultValue}]` : '';
  return new Promise((resolve) => {
    rl.question(`${question}${hint}: `, (answer) => {
      resolve(answer.trim() || defaultValue);
    });
  });
}

function confirm(question, defaultYes = true) {
  const hint = defaultYes ? '[Y/n]' : '[y/N]';
  return new Promise((resolve) => {
    rl.question(`${question} ${hint}: `, (answer) => {
      const a = answer.trim().toLowerCase();
      if (!a) resolve(defaultYes);
      else resolve(a === 'y' || a === 'yes');
    });
  });
}

// ─── Main ─────────────────────────────────────────────────────────────────────

console.log('');
console.log('╔══════════════════════════════════════════════════════╗');
console.log('║   astro-gov-starter — Agency Setup Wizard           ║');
console.log('╚══════════════════════════════════════════════════════╝');
console.log('');
console.log('This wizard updates src/config/site.ts with your agency');
console.log('information. You can re-run it any time to make changes.');
console.log('');

// ─── Gather inputs ────────────────────────────────────────────────────────────

const agencyName = await ask('Agency / site name', 'My Agency');
const domain = await ask('Agency domain (no https://)', 'myagency.gov');
const siteUrl = await ask('Full site URL', `https://${domain}`);
const description = await ask(
  'Site description (meta description)',
  `${agencyName} — programs and services for eligible residents.`
);

console.log('');
console.log('── Required USA Identifier links (leave blank to keep placeholder) ──');
const aboutUrl = await ask('About URL', `https://${domain}/about/`);
const accessibilityUrl = await ask('Accessibility statement URL', `https://${domain}/accessibility/`);
const foia = await ask('FOIA URL', 'https://www.foia.gov/');
const noFear = await ask('No FEAR Act URL', 'https://www.opm.gov/about-us/no-fear-act/');
const inspector = await ask('Inspector General URL', `https://${domain}/inspector-general/`);
const performance = await ask('Performance reports URL', `https://${domain}/performance/`);
const privacy = await ask('Privacy policy URL', `https://${domain}/privacy/`);

console.log('');
const wantEs = await confirm('Enable Spanish (es) locale?', true);

// ─── Write site.ts ────────────────────────────────────────────────────────────

const siteConfigPath = join(ROOT, 'src/config/site.ts');
const newConfig = `export const siteConfig = {
  name: ${JSON.stringify(agencyName)},
  domain: ${JSON.stringify(domain)},
  url: ${JSON.stringify(siteUrl)},
  description: ${JSON.stringify(description)},

  // Required USA Identifier links — all federal executive branch agencies must
  // include these links on every page. See:
  // https://designsystem.digital.gov/components/identifier/
  identifierLinks: {
    about: ${JSON.stringify(aboutUrl)},
    accessibility: ${JSON.stringify(accessibilityUrl)},
    foia: ${JSON.stringify(foia)},
    noFear: ${JSON.stringify(noFear)},
    inspector: ${JSON.stringify(inspector)},
    performance: ${JSON.stringify(performance)},
    privacy: ${JSON.stringify(privacy)},
  },

  locales: ${wantEs ? "['en', 'es']" : "['en']"},
};
`;

writeFileSync(siteConfigPath, newConfig, 'utf-8');

// ─── Update astro.config.mjs if Spanish was disabled ─────────────────────────

if (!wantEs) {
  const configPath = join(ROOT, 'astro.config.mjs');
  let configContent = readFileSync(configPath, 'utf-8');
  configContent = configContent.replace(
    /locales:\s*\[['"]en['"],\s*['"]es['"]\]/,
    "locales: ['en']"
  );
  writeFileSync(configPath, configContent, 'utf-8');
  console.log('');
  console.log('Note: Spanish locale disabled. You can remove src/pages/es/ if');
  console.log('you do not plan to add it back.');
}

// ─── Summary ─────────────────────────────────────────────────────────────────

console.log('');
console.log('✓ src/config/site.ts updated');
console.log('');
console.log('Next steps:');
console.log('  1. pnpm dev            — start the local dev server');
console.log('  2. Edit src/content/   — replace seed content with your programs');
console.log('  3. pnpm build          — verify the build passes');
console.log('  4. bash scripts/check.sh — run all quality gates');
console.log('');

rl.close();
