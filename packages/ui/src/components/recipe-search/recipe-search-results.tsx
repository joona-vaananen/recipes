'use client';

import { Grid, Text } from '@radix-ui/themes';
import type { Hits } from 'meilisearch';

import type { Recipe_Plain } from '@recipes/api/src/api/recipe/content-types/recipe/recipe';
import type { Media } from '@recipes/api/src/common/interfaces/Media';
import { BREAKPOINTS } from '../../constants';
import { RecipeCard } from '../recipe-card';
import { RecipeCardSkeleton } from '../recipe-card-skeleton';
import { useRecipeSearch } from './recipe-search-context';

interface RecipeSearchResultsProps {
  hits: Hits<
    Recipe_Plain & {
      image: Media['attributes'];
    }
  >;
  hitsPerPage: number;
  totalHits: number;
  translations: {
    noResults: string;
    scoreUnit: string;
  };
}

export const RecipeSearchResults = ({
  hits,
  hitsPerPage,
  totalHits,
  translations,
}: RecipeSearchResultsProps) => {
  const { isSearching } = useRecipeSearch();

  if (isSearching) {
    return (
      <Grid
        asChild
        columns={{
          initial: '1',
          sm: '2',
          md: '3',
        }}
        gap={'4'}
        mt={'2'}
      >
        <ol>
          {Array.from(
            { length: Math.min(hitsPerPage, totalHits) },
            (_, index) => (
              <li key={index}>
                <RecipeCardSkeleton />
              </li>
            )
          )}
        </ol>
      </Grid>
    );
  }

  const isEmpty = !Array.isArray(hits) || hits.length === 0;

  if (isEmpty) {
    return (
      <Text as={'p'} mt={'2'} size={'5'}>
        {translations.noResults}
      </Text>
    );
  }

  return (
    <Grid
      asChild
      columns={{
        initial: '1',
        sm: '2',
        md: '3',
      }}
      gap={'4'}
      mt={'2'}
    >
      <ol>
        {hits.map(
          ({
            averageRating,
            categories,
            cookTime,
            id,
            image,
            prepTime,
            restingTime,
            title,
            slug,
          }) => (
            <li key={id}>
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
                translations={translations}
              />
            </li>
          )
        )}
      </ol>
    </Grid>
  );
};
