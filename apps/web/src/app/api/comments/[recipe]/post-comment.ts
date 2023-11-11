import { NextResponse, type NextRequest } from 'next/server';
import * as z from 'zod';

import { ERROR_NAMES } from '@/constants';
import { apiClient } from '@/lib/api/client';
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
  let recipe: number;

  try {
    ({ recipe } = paramsSchema.parse(context.params));
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

  let rating: { id: number } | null = null;

  if (typeof parsedValues.rating === 'number') {
    // Duplicate rating check
    /* ({
      data: [rating],
    } = await apiClient.getMany({
      contentType: 'ratings',
      parameters: {
        fields: ['id'],
        filters: {
          recipe: {
            id: recipe,
          },
          userId: parsedValues.userId,
        },
        locale: 'all',
        pagination: { limit: 1 },
      },
    }));

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
  }

  const { data, meta } = await apiClient.create({
    contentType: 'comments',
    parameters: {
      fields: ['comment', 'id', 'name'],
      data: {
        name: parsedValues.name,
        comment: parsedValues.comment,
        userId: parsedValues.userId,
        rating: rating?.id,
        recipe,
      },
      locale,
      populate: {
        rating: {
          fields: ['id', 'score'],
        },
      },
    },
  });

  return NextResponse.json({ data, meta });
};
