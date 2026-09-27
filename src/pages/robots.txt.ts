import type { APIRoute } from 'astro';

// robots.txt generated at build time so the sitemap URL always
// matches the SITE env used for canonicals, sitemap and OG tags.
const site = (import.meta.env.SITE ?? 'https://northlineatelier.example').replace(/\/$/, '');

export const GET: APIRoute = () =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap-index.xml\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
