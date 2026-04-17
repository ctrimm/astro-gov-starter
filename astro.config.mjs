import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'url';
import { resolve } from 'path';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  // site + base are read from env vars so the same build config works for
  // local dev (base '/'), GitHub Pages subpath (base '/repo-name'), and
  // custom domains (base '/'). Set these in your deploy workflow.
  site: process.env.SITE || 'http://localhost:4321',
  // Ensure BASE_URL always ends with / so ${base}asset paths join correctly
  base: (process.env.BASE_PATH || '/').replace(/\/?$/, '/'),

  integrations: [mdx()],

  output: 'static',

  // i18n: English at /, Spanish at /es/
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  vite: {
    plugins: [tailwindcss()],
    css: {
      preprocessorOptions: {
        scss: {
          // Allow @use "uswds-core" and @use "uswds" without full paths
          loadPaths: [resolve(__dirname, 'node_modules/@uswds/uswds/packages')],
          // Suppress deprecation warnings from USWDS internals
          quietDeps: true,
          silenceDeprecations: ['legacy-js-api', 'import'],
        },
      },
    },
  },
});
