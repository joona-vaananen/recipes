'use client';

import { Button } from '@radix-ui/themes';
import { useController, useFormContext } from 'react-hook-form';

import { X } from 'lucide-react';
import type { RecipeSearchParamsSchema } from './recipe-search-schemas';

interface RecipeSearchSelectedFilterProps {
  name: string;
  searchParamKey: string;
  slug: string;
}

export const RecipeSearchSelectedFilter = ({
  name,
  searchParamKey,
  slug,
}: RecipeSearchSelectedFilterProps) => {
  const { control, setValue } = useFormContext<RecipeSearchParamsSchema>();
  const { field } = useController({ name: searchParamKey as any, control });
  const { value } = field;
  const values = typeof value === 'string' ? [value] : value;

  return (
    <Button
      onClick={() =>
        setValue(
          searchParamKey as any,
          Array.isArray(values)
            ? values.filter((value) => value !== slug)
            : null
        )
      }
      variant={'soft'}
    >
      {name}
      <X size={16} />
    </Button>
  );
};
