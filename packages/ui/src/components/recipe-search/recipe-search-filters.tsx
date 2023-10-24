import { Flex } from '@radix-ui/themes';
import type { FacetDistribution } from 'meilisearch';

import type { SelectFilter } from '@recipes/api/src/components/recipe-search/interfaces/SelectFilter';
import { DynamicZone } from '../dynamic-zone';
import type { RecipeSearchConfig } from './recipe-search-config';
import { RecipeSearchSelectFilter } from './recipe-search-select-filter';

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
    <Flex className={'w-[300px]'} direction={'column'} gap={'4'} shrink={'0'}>
      <DynamicZone
        components={{
          'recipe-search.select-filter': (props: SelectFilter) => {
            const { name } = props;
            const attribute = searchConfig.filters[name]?.attribute;

            if (!attribute) {
              return null;
            }

            return (
              <RecipeSearchSelectFilter
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
