import { draftMode } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import { NextResponse, type NextRequest } from 'next/server';
import * as z from 'zod';

import { ERROR_NAMES } from '@/constants';
import { apiClient } from '@/lib/api/client';
import { APIContentTypes } from '@recipes/api-client';
import { getPathname, type Locale } from '@recipes/ui';
import { searchParamsSchema, type PublicationState } from '../schemas';

export const GET = async (request: NextRequest) => {
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

  let privacyPolicyPage: APIContentTypes['privacy-policy-page'] | undefined;

  try {
    ({
      data: [privacyPolicyPage],
    } = await apiClient.getMany(
      {
        contentType: 'privacy-policy-page',
        parameters: {
          fields: ['id', 'locale'],
          locale,
          publicationState,
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

  if (!privacyPolicyPage) {
    notFound();
  }

  if (publicationState === 'preview') {
    draftMode().enable();
  }

  const pathname = `/${privacyPolicyPage.attributes.locale}${getPathname({
    locale: privacyPolicyPage.attributes.locale as Locale,
    href: { pathname: '/privacy-policy' },
  })}`.replace(/\/$/, '');

  redirect(pathname);
};

export const dynamic = 'force-dynamic';
