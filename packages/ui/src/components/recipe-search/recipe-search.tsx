'use client';

import { SearchResponse } from 'meilisearch';

import { Flex, Select, TextField } from '@radix-ui/themes';
import type { Recipe_Plain } from '@recipes/api/src/api/recipe/content-types/recipe/recipe';
import type { Media } from '@recipes/api/src/common/interfaces/Media';
import type { SelectFilter } from '@recipes/api/src/components/recipe-search/interfaces/SelectFilter';
import { Search } from 'lucide-react';
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
  facetDistribution,
  filters,
  hits,
}: RecipeSearchProps) => {
  return (
    <RecipeSearchProvider>
      <Flex gap={'4'} p={'4'}>
        <Flex
          className={'w-[300px]'}
          direction={'column'}
          gap={'4'}
          shrink={'0'}
        >
          <Select.Root defaultValue="apple">
            <Select.Trigger />
            <Select.Content>
              <Select.Group>
                <Select.Label>Fruits</Select.Label>
                <Select.Item value="orange">Orange</Select.Item>
                <Select.Item value="apple">Apple</Select.Item>
                <Select.Item value="grape" disabled>
                  Grape
                </Select.Item>
              </Select.Group>
              <Select.Separator />
              <Select.Group>
                <Select.Label>Vegetables</Select.Label>
                <Select.Item value="carrot">Carrot</Select.Item>
                <Select.Item value="potato">Potato</Select.Item>
              </Select.Group>
            </Select.Content>
          </Select.Root>
          <TextField.Root>
            <TextField.Slot>
              <Search size={16} />
            </TextField.Slot>
            <TextField.Input placeholder="Search the docs…" />
          </TextField.Root>
          <DynamicZone
            components={{
              'recipe-search.select-filter': (props: SelectFilter) => (
                <RecipeSearchSelectFilter
                  {...props}
                  facetDistribution={facetDistribution}
                />
              ),
            }}
          >
            {filters}
          </DynamicZone>
        </Flex>
        <RecipeSearchResults hits={hits} />
      </Flex>
      {children}
    </RecipeSearchProvider>
  );
};
