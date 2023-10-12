import { createAPIClient } from '@recipes/api-client';

export const apiClient = createAPIClient({
  host: process.env.API_HOST!,
  port: process.env.API_PORT!,
  protocol: process.env.API_PROTOCOL!,
  token: process.env.API_TOKEN!,
});
