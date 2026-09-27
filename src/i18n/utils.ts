import { site, type Locale } from '../config/site';

export function isLocale(value: string | undefined): value is Locale {
  return value === 'en' || value === 'fr';
}

/** Strip the locale prefix from a pathname: "/fr/foo" -> "/foo" (en default has no prefix). */
export function stripLocale(pathname: string): string {
  return pathname.replace(/^\/fr(?=\/|$)/, '') || '/';
}

/** Map the current path to the equivalent path in the target locale. */
export function getLocalizedPath(pathname: string, target: Locale): string {
  const bare = stripLocale(pathname);
  return target === 'fr' ? `/fr${bare === '/' ? '/' : bare}` : bare;
}

/** Canonical absolute URL for a locale root. */
export function localeHome(locale: Locale): string {
  const base = site.url.replace(/\/$/, '');
  return locale === 'fr' ? `${base}/fr/` : `${base}/`;
}

/** Opposite locale, for the switcher. */
export function otherLocale(locale: Locale): Locale {
  return locale === 'en' ? 'fr' : 'en';
}

/** Localised nav labels for the keys defined in site.nav. */
export const navLabels: Record<string, Record<Locale, string>> = {
  projects: { en: 'Projects', fr: 'Projets' },
  studio: { en: 'Studio', fr: 'Studio' },
  services: { en: 'Services', fr: 'Services' },
  contact: { en: 'Contact', fr: 'Contact' },
};
