import { NextResponse, type NextRequest } from 'next/server';
import * as z from 'zod';

import { apiClient } from '@/lib/api/client';
import { APIContentTypes } from '@recipes/api-client';
import { locales } from '@recipes/ui';

const paramsSchema = z.object({
  recipe: z.coerce.number({
    invalid_type_error: 'Recipe is invalid',
    required_error: 'Recipe is required',
  }),
});

const searchParamsSchema = z.object({
  locale: z.enum(locales, {
    invalid_type_error: 'Locale is invalid',
    required_error: 'Locale is required',
  }),
  page: z.coerce
    .number({
      invalid_type_error: 'Page is invalid',
      required_error: 'Page is required',
    })
    .min(1, { message: 'Page is invalid' }),
  pageSize: z.coerce
    .number({
      invalid_type_error: 'Page size is invalid',
      required_error: 'Page size is required',
    })
    .min(1, { message: 'Page size is invalid' }),
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

  let data: APIContentTypes['comments'][];
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
          page,
          pageSize,
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
