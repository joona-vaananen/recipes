import { Flex } from '@radix-ui/themes';
import type { FacetDistribution } from 'meilisearch';

import { DynamicZone } from '../dynamic-zone';
import { RecipeSearchCheckboxFilter } from './recipe-search-checkbox-filter';
import type { RecipeSearchConfig } from './recipe-search-config';

interface RecipeSearchFiltersProps {
  facetDistribution: FacetDistribution | undefined;
  filters: any;
  searchConfig: RecipeSearchConfig;
}

export const RecipeSearchFilters = ({
  facetDistribution,
  filters,
  searchConfig,
}: RecipeSearchFiltersProps) => {
  return (
    <Flex direction={'column'} gap={'4'} p={'5'} shrink={'0'}>
      <DynamicZone
        components={{
          'recipe-search.checkbox-filter': (props: any) => {
            const { name } = props;

            if (!(name in searchConfig.filters)) {
              return null;
            }

            const { attribute } =
              searchConfig.filters[name as keyof typeof searchConfig.filters];

            return (
              <RecipeSearchCheckboxFilter
                {...props}
                attribute={attribute}
                facetDistribution={facetDistribution}
              />
            );
          },
        }}
      >
        {filters}
      </DynamicZone>
    </Flex>
  );
};
