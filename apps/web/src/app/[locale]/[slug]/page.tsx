import type { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

import { GENERATE_STATIC_PARAMS } from '@/constants';
import { apiClient } from '@/lib/api/client';
import { searchClient } from '@/lib/search/client';
import type { RecipeCarousel as RecipeCarouselProps } from '@recipes/api/src/components/ui/interfaces/RecipeCarousel';
import {
  DynamicZone,
  Hero,
  RecipeCarousel,
  RichText,
  type Locale,
} from '@recipes/ui';
import { LocaleSwitcherPathnames } from '@recipes/ui/src/components';

interface PageProps {
  params: {
    locale: string;
    slug: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const { locale } = params;

  unstable_setRequestLocale(locale);

  const page = await getPageData({ params });

  const pathnames = [
    page,
    ...(page.attributes.localizations?.data ?? []),
  ].reduce(
    (accumulatedPathnames, localization) => {
      const { locale, slug } = localization.attributes;

      return {
        ...accumulatedPathnames,
        [locale]: `/${slug}`,
      };
    },
    {} as Record<Locale, string>
  );

  return (
    <>
      <LocaleSwitcherPathnames pathnames={pathnames} />
      <DynamicZone
        components={{
          'ui.hero': Hero,
          'ui.recipe-carousel': (props: RecipeCarouselProps) => (
            <RecipeCarousel
              {...props}
              locale={locale}
              searchClient={searchClient}
            />
          ),
          'ui.rich-text': RichText,
        }}
      >
        {page.attributes.content}
      </DynamicZone>
    </>
  );
};

export default Page;

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const page = await getPageData({ params });

  return {
    title: page.attributes.metadata?.title || page.attributes.title,
    description: page.attributes.metadata?.description,
    openGraph: {
      title:
        page.attributes.metadata?.ogTitle ||
        page.attributes.metadata?.title ||
        page.attributes.title,
      description:
        page.attributes.metadata?.ogDescription ||
        page.attributes.metadata?.description,
      images: page.attributes.metadata?.ogImage?.data
        ? page.attributes.metadata.ogImage.data.attributes.formats?.large.url ??
          page.attributes.metadata.ogImage.data.attributes.url
        : undefined,
    },
  };
};

export const generateStaticParams = GENERATE_STATIC_PARAMS
  ? async ({ params }: { params: { locale: string } }) => {
      const { locale } = params;

      const { data: pages } = await apiClient.getMany(
        {
          contentType: 'pages',
          parameters: {
            fields: ['id', 'slug'],
            locale,
            pagination: { limit: 100 },
            sort: 'createdAt:desc',
          },
        },
        { cache: 'no-store' }
      );

      return pages.map((page) => ({ slug: page.attributes.slug }));
    }
  : undefined;

const getPageData = async ({ params }: PageProps) => {
  const { locale, slug } = params;

  const {
    data: [page],
  } = await apiClient.getMany(
    {
      contentType: 'pages',
      parameters: {
        fields: ['id', 'locale', 'slug', 'title'],
        filters: { slug },
        locale,
        pagination: { limit: 1 },
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
              'ui.recipe-carousel': {
                fields: ['id', 'limit', 'title', 'sort'],
                populate: {
                  categories: true,
                  courses: true,
                  cuisines: true,
                  diets: true,
                  mainIngredients: true,
                  mealTypes: true,
                  methods: true,
                  seasons: true,
                },
              },
              'ui.rich-text': {
                fields: ['blocks', 'id'],
              },
            },
          },
          localizations: {
            fields: ['locale', 'slug'],
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

  if (!page) {
    notFound();
  }

  return page;
};
