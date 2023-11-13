import { Button, Container, Flex, Heading, Section } from '@radix-ui/themes';
import { MeiliSearch } from 'meilisearch';
import { useTranslations } from 'next-intl';
import { stringify } from 'qs';
import { use } from 'react';

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
import { BREAKPOINTS } from '../../constants';
import { buildSearchFilter } from '../../lib';
import { buildSearchSort } from '../../lib/utils/build-search-sort';
import { Link } from '../../lib/utils/navigation';
import { resolveSearchParams } from '../../lib/utils/resolve-search-params';
import { RecipeCard } from '../recipe-card';
import { recipeSearchConfig as searchConfig } from '../recipe-search/recipe-search-config';
import { RecipeCarouselClient } from './recipe-carousel-client';

export interface RecipeCarouselProps {
  categories?: { data: Category[] } | undefined;
  courses?: { data: Course[] } | undefined;
  cuisines?: { data: Cuisine[] } | undefined;
  diets?: { data: Diet[] } | undefined;
  initialFilters?: string[];
  limit?: number;
  mainIngredients?: { data: MainIngredient[] } | undefined;
  mealTypes?: { data: MealType[] } | undefined;
  methods?: { data: Method[] } | undefined;
  searchClient: any;
  seasons?: { data: Season[] } | undefined;
  sort?: 'created-at-asc' | 'created-at-desc' | 'title-asc' | 'title-desc';
  title?: string;
}

export const RecipeCarousel = ({
  categories,
  courses,
  cuisines,
  diets,
  initialFilters,
  mainIngredients,
  mealTypes,
  methods,
  seasons,
  limit,
  searchClient,
  sort,
  title,
}: RecipeCarouselProps) => {
  const t = useTranslations('RecipeCarousel');

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

  const searchResults = use(
    (searchClient as InstanceType<typeof MeiliSearch>)
      .index<Recipe_Plain & { image: Media['attributes'] }>('recipe')
      .searchGet('', {
        filter: buildSearchFilter(
          searchParams,
          searchConfig.filters,
          initialFilters
        ),
        hitsPerPage: limit ?? 15,
        page: 1,
        sort: buildSearchSort(sort, searchConfig.sort) ?? ['createdAt:desc'],
      })
  );

  if (searchResults.totalHits === 0) {
    return null;
  }

  return (
    <Section
      className={'overflow-hidden'}
      size={{
        initial: '2',
        sm: '3',
      }}
    >
      <Container className={'container'}>
        <Flex justify={'between'}>
          {title ? (
            <Heading as={'h2'} mb={'7'} size={'7'}>
              {title}
            </Heading>
          ) : null}
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
        </Flex>
        <RecipeCarouselClient>
          <ol className={'embla__container -ml-3 flex'}>
            {searchResults.hits.map(({ id, image, slug, title }) => (
              <li
                className={
                  'embla__slide min-w-0 flex-shrink-0 flex-grow-0 basis-full pl-3 sm:basis-1/2 md:basis-1/3'
                }
                key={id}
              >
                <RecipeCard
                  image={image}
                  sizes={[
                    `(max-width: ${BREAKPOINTS.sm - 1}px) 100vw`,
                    `(max-width: ${BREAKPOINTS.md - 1}px) 50vw`,
                    '33vw',
                  ].join(', ')}
                  slug={slug}
                  title={title}
                />
              </li>
            ))}
          </ol>
        </RecipeCarouselClient>
      </Container>
    </Section>
  );
};
