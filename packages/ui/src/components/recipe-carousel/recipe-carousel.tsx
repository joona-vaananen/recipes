import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Section,
} from '@radix-ui/themes';
import { MeiliSearch } from 'meilisearch';
import { getTranslations } from 'next-intl/server';
import { stringify } from 'qs';

import type { Category } from '@recipes/api/src/api/category/content-types/category/category';
import type { Course } from '@recipes/api/src/api/course/content-types/course/course';
import type { Cuisine } from '@recipes/api/src/api/cuisine/content-types/cuisine/cuisine';
import type { Diet } from '@recipes/api/src/api/diet/content-types/diet/diet';
import type { MainIngredient } from '@recipes/api/src/api/main-ingredient/content-types/main-ingredient/main-ingredient';
import type { MealType } from '@recipes/api/src/api/meal-type/content-types/meal-type/meal-type';
import type { Method } from '@recipes/api/src/api/method/content-types/method/method';
import type { Recipe_Plain } from '@recipes/api/src/api/recipe/content-types/recipe/recipe';
import type { Season } from '@recipes/api/src/api/season/content-types/season/season';
import type { Media } from '@recipes/api/src/common/interfaces/Media';
import { ArrowRight } from 'lucide-react';
import { BASE_URL, BREAKPOINTS } from '../../constants';
import { buildSearchFilter } from '../../lib/utils/build-search-filter';
import { buildSearchSort } from '../../lib/utils/build-search-sort';
import { cn } from '../../lib/utils/cn';
import { Link, getPathname, type Locale } from '../../lib/utils/navigation';
import { resolveSearchParams } from '../../lib/utils/resolve-search-params';
import { RecipeCard } from '../recipe-card';
import { recipeSearchConfig as searchConfig } from '../recipe-search/recipe-search-config';
import { ItemListJsonLd } from '../structured-data/item-list-json-ld';
import { RecipeCarouselClient } from './recipe-carousel-client';

export interface RecipeCarouselProps
  extends React.ComponentPropsWithoutRef<typeof Section> {
  categories?: { data: Category[] } | undefined;
  courses?: { data: Course[] } | undefined;
  cuisines?: { data: Cuisine[] } | undefined;
  diets?: { data: Diet[] } | undefined;
  initialFilters?: string[];
  limit?: number;
  locale: string;
  mainIngredients?: { data: MainIngredient[] } | undefined;
  mealTypes?: { data: MealType[] } | undefined;
  methods?: { data: Method[] } | undefined;
  searchClient: any;
  seasons?: { data: Season[] } | undefined;
  sort?:
    | 'average-rating-asc'
    | 'average-rating-desc'
    | 'published-at-asc'
    | 'published-at-desc'
    | 'title-asc'
    | 'title-desc';
  title?: string;
}

export const RecipeCarousel = async ({
  categories,
  courses,
  cuisines,
  diets,
  initialFilters,
  limit,
  locale,
  mainIngredients,
  mealTypes,
  methods,
  searchClient,
  seasons,
  sort,
  title,
  ...props
}: RecipeCarouselProps) => {
  const t = await getTranslations({ locale, namespace: 'RecipeCarousel' });

  const searchParams = resolveSearchParams(
    {
      categories,
      courses,
      cuisines,
      diets,
      mainIngredients,
      mealTypes,
      methods,
      seasons,
    },
    searchConfig.filters
  );

  const initialFiltersWithLocale = [
    `locale IN ["${locale}"]`,
    ...(initialFilters ?? []),
  ];

  const searchResults = await (searchClient as InstanceType<typeof MeiliSearch>)
    .index<Recipe_Plain & { image: Media['attributes'] }>('recipe')
    .searchGet(
      '',
      {
        filter: buildSearchFilter(
          searchParams,
          searchConfig.filters,
          initialFiltersWithLocale
        ),
        hitsPerPage: limit ?? 15,
        page: 1,
        sort: buildSearchSort(sort, searchConfig.sort) ?? ['publishedAt:desc'],
      },
      { next: { revalidate: 300 } } as any
    );

  if (!Array.isArray(searchResults.hits) || searchResults.hits.length === 0) {
    return null;
  }

  return (
    <>
      <Section className={'overflow-hidden'} size={'2'} {...props}>
        <Container className={'max-w-full'} px={'4'}>
          <Flex
            className={cn([
              'before:pointer-events-none before:absolute before:right-full before:top-0 before:z-10 before:h-full before:w-[calc((100vw-100%)/2)] before:bg-gradient-to-l before:from-transparent before:to-[var(--color-page-background)]',
              'after:pointer-events-none after:absolute after:left-full after:top-0 after:z-10 after:h-full after:w-[calc((100vw-100%)/2)] after:bg-gradient-to-r after:from-transparent after:to-[var(--color-page-background)]',
            ])}
            direction={'column'}
            gap={'4'}
            position={'relative'}
          >
            <Flex justify={'between'}>
              {title ? (
                <Heading as={'h2'} size={'7'}>
                  {title}
                </Heading>
              ) : null}
              <Box className={'hidden sm:block'}>
                <Button asChild>
                  <Link
                    href={{
                      pathname: '/recipes',
                      query: stringify(
                        { ...searchParams, sort },
                        {
                          arrayFormat: 'repeat',
                          encodeValuesOnly: true,
                          skipNulls: true,
                        }
                      ),
                    }}
                  >
                    {t('viewMore')}
                    <ArrowRight className={'h-4 w-4'} />
                  </Link>
                </Button>
              </Box>
            </Flex>
            <RecipeCarouselClient>
              <ol className={'embla__container -ml-3 flex'}>
                {searchResults.hits.map(
                  ({
                    averageRating,
                    categories,
                    cookTime,
                    id,
                    image,
                    prepTime,
                    restingTime,
                    slug,
                    title,
                  }) => (
                    <li
                      className={
                        'embla__slide min-w-0 flex-shrink-0 flex-grow-0 basis-full pl-3 sm:basis-1/2 md:basis-1/3'
                      }
                      key={id}
                    >
                      <RecipeCard
                        averageRating={averageRating}
                        categories={categories}
                        cookTime={cookTime}
                        image={image}
                        prepTime={prepTime}
                        restingTime={restingTime}
                        sizes={[
                          `(max-width: ${BREAKPOINTS.sm - 1}px) 100vw`,
                          `(max-width: ${BREAKPOINTS.md - 1}px) 50vw`,
                          '33vw',
                        ].join(', ')}
                        slug={slug}
                        title={title}
                      />
                    </li>
                  )
                )}
              </ol>
            </RecipeCarouselClient>
            <Box className={'sm:hidden'}>
              <Button asChild>
                <Link
                  href={{
                    pathname: '/recipes',
                    query: stringify(
                      { ...searchParams, sort },
                      {
                        arrayFormat: 'repeat',
                        encodeValuesOnly: true,
                        skipNulls: true,
                      }
                    ),
                  }}
                >
                  {t('viewMore')}
                  <ArrowRight className={'h-4 w-4'} />
                </Link>
              </Button>
            </Box>
          </Flex>
        </Container>
      </Section>
      <ItemListJsonLd
        listItems={searchResults.hits.map((hit) => ({
          url: `${BASE_URL}/${locale}${getPathname({
            locale: locale as Locale,
            href: { pathname: '/recipes/[slug]', params: { slug: hit.slug } },
          })}`,
        }))}
      />
    </>
  );
};
