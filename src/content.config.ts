import { defineCollection, z } from 'astro:content';

// Stub definitions for M1 — Zod schemas will be fully defined in M2.
// These prevent the "auto-generating collections" deprecation warning.

const services = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
  }),
});

const announcements = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    body: z.string().optional(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    severity: z.enum(['info', 'warning', 'error', 'success']).default('info'),
  }),
});

const faqs = defineCollection({
  type: 'content',
  schema: z.object({
    question: z.string(),
    tags: z.array(z.string()).default([]),
    order: z.number().default(0),
  }),
});

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    updatedDate: z.coerce.date().optional(),
  }),
});

export const collections = { services, announcements, faqs, pages };
