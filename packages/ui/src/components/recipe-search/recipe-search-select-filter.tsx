'use client';

import { Card, Flex, Inset, ScrollArea, Text } from '@radix-ui/themes';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from 'cmdk';
import { Check, Search } from 'lucide-react';
import type { FacetDistribution } from 'meilisearch';

import type { SelectFilter } from '@recipes/api/src/components/recipe-search/interfaces/SelectFilter';

interface RecipeSearchSelectFilterProps extends SelectFilter {
  facetDistribution: FacetDistribution | undefined;
}

export const RecipeSearchSelectFilter = ({
  attribute,
  facetDistribution,
  label, // multiple,
}: RecipeSearchSelectFilterProps) => {
  const names = Object.entries(facetDistribution?.[`${attribute}.name`] ?? {});
  const slugs = Object.entries(facetDistribution?.[`${attribute}.slug`] ?? {});

  return (
    <Flex direction={'column'} gap={'3'}>
      <Text as={'label'} weight={'bold'}>
        {label}
      </Text>
      <Card>
        <Command className={'flex flex-col gap-3'}>
          <div className={'relative z-0 box-border flex cursor-text'}>
            <div
              className={
                'relative z-10 flex shrink-0 items-center gap-2 pl-2 pr-2 text-grayA-11'
              }
            >
              <Search size={'16'} />
            </div>
            <CommandInput
              className={
                'peer relative z-10 box-border block h-8 w-full appearance-none rounded-2 border-[1px] border-solid border-transparent bg-transparent p-0 pb-px pt-0 text-2 tracking-2 text-gray-12 outline-none'
              }
              placeholder={'Type a command or search...'}
              spellCheck={false}
            />
            <div
              className={
                'pointer-events-none absolute inset-0 z-0 rounded-2 bg-[color:var(--color-surface)] bg-clip-content p-px shadow-[inset_0_0_0_1px_var(--gray-a7)] peer-focus:outline peer-focus:outline-2 peer-focus:-outline-offset-1 peer-focus:outline-accent-8'
              }
            ></div>
          </div>
          <CommandList>
            <CommandEmpty>{'No results found.'}</CommandEmpty>
            <Inset clip={'padding-box'} py={'current'}>
              <ScrollArea
                className={'max-h-[192px] px-3'}
                scrollbars={'vertical'}
                type={'auto'}
              >
                <CommandGroup>
                  {names.map(([name, count], index) => {
                    const [slug] = slugs[index];

                    return (
                      <CommandItem
                        className={
                          'relative box-border flex h-8 cursor-default select-none scroll-mx-0 scroll-mb-2 scroll-mt-2 items-center rounded-2 pl-6 pr-6 text-2 leading-2 tracking-2 outline-none hover:bg-accent-9 hover:text-accent-9-contrast'
                        }
                        key={slug}
                      >
                        <span
                          className={
                            'absolute left-0 inline-flex w-6 items-center justify-center'
                          }
                        >
                          <Check size={16} />
                        </span>
                        {name}
                        <span className={'ml-auto text-1'}>{count}</span>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </ScrollArea>
            </Inset>
          </CommandList>
        </Command>
      </Card>
    </Flex>
  );
};
