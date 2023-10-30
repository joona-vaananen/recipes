import { Grid, Text } from '@radix-ui/themes';
import type { Hits } from 'meilisearch';

import type { Recipe_Plain } from '@recipes/api/src/api/recipe/content-types/recipe/recipe';
import type { Media } from '@recipes/api/src/common/interfaces/Media';
import { BREAKPOINTS } from '../../constants';
import { RecipeCard } from '../recipe-card';

interface RecipeSearchResultsProps {
  hits: Hits<
    Recipe_Plain & {
      image: Media['attributes'];
    }
  >;
  translations: {
    noResults: string;
  };
}

export const RecipeSearchResults = ({
  hits,
  translations,
}: RecipeSearchResultsProps) => {
  return hits.length > 0 ? (
    <Grid
      asChild
      columns={{
        initial: '1',
        sm: '2',
        md: '3',
      }}
      gap={'4'}
    >
      <ol>
        {hits.map(({ id, image, title, slug }) => (
          <li key={id}>
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
    </Grid>
  ) : (
    <Text as={'p'} size={'5'}>
      {translations.noResults}
    </Text>
  );
};
