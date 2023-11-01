import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { apiClient } from '@/lib/api/client';
import { Hero } from '@recipes/ui';

interface PageProps {
  params: {
    locale: string;
    slug: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const recipe = await getRecipeData({ params });

  return (
    <>
      <Hero
        backgroundImage={recipe.attributes.image}
        description={recipe.attributes.description}
        title={recipe.attributes.title}
      />
      {/* <Container className={'container'} px={'4'}>
        <pre className={'whitespace-pre-wrap'}>
          {JSON.stringify(recipe, null, 2)}
        </pre>
      </Container> */}
    </>
  );
};

export default Page;

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const recipe = await getRecipeData({ params });

  return {
    title: recipe.attributes.title,
  };
};

const getRecipeData = async ({ params }: PageProps) => {
  const { locale, slug } = params;

  const {
    data: [recipe],
  } = await apiClient.getMany({
    contentType: 'recipes',
    parameters: {
      fields: ['id', 'description', 'slug', 'title'],
      filters: { slug },
      locale,
      pagination: { limit: 1 },
      populate: {
        image: { fields: ['height', 'id', 'placeholder', 'url', 'width'] },
      },
    },
  });

  if (!recipe) {
    notFound();
  }

  return recipe;
};
