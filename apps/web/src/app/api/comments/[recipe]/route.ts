import { NextResponse, type NextRequest } from 'next/server';
import * as z from 'zod';

import { apiClient } from '@/lib/api/client';
import { ContentTypes } from '@recipes/api-client/src/api-client';
import { locales } from '@recipes/ui';

const paramsSchema = z.object({
  recipe: z.coerce.number({
    invalid_type_error: 'Recipe is invalid',
    required_error: 'Recipe is required',
  }),
});

const searchParamsSchema = z.object({
  limit: z.coerce.number({
    invalid_type_error: 'Limit is invalid',
    required_error: 'Limit is required',
  }),
  locale: z.enum(locales, {
    invalid_type_error: 'Locale is invalid',
    required_error: 'Locale is required',
  }),
  start: z.coerce.number({
    invalid_type_error: 'Start is invalid',
    required_error: 'Start is required',
  }),
});

interface Context {
  params: { recipe: string };
}

export const GET = async (request: NextRequest, context: Context) => {
  let recipe: number;

  try {
    ({ recipe } = paramsSchema.parse(context.params));
  } catch (error) {
    if (error instanceof z.ZodError) {
      const [{ message }] = error.issues;

      return NextResponse.json(
        { data: null, error: { message } },
        { status: 400 }
      );
    } else {
      return NextResponse.json(
        { data: null, error: { message: 'Server error' } },
        { status: 500 }
      );
    }
  }

  const { searchParams } = request.nextUrl;
  let limit: number;
  let locale: string;
  let start: number;

  try {
    ({ limit, locale, start } = searchParamsSchema.parse({
      limit: searchParams.get('limit'),
      locale: searchParams.get('locale'),
      start: searchParams.get('start'),
    }));
  } catch (error) {
    if (error instanceof z.ZodError) {
      const [{ message }] = error.issues;

      return NextResponse.json(
        { data: null, error: { message } },
        { status: 400 }
      );
    } else {
      return NextResponse.json(
        { data: null, error: { message: 'Server error' } },
        { status: 500 }
      );
    }
  }

  let data: ContentTypes['comments'][];
  let meta: Record<string, any>;

  try {
    ({ data, meta } = await apiClient.getMany({
      contentType: 'comments',
      parameters: {
        fields: ['comment', 'createdAt', 'id', 'name', 'userId'],
        filters: {
          recipe: {
            id: recipe,
          },
        },
        locale,
        pagination: {
          limit,
          start,
        },
        populate: {
          rating: {
            fields: ['id', 'score'],
          },
        },
      },
    }));
  } catch {
    return NextResponse.json(
      { data: null, error: { message: 'Server error' } },
      { status: 500 }
    );
  }

  return NextResponse.json({ data, meta });
};
