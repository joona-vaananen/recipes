import { draftMode } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import { NextResponse, type NextRequest } from 'next/server';
import * as z from 'zod';

import { ERROR_NAMES } from '@/constants';
import { apiClient } from '@/lib/api/client';
import { APIContentTypes } from '@recipes/api-client';
import { getPathname, type Locale } from '@recipes/ui';
import {
  paramsSchema,
  searchParamsSchema,
  type PublicationState,
} from '../../schemas';

interface Context {
  params: { slug: string };
}

export const GET = async (request: NextRequest, context: Context) => {
  let slug: string;

  try {
    ({ slug } = paramsSchema.parse(context.params));
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
  let publicationState: PublicationState;

  try {
    ({ locale, publicationState } = searchParamsSchema.parse({
      locale: searchParams.get('locale'),
      publicationState: searchParams.get('publicationState'),
      secret: searchParams.get('secret'),
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

  let recipe: APIContentTypes['recipes'] | undefined;

  try {
    ({
      data: [recipe],
    } = await apiClient.getMany({
      contentType: 'recipes',
      parameters: {
        fields: ['id', 'locale', 'slug'],
        filters: { slug },
        locale,
        pagination: { limit: 1 },
        publicationState,
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
    notFound();
  }

  if (publicationState === 'preview') {
    draftMode().enable();
  }

  const pathname = `/${recipe.attributes.locale}${getPathname({
    locale: recipe.attributes.locale as Locale,
    href: {
      pathname: '/recipes/[slug]',
      params: { slug: recipe.attributes.slug },
    },
  })}`.replace(/\/$/, '');

  redirect(pathname);
};
