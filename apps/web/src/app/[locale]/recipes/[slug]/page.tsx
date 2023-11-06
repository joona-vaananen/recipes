import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { apiClient } from '@/lib/api/client';
import { DynamicZone, Hero, RichText } from '@recipes/ui';
import { IngredientList } from '@recipes/ui/src/components';

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
      <DynamicZone
        components={{
          'ui.rich-text': RichText,
        }}
      >
        {recipe.attributes.content}
      </DynamicZone>
      <IngredientList
        items={recipe.attributes.ingredients}
        servings={recipe.attributes.servings}
      />
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
      fields: ['id', 'description', 'servings', 'slug', 'title'],
      filters: { slug },
      locale,
      pagination: { limit: 1 },
      populate: {
        content: {
          on: {
            'ui.rich-text': {
              fields: ['blocks', 'id'],
            },
          },
        },
        image: {
          fields: ['height', 'id', 'placeholder', 'url', 'width'],
        },
        ingredients: {
          fields: ['id', 'title'],
          populate: {
            items: {
              fields: ['amount', 'id', 'label', 'unit'],
            },
          },
        },
      },
    },
  });

  if (!recipe) {
    notFound();
  }

  return recipe;
};
