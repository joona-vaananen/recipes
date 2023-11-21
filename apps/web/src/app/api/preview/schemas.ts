import * as z from 'zod';

import { TOKEN } from '@/constants';
import { locales } from '@recipes/ui';

export const paramsSchema = z.object({
  slug: z.string().min(1),
});

const PUBLICATION_STATES = ['live', 'preview'] as const;

export type PublicationState = (typeof PUBLICATION_STATES)[number];

export const searchParamsSchema = z.object({
  locale: z.enum(locales),
  publicationState: z.enum(PUBLICATION_STATES),
  secret: z.literal(TOKEN),
});
