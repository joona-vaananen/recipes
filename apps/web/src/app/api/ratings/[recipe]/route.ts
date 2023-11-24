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
});

interface Context {
  params: { recipe: string };
}

export const GET = async (request: NextRequest, context: Context) => {
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

  try {
    ({ locale } = searchParamsSchema.parse({
      locale: searchParams.get('locale'),
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
    ({ data: recipe } = await apiClient.getOne(
      {
        contentType: 'recipes',
        id: parsedParams.recipe,
        parameters: {
          fields: ['averageRating', 'id', 'ratingCount'],
          locale,
        },
      },
      { cache: 'no-store' }
    ));
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

  const data = {
    average: recipe.attributes.averageRating,
    count: recipe.attributes.ratingCount,
  };

  return NextResponse.json(
    { data },
    {
      headers: {
        'Cache-Control':
          'private, no-cache, no-store, max-age=0, must-revalidate',
      },
    }
  );
};

export const dynamic = 'force-dynamic';
