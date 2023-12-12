'use client';

import { TextField } from '@radix-ui/themes';
import debounce from 'lodash.debounce';
import { Search } from 'lucide-react';
import { useEffect } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { cn } from '../../lib/utils/cn';
import type { RecipeSearchParamsSchema } from './recipe-search-schemas';

interface RecipeSearchInputProps
  extends React.ComponentPropsWithoutRef<typeof TextField.Root> {
  translations: {
    inputPlaceholder: string;
  };
}

export const RecipeSearchInput = ({
  className,
  translations,
  ...props
}: RecipeSearchInputProps) => {
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
    <TextField.Root
      className={cn('w-80 flex-grow sm:flex-grow-0', className)}
      {...props}
    >
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
        size={'3'}
        type={'search'}
      />
    </TextField.Root>
  );
};
