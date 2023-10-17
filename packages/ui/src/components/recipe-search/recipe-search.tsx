import { SearchResponse } from 'meilisearch';

import { Container } from '@radix-ui/themes';
import type { Recipe_Plain } from '@recipes/api/src/api/recipe/content-types/recipe/recipe';
import type { Media } from '@recipes/api/src/common/interfaces/Media';
import { DynamicZone } from '../dynamic-zone';
import { RecipeSearchProvider } from './recipe-search-context';
import { RecipeSearchResults } from './recipe-search-results';
import { RecipeSearchSelectFilter } from './recipe-search-select-filter';

interface RecipeSearchProps
  extends SearchResponse<
    Recipe_Plain & {
      image: Media['attributes'];
    },
    {
      facets: string[];
      filter: string;
      hitsPerPage: number;
      page: number;
      sort: string[];
    }
  > {
  children: React.ReactNode;
  filters: any;
}

export const RecipeSearch = ({
  children,
  filters,
  hits,
}: RecipeSearchProps) => {
  return (
    <RecipeSearchProvider>
      <Container className={'container'} px={'4'}>
        <DynamicZone
          components={{
            'recipe-search.select-filter': RecipeSearchSelectFilter,
          }}
        >
          {filters}
        </DynamicZone>
        <RecipeSearchResults hits={hits} />
        {children}
      </Container>
    </RecipeSearchProvider>
  );
};
