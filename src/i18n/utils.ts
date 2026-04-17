import en from './en.json';
import es from './es.json';

export type Locale = 'en' | 'es';

const translations = { en, es } as const;

export type TranslationKeys = typeof en;

export function useTranslations(locale: Locale) {
  return function t(key: string): string {
    const keys = key.split('.');
    let value: unknown = translations[locale];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        // Fall back to English if key not found in requested locale
        value = keys.reduce<unknown>((acc, k2) => {
          if (acc && typeof acc === 'object' && k2 in acc) {
            return (acc as Record<string, unknown>)[k2];
          }
          return undefined;
        }, translations.en);
        break;
      }
    }

    return typeof value === 'string' ? value : key;
  };
}

export function getLocaleFromUrl(url: URL): Locale {
  const [, first] = url.pathname.split('/');
  if (first === 'es') return 'es';
  return 'en';
}

export function withBase(path: string): string {
  if (!path || !path.startsWith('/')) return path;
  const base = import.meta.env.BASE_URL; // always ends with / (normalized in astro.config.mjs)
  return base + path.slice(1);
}

export function localizeUrl(path: string, locale: Locale): string {
  const localized = locale === 'en' ? path : `/es${path}`;
  return withBase(localized);
}
