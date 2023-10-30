'use client';

import {
  Card,
  Checkbox,
  Flex,
  Inset,
  ScrollArea,
  Text,
} from '@radix-ui/themes';
import type { FacetDistribution } from 'meilisearch';

import type { SelectFilter } from '@recipes/api/src/components/recipe-search/interfaces/SelectFilter';
import { useController, useFormContext } from 'react-hook-form';
import { RecipeSearchParamsSchema } from './recipe-search-schemas';

interface RecipeSearchSelectFilterProps extends SelectFilter {
  attribute: string;
  facetDistribution: FacetDistribution | undefined;
}

export const RecipeSearchSelectFilter = ({
  attribute,
  facetDistribution,
  label,
  name,
}: RecipeSearchSelectFilterProps) => {
  const { control, setValue } = useFormContext<RecipeSearchParamsSchema>();
  const { field } = useController({ name, control });
  const { disabled, ref, value } = field;
  const values = typeof value === 'string' ? [value] : value;

  const names = Object.entries(facetDistribution?.[`${attribute}.name`] ?? {});
  const slugs = Object.entries(facetDistribution?.[`${attribute}.slug`] ?? {});

  const onCheckedChange = (
    checked: boolean | 'indeterminate',
    slug: string
  ) => {
    const hasValue = values?.includes(slug) ?? false;

    if (checked) {
      if (!hasValue) {
        setValue(name, [...(values ?? []), slug]);
      }
    } else if (hasValue) {
      setValue(
        name,
        values!.filter((value) => value !== slug)
      );
    }
  };

  return (
    <Flex asChild direction={'column'} gap={'3'}>
      <fieldset>
        <Text asChild weight={'bold'}>
          <legend>{label}</legend>
        </Text>
        <Card>
          <Inset clip={'padding-box'} py={'current'}>
            <ScrollArea
              className={'max-h-[200px] px-3'}
              scrollbars={'vertical'}
              type={'auto'}
            >
              {names.map(([name, count], index) => {
                const [slug] = slugs[index];

                return (
                  <Text as={'label'} key={slug} size={'2'}>
                    <Flex gap={'2'}>
                      <Checkbox
                        checked={values?.includes(slug) ?? false}
                        disabled={disabled}
                        name={name}
                        onCheckedChange={(checked) =>
                          onCheckedChange(checked, slug)
                        }
                        ref={ref}
                        value={slug}
                      />
                      {name}
                      <span className={'ml-auto text-1'}>{count}</span>
                    </Flex>
                  </Text>
                );
              })}
            </ScrollArea>
          </Inset>
        </Card>
      </fieldset>
    </Flex>
  );
};
