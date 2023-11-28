import { MeiliSearch } from 'meilisearch';
import * as z from 'zod';

import { IS_PRODUCTION } from '@/constants';

const httpClient = async (
  input: RequestInfo | URL,
  init?: RequestInit | undefined
) => {
  const response = await fetch(input, init);
  const data = await response.json();

  if ('message' in data) {
    if (IS_PRODUCTION) {
      console.error(data.message);
    } else {
      throw new Error(JSON.stringify(data, null, 2));
    }
  }

  return data;
};

const meiliSearchConfigSchema = z
  .object({
    host: z.string().min(1),
    apiKey: z.string().min(1),
    port: z
      .union([z.string(), z.number()])
      .pipe(z.coerce.number().gte(0).lte(65_535)),
    protocol: z.string().min(1),
  })
  .transform(({ host, apiKey, port, protocol }) => ({
    apiKey: apiKey,
    host: `${protocol}://${host}:${port}`,
    httpClient,
  }));

const config = meiliSearchConfigSchema.parse({
  host: process.env.SEARCH_HOST,
  apiKey: process.env.SEARCH_API_KEY,
  port: process.env.SEARCH_PORT,
  protocol: process.env.SEARCH_PROTOCOL,
});

export const searchClient = new MeiliSearch(config);
