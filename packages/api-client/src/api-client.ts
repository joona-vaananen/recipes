import { stringify } from 'qs';

import type { HomePage } from '@recipes/api/src/api/home-page/content-types/home-page/home-page';
import type { Page } from '@recipes/api/src/api/page/content-types/page/page';
import type { RecipeSearchPage } from '@recipes/api/src/api/recipe-search-page/content-types/recipe-search-page/recipe-search-page';
import type { Recipe } from '@recipes/api/src/api/recipe/content-types/recipe/recipe';
import {
  apiClientConfigSchema,
  type APIClientConfigInput,
  type APIClientConfigOutput,
} from './api-client-config';

export type APIClientInstance = InstanceType<typeof APIClient>;

export interface APIContentTypes {
  comments: any;
  footer: any;
  header: any;
  'home-page': HomePage;
  pages: Page;
  ratings: any;
  recipes: Recipe;
  'recipe-search-page': RecipeSearchPage;
}

interface Parameters {
  data: Record<string, any>;
  fields?: string[] | '*';
  filters?: Record<string, any>;
  locale?: string | string[];
  pagination?: (
    | { page?: number; pageSize?: number }
    | { start?: number; limit?: number }
  ) & { withCount?: boolean };
  populate?: Record<string, any> | '*' | 'localizations';
  publicationState?: 'live' | 'preview';
  sort?: string | string[];
}

export interface APIResponse<T> {
  data: T | null;
  error?: {
    status: string;
    name: string;
    message: string;
    details: Record<string, any>;
  };
  meta: {
    pagination?: {
      page: number;
      pageCount: number;
      pageSize: number;
      total: number;
    };
  };
}

export class APIClient {
  config: APIClientConfigOutput;

  constructor(config: APIClientConfigInput) {
    this.config = apiClientConfigSchema.parse(config);
  }

  async getOne<K extends keyof APIContentTypes>(
    {
      contentType,
      id,
      parameters: query,
    }: {
      contentType: K;
      id: number;
      parameters?: Pick<
        Parameters,
        'fields' | 'locale' | 'populate' | 'publicationState'
      >;
    },
    init?: RequestInit | undefined
  ) {
    const { data, error, meta } = await this.request<APIContentTypes[K]>(
      `/${contentType}/${id}${stringify(query, {
        addQueryPrefix: true,
        encodeValuesOnly: true,
      })}`,
      init
    );

    return { data, error, meta };
  }

  async getMany<K extends keyof APIContentTypes>(
    {
      contentType,
      parameters: query,
    }: {
      contentType: K;
      parameters?: Omit<Parameters, 'data'>;
    },
    init?: RequestInit | undefined
  ) {
    const { data, error, meta } = await this.request<
      APIContentTypes[K] | APIContentTypes[K][]
    >(
      `/${contentType}${stringify(query, {
        addQueryPrefix: true,
        encodeValuesOnly: true,
      })}`,
      init
    );

    if (data === null) {
      return { data: [], error, meta };
    }

    if (!Array.isArray(data)) {
      return { data: [data], error, meta };
    }

    return { data, error, meta };
  }

  async create<K extends keyof APIContentTypes>(
    {
      contentType,
      parameters: { data: payload, ...query },
    }: {
      contentType: K;
      parameters: Pick<
        Parameters,
        'data' | 'fields' | 'locale' | 'populate' | 'publicationState'
      >;
    },
    init?: RequestInit | undefined
  ) {
    const { data, error, meta } = await this.request<APIContentTypes[K]>(
      `/${contentType}${stringify(query, {
        addQueryPrefix: true,
        encodeValuesOnly: true,
      })}`,
      {
        ...init,
        body: JSON.stringify({ data: payload }),
        headers: { ...init?.headers, 'Content-Type': 'application/json' },
        method: 'POST',
      }
    );

    return { data, error, meta };
  }

  async update<K extends keyof APIContentTypes>(
    {
      contentType,
      id,
      parameters: { data: payload, ...query },
    }: {
      contentType: K;
      id: number;
      parameters: Pick<
        Parameters,
        'data' | 'fields' | 'locale' | 'populate' | 'publicationState'
      >;
    },
    init?: RequestInit | undefined
  ) {
    const { data, error, meta } = await this.request<APIContentTypes[K]>(
      `/${contentType}/${id}${stringify(query, {
        addQueryPrefix: true,
        encodeValuesOnly: true,
      })}`,
      {
        ...init,
        body: JSON.stringify({ data: payload }),
        headers: { ...init?.headers, 'Content-Type': 'application/json' },
        method: 'PUT',
      }
    );

    return { data, error, meta };
  }

  async delete<K extends keyof APIContentTypes>(
    {
      contentType,
      id,
      parameters: query,
    }: {
      contentType: K;
      id: number;
      parameters?: Pick<
        Parameters,
        'fields' | 'locale' | 'populate' | 'publicationState'
      >;
    },
    init?: RequestInit | undefined
  ) {
    const { data, error, meta } = await this.request<APIContentTypes[K]>(
      `/${contentType}/${id}${stringify(query, {
        addQueryPrefix: true,
        encodeValuesOnly: true,
      })}`,
      {
        ...init,
        method: 'DELETE',
      }
    );

    return { data, error, meta };
  }

  async request<T>(input: RequestInfo | URL, init?: RequestInit | undefined) {
    const url =
      typeof input === 'string' && input.startsWith('/')
        ? `${this.config.protocol}://${this.config.host}:${this.config.port}/api${input}`
        : input;

    const opts = {
      ...init,
      headers: {
        ...init?.headers,
        Authorization: `Bearer ${this.config.token}`,
      },
    };

    const response = await fetch(url, opts);

    const { data, error, meta } = (await response.json()) as APIResponse<T>;

    if (error) {
      return {
        data: data as null,
        error,
        meta,
      };
    }

    return {
      data: data as T,
      error,
      meta,
    };
  }
}
