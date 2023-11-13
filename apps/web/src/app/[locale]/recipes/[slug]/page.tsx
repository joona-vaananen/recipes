import { Container, Grid } from '@radix-ui/themes';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { apiClient } from '@/lib/api/client';
import { searchClient } from '@/lib/search/client';
import {
  CommentForm,
  CommentList,
  DynamicZone,
  Hero,
  IngredientList,
  InstructionList,
  RecipeInfo,
  RichText,
  SimilarRecipeCarousel,
} from '@recipes/ui/src/components';

interface PageProps {
  params: {
    locale: string;
    slug: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const { locale } = params;
  const recipe = await getRecipeData({ params });

  return (
    <>
      <Hero
        backgroundImage={recipe.attributes.image}
        description={recipe.attributes.description}
        title={recipe.attributes.title}
      />
      <RecipeInfo
        averageRating={recipe.attributes.averageRating}
        ratingCount={recipe.attributes.ratingCount}
      />
      <DynamicZone
        components={{
          'ui.rich-text': RichText,
        }}
      >
        {recipe.attributes.content}
      </DynamicZone>
      <Container className={'container'}>
        <Grid
          columns={{
            initial: '1',
            sm: '2',
          }}
          gap={'4'}
        >
          <IngredientList
            items={recipe.attributes.ingredients}
            servings={recipe.attributes.servings}
          />
          <InstructionList items={recipe.attributes.instructions} />
        </Grid>
      </Container>
      <SimilarRecipeCarousel
        categories={recipe.attributes.categories}
        cuisines={recipe.attributes.cuisines}
        id={recipe.id}
        searchClient={searchClient}
      />
      <Container className={'container'}>
        <Grid
          columns={{
            initial: '1',
            sm: '2',
          }}
          gap={'4'}
        >
          <CommentForm locale={locale} recipe={recipe.id} />
        </Grid>
        <CommentList apiClient={apiClient} locale={locale} recipe={recipe.id} />
      </Container>
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
      fields: [
        'averageRating',
        'id',
        'description',
        'ratingCount',
        'servings',
        'slug',
        'title',
      ],
      filters: { slug },
      locale,
      pagination: { limit: 1 },
      populate: {
        categories: {
          fields: ['id', 'slug'],
        },
        content: {
          on: {
            'ui.rich-text': {
              fields: ['blocks', 'id'],
            },
          },
        },
        courses: {
          fields: ['id', 'slug'],
        },
        cuisines: {
          fields: ['id', 'slug'],
        },
        image: {
          fields: ['height', 'id', 'placeholder', 'url', 'width'],
        },
        ingredients: {
          fields: ['id', 'title'],
          populate: {
            items: {
              fields: ['amount', 'content', 'id', 'unit'],
            },
          },
        },
        instructions: {
          fields: ['id', 'title'],
          populate: {
            items: {
              fields: ['content', 'id'],
            },
          },
        },
        mealTypes: {
          fields: ['id', 'slug'],
        },
      },
    },
  });

  if (!recipe) {
    notFound();
  }

  return recipe;
};
