import { Container, Flex, Grid, Section } from '@radix-ui/themes';
import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { notFound } from 'next/navigation';
import { use } from 'react';

import { BASE_URL } from '@/constants';
import { apiClient } from '@/lib/api/client';
import { searchClient } from '@/lib/search/client';
import { Locale, getPathname } from '@recipes/ui';
import {
  CommentForm,
  CommentList,
  DynamicZone,
  Hero,
  IngredientList,
  InstructionList,
  LocaleSwitcherPathnames,
  RecipeInfo,
  RecipeJsonLd,
  RecipeTags,
  RecipeTime,
  RichText,
  ShareRecipe,
  SimilarRecipeCarousel,
  WakeLockSwitch,
} from '@recipes/ui/src/components';

interface PageProps {
  params: {
    locale: string;
    slug: string;
  };
}

const Page = ({ params }: PageProps) => {
  const { locale } = params;

  const t = useTranslations('RecipePage');

  const recipe = use(getRecipeData({ params }));

  const pathnames = [
    recipe,
    ...(recipe.attributes.localizations?.data ?? []),
  ].reduce(
    (accumulatedPathnames, localization) => {
      const { locale, slug } = localization.attributes;

      return {
        ...accumulatedPathnames,
        [locale]: getPathname({
          locale: locale as Locale,
          href: { pathname: '/recipes/[slug]', params: { slug } },
        }),
      };
    },
    {} as Record<Locale, string>
  );

  return (
    <>
      <LocaleSwitcherPathnames pathnames={pathnames} />
      <Hero
        backgroundImage={recipe.attributes.image}
        description={recipe.attributes.description}
        title={recipe.attributes.title}
      />
      <RecipeInfo
        averageRating={recipe.attributes.averageRating}
        ratingCount={recipe.attributes.ratingCount}
        recipeAnchor={t('recipeAnchor')}
      />
      <DynamicZone
        components={{
          'ui.rich-text': RichText,
        }}
      >
        {recipe.attributes.content}
      </DynamicZone>
      <Container className={'container'} id={t('recipeAnchor')}>
        <Section size={'2'}>
          <Flex direction={'column'} gap={'4'}>
            <WakeLockSwitch />
            <Grid
              className={'gap-20 sm:gap-10'}
              columns={{
                initial: '1',
                sm: '2',
              }}
            >
              <IngredientList
                items={recipe.attributes.ingredients}
                servings={recipe.attributes.servings}
              />

              <InstructionList items={recipe.attributes.instructions} />
            </Grid>
          </Flex>
        </Section>
      </Container>
      <Container className={'container'}>
        <Section size={'2'}>
          <Flex direction={'column'} gap={'8'}>
            <ShareRecipe locale={locale} slug={recipe.attributes.slug} />
            <RecipeTime
              cookTime={recipe.attributes.cookTime}
              prepTime={recipe.attributes.prepTime}
              restingTime={recipe.attributes.restingTime}
            />
            <RecipeTags
              categories={recipe.attributes.categories}
              courses={recipe.attributes.courses}
              cuisines={recipe.attributes.cuisines}
              diets={recipe.attributes.diets}
              mainIngredients={recipe.attributes.mainIngredients}
              mealTypes={recipe.attributes.mealTypes}
              methods={recipe.attributes.methods}
              seasons={recipe.attributes.seasons}
            />
          </Flex>
        </Section>
      </Container>
      <SimilarRecipeCarousel
        categories={recipe.attributes.categories}
        cuisines={recipe.attributes.cuisines}
        id={recipe.id}
        locale={locale}
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
      <RecipeJsonLd recipe={recipe} />
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
    description: recipe.attributes.description,
    openGraph: {
      title: recipe.attributes.title,
      description: recipe.attributes.description,
      images: recipe.attributes.image?.data
        ? `${BASE_URL}${
            recipe.attributes.image.data.attributes.formats?.large.url ??
            recipe.attributes.image.data.attributes.url
          }`
        : undefined,
    },
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
        'cookTime',
        'description',
        'id',
        'locale',
        'prepTime',
        'publishedAt',
        'ratingCount',
        'restingTime',
        'servings',
        'slug',
        'title',
      ],
      filters: { slug },
      locale,
      pagination: { limit: 1 },
      populate: {
        categories: {
          fields: ['id', 'name', 'slug'],
        },
        content: {
          on: {
            'ui.rich-text': {
              fields: ['blocks', 'id'],
            },
          },
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
        image: {
          fields: ['formats', 'height', 'id', 'placeholder', 'url', 'width'],
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
        localizations: {
          fields: ['locale', 'slug'],
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
  });

  if (!recipe) {
    notFound();
  }

  return recipe;
};
