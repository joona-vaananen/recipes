import { MeiliSearch } from 'meilisearch';
import * as z from 'zod';

const httpClient = async (
  input: RequestInfo | URL,
  init?: RequestInit | undefined
) => {
  const response = await fetch(input, init);

  return response.json();
};

const meiliSearchConfigSchema = z
  .object({
    host: z.string().min(1),
    masterKey: z.string().min(1),
    port: z
      .union([z.string(), z.number()])
      .pipe(z.coerce.number().gte(0).lte(65_535)),
    protocol: z.string().min(1),
  })
  .transform(({ host, masterKey, port, protocol }) => ({
    apiKey: masterKey,
    host: `${protocol}://${host}:${port}`,
    httpClient,
  }));

const config = meiliSearchConfigSchema.parse({
  host: process.env.SEARCH_HOST,
  masterKey: process.env.SEARCH_MASTER_KEY,
  port: process.env.SEARCH_PORT,
  protocol: process.env.SEARCH_PROTOCOL,
});

export const searchClient = new MeiliSearch(config);
