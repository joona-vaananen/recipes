'use client';

import {
  Box,
  Card,
  Checkbox,
  Flex,
  Inset,
  ScrollArea,
  Text,
} from '@radix-ui/themes';
import type { FacetDistribution } from 'meilisearch';

import { useController, useFormContext } from 'react-hook-form';
import { RecipeSearchParamsSchema } from './recipe-search-schemas';

interface RecipeSearchCheckboxFilterProps {
  attribute: string;
  facetDistribution: FacetDistribution | undefined;
  label: string;
  name:
    | 'category'
    | 'course'
    | 'cuisine'
    | 'diet'
    | 'ingredient'
    | 'mealType'
    | 'method'
    | 'season';
}

export const RecipeSearchCheckboxFilter = ({
  attribute,
  facetDistribution,
  label,
  name,
}: RecipeSearchCheckboxFilterProps) => {
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
    <fieldset>
      <Text asChild mb={'1'} weight={'bold'}>
        <legend>{label}</legend>
      </Text>
      <Card>
        <Inset clip={'padding-box'}>
          <ScrollArea
            className={'max-h-[200px]'}
            scrollbars={'vertical'}
            type={'auto'}
          >
            <Box p={'3'}>
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
            </Box>
          </ScrollArea>
        </Inset>
      </Card>
    </fieldset>
  );
};
