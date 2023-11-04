'use client';

import { TextField } from '@radix-ui/themes';
import debounce from 'lodash.debounce';
import { Search } from 'lucide-react';
import { useEffect } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import type { RecipeSearchParamsSchema } from './recipe-search-schemas';

interface RecipeSearchInputProps {
  translations: {
    inputPlaceholder: string;
  };
}

export const RecipeSearchInput = ({ translations }: RecipeSearchInputProps) => {
  const { control, setValue } = useFormContext<RecipeSearchParamsSchema>();
  const { field } = useController({ name: 'search', control });
  const { disabled, name, onBlur, ref, value } = field;

  const onChange = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(name, event.target.value);
  }, 500);

  useEffect(() => {
    return () => {
      onChange.cancel();
    };
  }, [onChange]);

  return (
    <TextField.Root>
      <TextField.Slot>
        <Search size={16} />
      </TextField.Slot>
      <TextField.Input
        className={
          '[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none'
        }
        defaultValue={value ?? ''}
        disabled={disabled}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        placeholder={translations.inputPlaceholder}
        ref={ref}
        type={'search'}
      />
    </TextField.Root>
  );
};
