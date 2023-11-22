import { NextResponse, type NextRequest } from 'next/server';
import * as z from 'zod';

import { ERROR_NAMES } from '@/constants';
import { apiClient } from '@/lib/api/client';
import { APIContentTypes } from '@recipes/api-client';
import { locales } from '@recipes/ui';

const paramsSchema = z.object({
  recipe: z.coerce.number(),
});

const searchParamsSchema = z.object({
  locale: z.enum(locales),
  page: z.coerce.number().min(1),
  pageSize: z.coerce.number().min(1),
});

interface Context {
  params: { recipe: string };
}

export const getComments = async (request: NextRequest, context: Context) => {
  let parsedParams: { recipe: number };

  try {
    parsedParams = paramsSchema.parse(context.params);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const [{ message }] = error.issues;

      return NextResponse.json(
        { data: null, error: { message, name: ERROR_NAMES.VALIDATION_ERROR } },
        { status: 400 }
      );
    } else {
      return NextResponse.json(
        {
          data: null,
          error: { message: 'Server error', name: ERROR_NAMES.SERVER_ERROR },
        },
        { status: 500 }
      );
    }
  }

  const { searchParams } = request.nextUrl;

  let locale: string;
  let page: number;
  let pageSize: number;

  try {
    ({ locale, page, pageSize } = searchParamsSchema.parse({
      locale: searchParams.get('locale'),
      page: searchParams.get('page'),
      pageSize: searchParams.get('pageSize'),
    }));
  } catch (error) {
    if (error instanceof z.ZodError) {
      const [{ message }] = error.issues;

      return NextResponse.json(
        { data: null, error: { message, name: ERROR_NAMES.VALIDATION_ERROR } },
        { status: 400 }
      );
    } else {
      return NextResponse.json(
        {
          data: null,
          error: { message: 'Server error', name: ERROR_NAMES.SERVER_ERROR },
        },
        { status: 500 }
      );
    }
  }

  let recipe: APIContentTypes['recipes'] | null;

  try {
    ({ data: recipe } = await apiClient.getOne({
      contentType: 'recipes',
      id: parsedParams.recipe,
      parameters: {
        fields: ['id'],
        locale,
        populate: {
          localizations: {
            fields: ['id'],
          },
        },
      },
    }));
  } catch {
    return NextResponse.json(
      {
        data: null,
        error: { message: 'Server error', name: ERROR_NAMES.SERVER_ERROR },
      },
      { status: 500 }
    );
  }

  if (!recipe) {
    return NextResponse.json(
      {
        data: null,
        error: { message: 'Not found', name: ERROR_NAMES.NOT_FOUND },
      },
      { status: 404 }
    );
  }

  let data: APIContentTypes['comments'][];
  let meta: Record<string, any>;

  try {
    ({ data, meta } = await apiClient.getMany({
      contentType: 'comments',
      parameters: {
        fields: ['comment', 'createdAt', 'id', 'name', 'userId'],
        filters: {
          recipe: {
            id: {
              $in: [
                recipe.id,
                ...(recipe.attributes.localizations?.data?.map(
                  (localization) => localization.id
                ) ?? []),
              ],
            },
          },
        },
        locale: 'all',
        pagination: {
          page,
          pageSize,
        },
        populate: {
          rating: {
            fields: ['id', 'score'],
          },
        },
        sort: 'createdAt:desc',
      },
    }));
  } catch {
    return NextResponse.json(
      {
        data: null,
        error: { message: 'Server error', name: ERROR_NAMES.SERVER_ERROR },
      },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { data, meta },
    {
      headers: {
        'Cache-Control':
          'private, no-cache, no-store, max-age=0, must-revalidate',
      },
    }
  );
};
