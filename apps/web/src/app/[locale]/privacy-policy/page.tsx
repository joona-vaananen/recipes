import { Container, Heading, Section } from '@radix-ui/themes';
import type { Metadata } from 'next';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

import { COOKIEBOT_ID } from '@/constants';
import { apiClient } from '@/lib/api/client';
import {
  DynamicZone,
  Hero,
  LocaleSwitcherPathnames,
  RichText,
  pathnames,
} from '@recipes/ui';
import { CookieDeclarationScript } from './cookie-declaration-script';

interface PrivacyPolicyPageProps {
  params: { locale: string };
}

const PrivacyPolicyPage = async ({ params }: PrivacyPolicyPageProps) => {
  const { locale } = params;

  unstable_setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'PrivacyPolicy' });

  const privacyPolicyPage = await getPrivacyPolicyPageData({ params });

  return (
    <>
      <LocaleSwitcherPathnames pathnames={pathnames['/privacy-policy']} />
      <DynamicZone
        components={{
          'ui.hero': Hero,
          'ui.rich-text': RichText,
        }}
      >
        {privacyPolicyPage.attributes.content}
      </DynamicZone>
      {COOKIEBOT_ID ? (
        <Section size={'2'}>
          <Container className={'max-w-full'} px={'4'} size={'3'}>
            <Heading
              as={'h2'}
              className={'first:mt-0 last:mb-0'}
              my={'8'}
              size={'8'}
            >
              {t('cookieDeclaration')}
            </Heading>
            <CookieDeclarationScript cookiebotId={COOKIEBOT_ID} />
          </Container>
        </Section>
      ) : null}
    </>
  );
};

export default PrivacyPolicyPage;

export const generateMetadata = async ({
  params,
}: PrivacyPolicyPageProps): Promise<Metadata> => {
  const privacyPolicyPage = await getPrivacyPolicyPageData({ params });

  return {
    title:
      privacyPolicyPage.attributes.metadata?.title ||
      privacyPolicyPage.attributes.title,
    description: privacyPolicyPage.attributes.metadata?.description,
    openGraph: {
      title:
        privacyPolicyPage.attributes.metadata?.ogTitle ||
        privacyPolicyPage.attributes.metadata?.title ||
        privacyPolicyPage.attributes.title,
      description:
        privacyPolicyPage.attributes.metadata?.ogDescription ||
        privacyPolicyPage.attributes.metadata?.description,
      images: privacyPolicyPage.attributes.metadata?.ogImage?.data
        ? privacyPolicyPage.attributes.metadata.ogImage.data.attributes.formats
            ?.large.url ??
          privacyPolicyPage.attributes.metadata.ogImage.data.attributes.url
        : undefined,
    },
  };
};

const getPrivacyPolicyPageData = async ({ params }: PrivacyPolicyPageProps) => {
  const { locale } = params;

  const {
    data: [privacyPolicyPage],
  } = await apiClient.getMany(
    {
      contentType: 'privacy-policy-page',
      parameters: {
        fields: ['id', 'title'],
        locale,
        populate: {
          content: {
            on: {
              'ui.hero': {
                fields: ['description', 'id', 'title'],
                populate: {
                  backgroundImage: {
                    fields: ['height', 'id', 'placeholder', 'url', 'width'],
                  },
                  ctaButtons: {
                    fields: ['id', 'text', 'url', 'variant'],
                  },
                },
              },
              'ui.rich-text': {
                fields: ['blocks', 'id'],
              },
            },
          },
          metadata: {
            fields: ['description', 'ogDescription', 'ogTitle', 'title'],
            populate: {
              ogImage: {
                fields: ['formats', 'id', 'url'],
              },
            },
          },
        },
        publicationState: draftMode().isEnabled ? 'preview' : 'live',
      },
    },
    { next: { revalidate: 300 } }
  );

  if (!privacyPolicyPage) {
    notFound();
  }

  return privacyPolicyPage;
};
