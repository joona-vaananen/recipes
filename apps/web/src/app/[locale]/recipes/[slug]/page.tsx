import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Inset,
  Section,
  Separator,
} from '@radix-ui/themes';
import { ArrowDown } from 'lucide-react';
import type { Metadata } from 'next';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

import { GENERATE_STATIC_PARAMS } from '@/constants';
import { apiClient } from '@/lib/api/client';
import { searchClient } from '@/lib/search/client';
import {
  CommentForm,
  CommentList,
  DynamicZone,
  Hero,
  IngredientList,
  InstructionList,
  Locale,
  LocaleSwitcherPathnames,
  PrintButton,
  RecipeJsonLd,
  RecipeRating,
  RecipeTags,
  RecipeTime,
  RichText,
  ScrollTo,
  ShareRecipe,
  SimilarRecipeCarousel,
  WakeLockSwitch,
  getPathname,
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

  const t = await getTranslations({ locale, namespace: 'RecipePage' });

  const recipe = await getRecipeData({ params });

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
      <Section className={'print:hidden'} size={'2'}>
        <Container className={'max-w-full'} px={'4'} size={'3'}>
          <Flex
            direction={{
              initial: 'column',
              sm: 'row',
            }}
            gap={'4'}
            justify={'between'}
          >
            <RecipeRating
              anchor={t('ratingAnchor')}
              averageRating={recipe.attributes.averageRating}
              locale={locale}
              ratingCount={recipe.attributes.ratingCount}
              recipe={recipe.id}
            />
            <Box>
              <Button asChild>
                <ScrollTo anchor={t('recipeAnchor')}>
                  {t('jumpToRecipe')}
                  <ArrowDown className={'h-4 w-4'} />
                </ScrollTo>
              </Button>
            </Box>
          </Flex>
        </Container>
      </Section>
      <Box className={'print:hidden'}>
        <DynamicZone
          components={{
            'ui.rich-text': RichText,
          }}
        >
          {recipe.attributes.content}
        </DynamicZone>
      </Box>
      <Container className={'max-w-full'} px={'4'}>
        <Section id={t('recipeAnchor')} size={'2'}>
          <Card>
            <Flex direction={'column'} gap={'8'} p={'4'}>
              <Flex
                align={'center'}
                className={'print:hidden'}
                gap={'4'}
                justify={'between'}
              >
                <WakeLockSwitch />
                <PrintButton />
              </Flex>
              <Grid
                className={'gap-20 sm:gap-10'}
                columns={{
                  initial: '1',
                  sm: '2',
                }}
                gap={'8'}
              >
                <IngredientList
                  items={recipe.attributes.ingredients}
                  servings={recipe.attributes.servings}
                />

                <InstructionList items={recipe.attributes.instructions} />
              </Grid>
            </Flex>
            <Inset className={'print:hidden'} clip={'padding-box'} my={'8'}>
              <Separator size={'4'} />
            </Inset>
            <Flex
              className={'print:hidden'}
              direction={'column'}
              gap={'8'}
              p={'4'}
            >
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
          </Card>
        </Section>
      </Container>
      <SimilarRecipeCarousel
        categories={recipe.attributes.categories}
        className={'print:hidden'}
        cuisines={recipe.attributes.cuisines}
        locale={locale}
        recipe={recipe.id}
        searchClient={searchClient}
      />
      <Container className={'max-w-full print:hidden'} px={'4'}>
        <Grid
          columns={{
            initial: '1',
            sm: '2',
          }}
          gap={'4'}
          p={'4'}
        >
          <CommentForm
            anchor={t('ratingAnchor')}
            locale={locale}
            recipe={recipe}
          />
        </Grid>
        <CommentList
          apiClient={apiClient}
          locale={locale}
          localizations={recipe.attributes.localizations}
          recipe={recipe.id}
        />
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
        ? recipe.attributes.image.data.attributes.formats?.large.url ??
          recipe.attributes.image.data.attributes.url
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

  const { data: recipes } = await apiClient.getMany(
    {
      contentType: 'recipes',
      parameters: {
        fields: ['id', 'slug'],
        locale,
        pagination: { limit: 100 },
        sort: 'publishedAt:desc',
      },
    },
    { cache: 'no-store' }
  );

  return recipes.map((recipe) => ({ slug: recipe.attributes.slug }));
};

const getRecipeData = async ({ params }: PageProps) => {
  const { locale, slug } = params;

  const {
    data: [recipe],
  } = await apiClient.getMany(
    {
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
                fields: [
                  'altAmount',
                  'altUnit',
                  'amount',
                  'content',
                  'id',
                  'unit',
                ],
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
            fields: ['id', 'locale', 'slug'],
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
        publicationState: draftMode().isEnabled ? 'preview' : 'live',
      },
    },
    { next: { revalidate: 600 } }
  );

  if (!recipe) {
    notFound();
  }

  return recipe;
};
