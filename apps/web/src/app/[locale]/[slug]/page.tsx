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
  LocaleSwitcherPathnames,
  RecipeCarousel,
  RichText,
  type Locale,
} from '@recipes/ui';

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

export const generateStaticParams = async ({
  params,
}: {
  params: { locale: string };
}) => {
  if (!GENERATE_STATIC_PARAMS) {
    return [];
  }

  const { locale } = params;

  const { data: pages } = await apiClient.getMany(
    {
      contentType: 'pages',
      parameters: {
        fields: ['id', 'slug'],
        locale,
        pagination: { limit: 100 },
        sort: 'publishedAt:desc',
      },
    },
    { cache: 'no-store' }
  );

  return pages.map((page) => ({ slug: page.attributes.slug }));
};

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
              'ui.recipe-carousel': {
                fields: ['id', 'limit', 'title', 'sort'],
                populate: {
                  categories: {
                    fields: ['id', 'name', 'slug'],
                  },
                  courses: {
                    fields: ['id', 'name', 'slug'],
                  },
                  cuisines: {
                    fields: ['id', 'name', 'slug'],
                  },
                  diets: {
                    fields: ['id', 'name', 'slug'],
                  },
                  mainIngredients: {
                    fields: ['id', 'name', 'slug'],
                  },
                  mealTypes: {
                    fields: ['id', 'name', 'slug'],
                  },
                  methods: {
                    fields: ['id', 'name', 'slug'],
                  },
                  seasons: {
                    fields: ['id', 'name', 'slug'],
                  },
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

  if (!page) {
    notFound();
  }

  return page;
};
