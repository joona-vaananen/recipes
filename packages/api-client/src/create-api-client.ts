import { APIClient } from './api-client';
import type { APIClientConfigInput } from './api-client-config';

export const createAPIClient = (config: APIClientConfigInput) =>
  new APIClient(config);
