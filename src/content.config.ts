import { defineCollection, z } from 'astro:content';

// ── Services ──────────────────────────────────────────────────────────────────
// Programs the agency offers (SNAP, Medicaid, WIC, etc.)
const services = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    shortTitle: z.string().optional(),
    description: z.string(),
    // Used for card/index display
    summary: z.string(),
    // URL slug for /apply/[program]/
    applySlug: z.string().optional(),
    // Eligibility quick facts shown in the sidebar
    eligibility: z.array(
      z.object({
        label: z.string(),
        value: z.string(),
      })
    ).default([]),
    // Related service slugs for cross-links
    related: z.array(z.string()).default([]),
    // Benefits amounts, deadlines, key numbers
    keyFacts: z.array(
      z.object({
        label: z.string(),
        value: z.string(),
      })
    ).default([]),
    // Whether the service is actively accepting applications
    acceptingApplications: z.boolean().default(true),
    // Sort order on /services/ index
    order: z.number().default(0),
    draft: z.boolean().default(false),
    // i18n: slug of the Spanish-language version
    esSlug: z.string().optional(),
    pubDate: z.coerce.date().optional(),
    updatedDate: z.coerce.date().optional(),
  }),
});

// ── Announcements ─────────────────────────────────────────────────────────────
// Time-bound notices displayed on the homepage banner
const announcements = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    // ISO date strings; banner auto-hides after endDate
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    severity: z.enum(['info', 'warning', 'error', 'success']).default('info'),
    // Optional CTA link
    linkText: z.string().optional(),
    linkUrl: z.string().optional(),
    // Show on the Spanish homepage as well?
    showInEs: z.boolean().default(true),
    draft: z.boolean().default(false),
  }),
});

// ── FAQs ──────────────────────────────────────────────────────────────────────
// Q&A pairs shown on /help/ and optionally on service pages
const faqs = defineCollection({
  type: 'content',
  schema: z.object({
    question: z.string(),
    // Tags match service slugs for per-service FAQ display
    tags: z.array(z.string()).default([]),
    order: z.number().default(0),
    draft: z.boolean().default(false),
    // Spanish question text (body is the answer in the MDX)
    esQuestion: z.string().optional(),
  }),
});

// ── Pages ─────────────────────────────────────────────────────────────────────
// Static content pages (accessibility, privacy, contact, etc.)
const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    // Displayed in breadcrumbs
    shortTitle: z.string().optional(),
    // noindex for internal pages like component preview
    noindex: z.boolean().default(false),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { services, announcements, faqs, pages };
