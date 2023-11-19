import { Container, Flex, Section } from '@radix-ui/themes';
import { MeiliSearch } from 'meilisearch';
import { useTranslations } from 'next-intl';
import { use } from 'react';

import type { Recipe_Plain } from '@recipes/api/src/api/recipe/content-types/recipe/recipe';
import type { Media } from '@recipes/api/src/common/interfaces/Media';
import { BASE_URL } from '../../constants';
import { buildSearchFilter } from '../../lib/utils/build-search-filter';
import { buildSearchSort } from '../../lib/utils/build-search-sort';
import { Locale, getPathname } from '../../lib/utils/navigation';
import { ItemListJsonLd } from '../structured-data/item-list-json-ld';
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
  locale: string;
  pageSize: number;
  searchClient: any;
  searchParams: Record<string, string | string[] | undefined>;
  sortOrder?: { label: string; options: { name: string; value: string }[] };
  title: string;
}

export const RecipeSearch = ({
  filters,
  locale,
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

  const initialFilters = [`locale IN ["${locale}"]`];

  const parsedPage = recipeSearchPageSchema.parse(searchParams.page);

  const searchResults = use(
    (searchClient as InstanceType<typeof MeiliSearch>)
      .index<Recipe_Plain & { image: Media['attributes'] }>('recipe')
      .searchGet(
        parsedSearch,
        {
          facets: ['*'],
          filter: buildSearchFilter(
            parsedFilters,
            searchConfig.filters,
            initialFilters
          ),
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
    <>
      <RecipeSearchProvider defaultValues={parsedSearchParams}>
        <Section size={'2'}>
          <Container className={'container'}>
            <Flex direction={'column'} gap={'4'}>
              <RecipeSearchTitle
                hitsPerPage={hitsPerPage}
                page={page}
                title={title}
                totalHits={totalHits}
              />
              <Flex align={'center'} justify={'between'}>
                <Flex gap={'4'}>
                  <RecipeSearchDialog
                    totalHits={totalHits}
                    translations={{
                      filters: t('filters'),
                      openFilters: t('openFilters'),
                      resetFilters: t('resetFilters'),
                      showResults: t('showResults'),
                    }}
                  >
                    <Flex asChild direction={'column'} gap={'4'}>
                      <form>
                        <RecipeSearchFilters
                          searchConfig={searchConfig}
                          facetDistribution={facetDistribution}
                          filters={filters}
                        />
                      </form>
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
                    page: t('page'),
                    previousPage: t('previousPage'),
                  }}
                />
              </Flex>
            </Flex>
          </Container>
        </Section>
      </RecipeSearchProvider>
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
