import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      category: z.enum(['residential', 'hospitality', 'commercial']),
      location: z.object({ en: z.string(), fr: z.string() }),
      image: image(),
      order: z.number(),
      featured: z.boolean().default(false),
      alt: z.object({ en: z.string(), fr: z.string() }).optional(),
    }),
});

export const collections = { projects };
