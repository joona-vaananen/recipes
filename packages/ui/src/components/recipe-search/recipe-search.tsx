import { Flex } from '@radix-ui/themes';
import { MeiliSearch } from 'meilisearch';
import { useTranslations } from 'next-intl';
import { use } from 'react';

import type { Recipe_Plain } from '@recipes/api/src/api/recipe/content-types/recipe/recipe';
import type { Media } from '@recipes/api/src/common/interfaces/Media';
import { buildSearchFilter } from '../../lib/utils/build-search-filter';
import { recipeSearchConfig as searchConfig } from './recipe-search-config';
import { RecipeSearchProvider } from './recipe-search-context';
import { RecipeSearchFilters } from './recipe-search-filters';
import { recipeSearchFormSchema } from './recipe-search-form-schema';
import { RecipeSearchPagination } from './recipe-search-pagination';
import { RecipeSearchResults } from './recipe-search-results';

interface RecipeSearchProps {
  children: React.ReactNode;
  filters: any;
  searchClient: any;
  searchParams: Record<string, string | string[] | undefined>;
}

export const RecipeSearch = ({
  children,
  filters,
  searchClient,
  searchParams,
}: RecipeSearchProps) => {
  const t = useTranslations('RecipeSearch');

  const parsedSearchParams = recipeSearchFormSchema.parse(searchParams);

  const searchResults = use(
    (searchClient as InstanceType<typeof MeiliSearch>)
      .index<Recipe_Plain & { image: Media['attributes'] }>('recipe')
      .searchGet(
        '',
        {
          facets: ['*'],
          filter: buildSearchFilter(parsedSearchParams, searchConfig),
          hitsPerPage: 3,
          // TODO: Handle page properly, perhaps parse against Zod schema
          page:
            (typeof searchParams.page === 'string' &&
              parseInt(searchParams.page)) ||
            1,
          sort: ['publishedAt:desc'],
        },
        { cache: 'no-store' }
      )
  );

  const { facetDistribution, hits, page, totalHits, totalPages } =
    searchResults;

  return (
    <RecipeSearchProvider defaultValues={parsedSearchParams}>
      <Flex gap={'4'} p={'4'}>
        <RecipeSearchFilters
          searchConfig={searchConfig}
          facetDistribution={facetDistribution}
          filters={filters}
        />
        <Flex align={'center'} direction={'column'} gap={'4'}>
          <RecipeSearchResults hits={hits} />
          <RecipeSearchPagination
            page={page}
            searchParams={parsedSearchParams}
            totalHits={totalHits}
            totalPages={totalPages}
            translations={{
              nextPage: t('nextPage'),
              page: t('page', { page, totalPages }),
              previousPage: t('previousPage'),
            }}
          />
        </Flex>
      </Flex>
      {children}
      <pre className={'whitespace-pre-wrap'}>
        {JSON.stringify(searchResults, null, 2)}
      </pre>
    </RecipeSearchProvider>
  );
};
