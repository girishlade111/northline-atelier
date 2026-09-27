/**
 * Northline Atelier — single rebrand file.
 * Change everything brand-related here; the whole site updates.
 */
export const site = {
  name: 'NORTHLINE',
  subName: 'ATELIER',
  tagline: 'Spaces. Crafted with intention.',
  url: import.meta.env.SITE ?? 'https://northlineatelier.example',
  address: {
    line1: '28 King Street, Studio 502',
    line2: 'Copenhagen, Denmark 1264',
  },
  email: 'hello@northlineatelier.com',
  phone: '+45 31 96 12 84',
  phoneHref: 'tel:+4531961284',
  socials: [
    { label: 'Instagram', href: 'https://instagram.com/' },
    { label: 'LinkedIn', href: 'https://linkedin.com/' },
    { label: 'Pinterest', href: 'https://pinterest.com/' },
  ],
  nav: [
    { label: 'projects', href: '#projects' },
    { label: 'studio', href: '#studio' },
    { label: 'services', href: '#services' },
    { label: 'contact', href: '#contact' },
  ],
  locales: ['en', 'fr'] as const,
} as const;

export type Locale = (typeof site.locales)[number];
