import type { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

import { apiClient } from '@/lib/api/client';
import { DynamicZone, Hero, RichText, pathnames } from '@recipes/ui';
import { LocaleSwitcherPathnames } from '@recipes/ui/src/components';

interface PrivacyPolicyPageProps {
  params: { locale: string };
}

const PrivacyPolicyPage = async ({ params }: PrivacyPolicyPageProps) => {
  const { locale } = params;

  unstable_setRequestLocale(locale);
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
                populate: {
                  backgroundImage: {
                    fields: ['height', 'id', 'placeholder', 'url', 'width'],
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
              ogImage: true,
            },
          },
        },
        publicationState: draftMode().isEnabled ? 'preview' : 'live',
      },
    },
    { next: { revalidate: 600 } }
  );

  if (!privacyPolicyPage) {
    notFound();
  }

  return privacyPolicyPage;
};
