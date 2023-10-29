import { Flex } from '@radix-ui/themes';
import { MeiliSearch } from 'meilisearch';
import { useTranslations } from 'next-intl';
import { use } from 'react';

import type { Recipe_Plain } from '@recipes/api/src/api/recipe/content-types/recipe/recipe';
import type { Media } from '@recipes/api/src/common/interfaces/Media';
import { buildSearchSort } from '../../lib';
import { buildSearchFilter } from '../../lib/utils/build-search-filter';
import { recipeSearchConfig as searchConfig } from './recipe-search-config';
import { RecipeSearchProvider } from './recipe-search-context';
import { RecipeSearchFilters } from './recipe-search-filters';
import { RecipeSearchPagination } from './recipe-search-pagination';
import { RecipeSearchResetButton } from './recipe-search-reset-button';
import { RecipeSearchResults } from './recipe-search-results';
import {
  recipeSearchPageSchema,
  recipeSearchParamsSchema,
} from './recipe-search-schemas';
import { RecipeSearchSortOrder } from './recipe-search-sort-order';
import { RecipeSearchTitle } from './recipe-search-title';

const DEFAULT_PAGE_SIZE = 15;

interface RecipeSearchProps {
  children: React.ReactNode;
  filters: any;
  pageSize: number;
  searchClient: any;
  searchParams: Record<string, string | string[] | undefined>;
  sortOrder?: { label: string; options: { name: string; value: string }[] };
  title: string;
}

export const RecipeSearch = ({
  children,
  filters,
  pageSize,
  searchClient,
  searchParams,
  sortOrder,
  title,
}: RecipeSearchProps) => {
  const t = useTranslations('RecipeSearch');

  const parsedSearchParams = recipeSearchParamsSchema.parse(searchParams);
  const { sort: parsedSort, ...parsedFilters } = parsedSearchParams;

  const parsedPage = recipeSearchPageSchema.parse(searchParams.page);

  const searchResults = use(
    (searchClient as InstanceType<typeof MeiliSearch>)
      .index<Recipe_Plain & { image: Media['attributes'] }>('recipe')
      .searchGet(
        '',
        {
          facets: ['*'],
          filter: buildSearchFilter(parsedFilters, searchConfig.filters),
          hitsPerPage: pageSize ?? DEFAULT_PAGE_SIZE,
          page: parsedPage,
          sort: buildSearchSort(parsedSort, searchConfig.sort),
        },
        { cache: 'no-store' }
      )
  );

  const { facetDistribution, hits, hitsPerPage, page, totalHits, totalPages } =
    searchResults;

  return (
    <RecipeSearchProvider defaultValues={parsedSearchParams}>
      <Flex gap={'4'} p={'4'}>
        <Flex direction={'column'} gap={'4'}>
          <RecipeSearchResetButton
            translations={{
              reset: t('reset'),
            }}
          />
          <RecipeSearchFilters
            searchConfig={searchConfig}
            facetDistribution={facetDistribution}
            filters={filters}
          />
        </Flex>
        <Flex direction={'column'} gap={'4'}>
          <Flex align={'center'} justify={'between'}>
            <RecipeSearchTitle
              hitsPerPage={hitsPerPage}
              page={page}
              title={title}
              totalHits={totalHits}
            />
            {sortOrder ? (
              <RecipeSearchSortOrder
                label={sortOrder.label}
                options={sortOrder.options}
              />
            ) : null}
          </Flex>
          <RecipeSearchResults hits={hits} />
          <Flex justify={'center'}>
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
      </Flex>
      {children}
      <pre className={'whitespace-pre-wrap'}>
        {JSON.stringify(searchResults, null, 2)}
      </pre>
    </RecipeSearchProvider>
  );
};
