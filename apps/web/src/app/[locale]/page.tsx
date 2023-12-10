import type { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

import { SITE_NAME } from '@/constants';
import { apiClient } from '@/lib/api/client';
import { searchClient } from '@/lib/search/client';
import type { RecipeCarousel as RecipeCarouselProps } from '@recipes/api/src/components/ui/interfaces/RecipeCarousel';
import {
  DynamicZone,
  Hero,
  LocaleSwitcherPathnames,
  RecipeCarousel,
  RichText,
  pathnames,
} from '@recipes/ui';

interface HomePageProps {
  params: { locale: string };
}

const HomePage = async ({ params }: HomePageProps) => {
  const { locale } = params;

  unstable_setRequestLocale(locale);
  const homePage = await getHomePageData({ params });

  return (
    <>
      <LocaleSwitcherPathnames pathnames={pathnames['/']} />
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
        {homePage.attributes.content}
      </DynamicZone>
    </>
  );
};

export default HomePage;

export const generateMetadata = async ({
  params,
}: HomePageProps): Promise<Metadata> => {
  const homePage = await getHomePageData({ params });

  return {
    title:
      homePage.attributes.metadata?.title || homePage.attributes.title
        ? `${
            homePage.attributes.metadata?.title || homePage.attributes.title
          } | ${SITE_NAME}`
        : SITE_NAME,
    description: homePage.attributes.metadata?.description,
    openGraph: {
      title:
        homePage.attributes.metadata?.ogTitle ||
        homePage.attributes.metadata?.title ||
        homePage.attributes.title,
      description:
        homePage.attributes.metadata?.ogDescription ||
        homePage.attributes.metadata?.description,
      images: homePage.attributes.metadata?.ogImage?.data
        ? homePage.attributes.metadata.ogImage.data.attributes.formats?.large
            .url ?? homePage.attributes.metadata.ogImage.data.attributes.url
        : undefined,
    },
  };
};

const getHomePageData = async ({ params }: HomePageProps) => {
  const { locale } = params;

  const {
    data: [homePage],
  } = await apiClient.getMany(
    {
      contentType: 'home-page',
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

  if (!homePage) {
    notFound();
  }

  return homePage;
};
