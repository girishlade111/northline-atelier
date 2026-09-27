// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import devSourceViewer from './code-viewer.plugin.mjs';

// Site URL: override with SITE env var at build time
const SITE_URL = process.env.SITE ?? 'https://northlineatelier.example';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  output: 'static',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', fr: 'fr' },
      },
    }),
  ],
  vite: {
    // Dev-only source viewer at /__src (read-only). configureServer never
    // runs during `astro build`, so this has zero production footprint.
    plugins: [devSourceViewer()],
    server: {
      // Allow E2B preview proxy hosts (dev only; no effect on build)
      allowedHosts: ['.e2b.app'],
    },
  },
});
