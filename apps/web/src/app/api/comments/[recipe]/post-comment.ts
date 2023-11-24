import { NextResponse, type NextRequest } from 'next/server';
import * as z from 'zod';

import { ERROR_NAMES } from '@/constants';
import { apiClient } from '@/lib/api/client';
import type { APIContentTypes } from '@recipes/api-client';
import { locales } from '@recipes/ui';
import {
  commentFormSchema,
  type CommentFormSchema,
} from '@recipes/ui/src/components/comment-form/comment-form-schema';

const paramsSchema = z.object({
  recipe: z.coerce.number(),
});

const searchParamsSchema = z.object({
  locale: z.enum(locales),
});

interface Context {
  params: { recipe: string };
}

export const postComment = async (request: NextRequest, context: Context) => {
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
          fields: ['id'],
          locale,
          populate: {
            localizations: {
              fields: ['id'],
            },
          },
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

  let parsedValues: CommentFormSchema;

  try {
    const values = await request.json();
    parsedValues = commentFormSchema.parse(values);
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

  let rating: APIContentTypes['ratings'] | null = null;

  if (typeof parsedValues.rating === 'number') {
    // Duplicate rating check
    /* const recipes = [recipe, ...(recipe.attributes.localizations?.data ?? [])];

    ({
      data: [rating],
    } = await apiClient.getMany(
      {
        contentType: 'ratings',
        parameters: {
          fields: ['id'],
          filters: {
            recipe: {
              id: {
                $in: recipes.map((recipe) => recipe.id),
              },
            },
            userId: parsedValues.userId,
          },
          pagination: { limit: 1 },
        },
      },
      { cache: 'no-store' }
    ));

    if (rating) {
      return NextResponse.json(
        {
          data: null,
          error: {
            message: 'Unique constraint error',
            name: ERROR_NAMES.UNIQUE_CONSTRAINT_ERROR,
          },
        },
        { status: 400 }
      );
    } */

    try {
      ({ data: rating } = await apiClient.create({
        contentType: 'ratings',
        parameters: {
          fields: ['id'],
          data: {
            recipe,
            score: parsedValues.rating,
            userId: parsedValues.userId,
          },
          locale,
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
  }

  let data: APIContentTypes['comments'] | null;
  let meta: Record<string, any>;

  try {
    ({ data, meta } = await apiClient.create({
      contentType: 'comments',
      parameters: {
        fields: ['comment', 'id', 'name'],
        data: {
          name: parsedValues.name,
          comment: parsedValues.comment,
          locale,
          userId: parsedValues.userId,
          rating: rating?.id ?? null,
          recipe,
        },
        locale,
        populate: {
          rating: {
            fields: ['id', 'score'],
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

  return NextResponse.json({ data, meta });
};
