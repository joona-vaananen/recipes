import { FacetDistribution } from 'meilisearch';

import { recipeSearchConfig as searchConfig } from './recipe-search-config';
import type { RecipeSearchParamsSchema } from './recipe-search-schemas';
import { RecipeSearchSelectedFilter } from './recipe-search-selected-filter';

interface RecipeSearchSelectedFiltersProps {
  facetDistribution: FacetDistribution | undefined;
  searchFilters: Omit<RecipeSearchParamsSchema, 'search' | 'sort'>;
}

export const RecipeSearchSelectedFilters = ({
  facetDistribution,
  searchFilters,
}: RecipeSearchSelectedFiltersProps) => {
  return Object.entries(searchFilters).flatMap(
    ([searchParamKey, searchParamValue]) => {
      if (
        !(searchParamKey in searchConfig.filters) ||
        searchParamValue === null
      ) {
        return [];
      }

      const { attribute } =
        searchConfig.filters[
          searchParamKey as keyof typeof searchConfig.filters
        ];

      const names = Object.entries(
        facetDistribution?.[`${attribute}.name`] ?? {}
      );

      const slugs = Object.entries(
        facetDistribution?.[`${attribute}.slug`] ?? {}
      );

      const searchParamValues = Array.isArray(searchParamValue)
        ? searchParamValue
        : [searchParamValue];

      return searchParamValues.map((searchParamValue) => {
        const filterIndex = slugs.findIndex(
          ([slug]) => slug === searchParamValue
        );

        if (filterIndex === -1) {
          return null;
        }

        const [name] = names[filterIndex];
        const [slug] = slugs[filterIndex];

        return (
          <RecipeSearchSelectedFilter
            key={slug}
            name={name}
            searchParamKey={searchParamKey}
            slug={slug}
          />
        );
      });
    },
    [] as React.ReactNode[]
  );
};
