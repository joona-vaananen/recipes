import { MeiliSearch } from 'meilisearch';

import { Flex } from '@radix-ui/themes';
import type { Recipe_Plain } from '@recipes/api/src/api/recipe/content-types/recipe/recipe';
import type { Media } from '@recipes/api/src/common/interfaces/Media';
import { recipeSearchConfig as searchConfig } from './recipe-search-config';
import { RecipeSearchProvider } from './recipe-search-context';
import { RecipeSearchFilters } from './recipe-search-filters';
import { RecipeSearchResults } from './recipe-search-results';

interface RecipeSearchProps {
  children: React.ReactNode;
  filters: any;
  searchClient: any;
  searchParams: Record<string, string | string[] | undefined>;
}

export const RecipeSearch = async ({
  children,
  filters,
  searchClient,
  searchParams,
}: RecipeSearchProps) => {
  const searchResults = await (searchClient as InstanceType<typeof MeiliSearch>)
    .index<Recipe_Plain & { image: Media['attributes'] }>('recipe')
    .searchGet(
      '',
      {
        facets: ['*'],
        filter: '',
        hitsPerPage: 15,
        page: 1,
        sort: ['publishedAt:desc'],
      },
      { cache: 'no-store' }
    );

  const { facetDistribution, hits } = searchResults;

  return (
    <RecipeSearchProvider searchParams={searchParams}>
      <Flex gap={'4'} p={'4'}>
        <RecipeSearchFilters
          searchConfig={searchConfig}
          facetDistribution={facetDistribution}
          filters={filters}
        />
        <RecipeSearchResults hits={hits} />
      </Flex>
      {children}
      <pre className={'whitespace-pre-wrap'}>
        {JSON.stringify(searchResults, null, 2)}
      </pre>
    </RecipeSearchProvider>
  );
};
