'use server';

import { APIClientInstance } from '@recipes/api-client';
import * as z from 'zod';
import {
  commentFormSchema,
  type CommentFormSchema,
} from './comment-form-schema';

export const postComment = async (
  apiClient: APIClientInstance,
  locale: string,
  recipe: number,
  values: CommentFormSchema
) => {
  let parsedValues: CommentFormSchema;

  try {
    parsedValues = commentFormSchema.parse(values);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { data: null, error };
    } else {
      return { data: null, error: { message: 'Server error' } };
    }
  }

  let rating: { id: number } | null = null;

  if (typeof parsedValues.rating === 'number') {
    ({
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
      return { data: null, error: { message: 'Already rated' } };
    }

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

  const { data: comment } = await apiClient.create({
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

  return { data: comment };
};

export type PostComment = (
  values: CommentFormSchema
) => ReturnType<typeof postComment>;
