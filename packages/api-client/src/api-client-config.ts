import * as z from 'zod';

export const apiClientConfig = z.object({
  host: z.string().min(1),
  port: z
    .union([z.string(), z.number()])
    .pipe(z.coerce.number().gte(0).lte(65_535)),
  protocol: z.string().min(1),
  token: z.string().min(1),
});

export type APIClientConfigInput = z.input<typeof apiClientConfig>;

export type APIClientConfigOutput = z.output<typeof apiClientConfig>;
