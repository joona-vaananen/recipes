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
import { RecipeSearchDialog } from './recipe-search-dialog';
import { RecipeSearchFilters } from './recipe-search-filters';
import { RecipeSearchInput } from './recipe-search-input';
import { RecipeSearchPagination } from './recipe-search-pagination';
import { RecipeSearchResults } from './recipe-search-results';
import {
  recipeSearchPageSchema,
  recipeSearchParamsSchema,
} from './recipe-search-schemas';
import { RecipeSearchSelectedFilters } from './recipe-search-selected-filters';
import { RecipeSearchSortOrder } from './recipe-search-sort-order';
import { RecipeSearchTitle } from './recipe-search-title';

const DEFAULT_PAGE_SIZE = 15;

interface RecipeSearchProps {
  filters: any;
  pageSize: number;
  searchClient: any;
  searchParams: Record<string, string | string[] | undefined>;
  sortOrder?: { label: string; options: { name: string; value: string }[] };
  title: string;
}

export const RecipeSearch = ({
  filters,
  pageSize,
  searchClient,
  searchParams,
  sortOrder,
  title,
}: RecipeSearchProps) => {
  const t = useTranslations('RecipeSearch');

  const parsedSearchParams = recipeSearchParamsSchema.parse(searchParams);

  const {
    search: parsedSearch,
    sort: parsedSort,
    ...parsedFilters
  } = parsedSearchParams;

  const parsedPage = recipeSearchPageSchema.parse(searchParams.page);

  const searchResults = use(
    (searchClient as InstanceType<typeof MeiliSearch>)
      .index<Recipe_Plain & { image: Media['attributes'] }>('recipe')
      .searchGet(
        parsedSearch,
        {
          facets: ['*'],
          filter: buildSearchFilter(parsedFilters, searchConfig.filters),
          hitsPerPage: pageSize ?? DEFAULT_PAGE_SIZE,
          page: parsedPage,
          sort: buildSearchSort(
            parsedSort ?? sortOrder?.options[0].value,
            searchConfig.sort
          ) ?? ['createdAt:desc'],
        },
        { cache: 'no-store' }
      )
  );

  const { facetDistribution, hits, hitsPerPage, page, totalHits, totalPages } =
    searchResults;

  return (
    <RecipeSearchProvider defaultValues={parsedSearchParams}>
      <Flex direction={'column'} gap={'4'} p={'4'}>
        <RecipeSearchTitle
          hitsPerPage={hitsPerPage}
          page={page}
          title={title}
          totalHits={totalHits}
        />
        <Flex align={'center'} justify={'between'}>
          <Flex gap={'4'}>
            <RecipeSearchDialog
              translations={{
                filters: t('filters'),
                openFilters: t('openFilters'),
                resetFilters: t('resetFilters'),
                showResults: t('showResults', { totalHits }),
              }}
            >
              <Flex direction={'column'} gap={'4'}>
                <RecipeSearchFilters
                  searchConfig={searchConfig}
                  facetDistribution={facetDistribution}
                  filters={filters}
                />
              </Flex>
            </RecipeSearchDialog>
            <RecipeSearchInput
              translations={{
                inputPlaceholder: t('inputPlaceholder'),
              }}
            />
          </Flex>
          {sortOrder ? (
            <RecipeSearchSortOrder
              label={sortOrder.label}
              options={sortOrder.options}
            />
          ) : null}
        </Flex>
        <RecipeSearchSelectedFilters
          facetDistribution={facetDistribution}
          searchFilters={parsedFilters}
        />
        <RecipeSearchResults
          hits={hits}
          hitsPerPage={hitsPerPage}
          totalHits={totalHits}
          translations={{
            noResults: t('noResults'),
          }}
        />
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
    </RecipeSearchProvider>
  );
};
