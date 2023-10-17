import { Container } from '@radix-ui/themes';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { components } from '@/components/components';
import { apiClient } from '@/lib/api/client';
import { DynamicZone } from '@recipes/ui';

interface HomePageProps {
  params: { locale: string };
}

const HomePage = async ({ params }: HomePageProps) => {
  const homePage = await getHomePageData({ params });

  return (
    <>
      <DynamicZone components={components}>
        {homePage.attributes.content}
      </DynamicZone>
      <Container className={'container'} px={'4'}>
        <pre className={'whitespace-pre-wrap'}>
          {JSON.stringify(homePage, null, 2)}
        </pre>
      </Container>
    </>
  );
};

export default HomePage;

export const generateMetadata = async ({
  params,
}: HomePageProps): Promise<Metadata> => {
  const homePage = await getHomePageData({ params });

  return {
    title: homePage.attributes.title,
  };
};

const getHomePageData = async ({ params }: HomePageProps) => {
  const { locale } = params;

  const {
    data: [homePage],
  } = await apiClient.getMany({
    contentType: 'home-page',
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
            'ui.recipe-carousel': {
              populate: {
                categories: true,
                courses: true,
                cuisines: true,
                diets: true,
                ingredients: true,
                mealTypes: true,
                methods: true,
                seasons: true,
              },
            },
          },
        },
      },
    },
  });

  if (!homePage) {
    notFound();
  }

  return homePage;
};
