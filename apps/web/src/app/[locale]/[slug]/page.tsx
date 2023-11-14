import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { BASE_URL } from '@/constants';
import { apiClient } from '@/lib/api/client';
import { searchClient } from '@/lib/search/client';
import type { RecipeCarousel as RecipeCarouselProps } from '@recipes/api/src/components/ui/interfaces/RecipeCarousel';
import { DynamicZone, Hero, RecipeCarousel, RichText } from '@recipes/ui';

interface PageProps {
  params: {
    locale: string;
    slug: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const { locale } = params;

  const page = await getPageData({ params });

  return (
    <>
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
      {/* <Container className={'container'} px={'4'}>
        <pre className={'whitespace-pre-wrap'}>
          {JSON.stringify(page, null, 2)}
        </pre>
      </Container> */}
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
        ? `${BASE_URL}${page.attributes.metadata.ogImage.data.attributes.url}`
        : undefined,
    },
  };
};

const getPageData = async ({ params }: PageProps) => {
  const { locale, slug } = params;

  const {
    data: [page],
  } = await apiClient.getMany({
    contentType: 'pages',
    parameters: {
      fields: ['id', 'slug', 'title'],
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
        metadata: {
          fields: [
            'description',
            'ogDescription',
            'ogImage',
            'ogTitle',
            'title',
          ],
          populate: {
            ogImage: true,
          },
        },
      },
    },
  });

  if (!page) {
    notFound();
  }

  return page;
};
