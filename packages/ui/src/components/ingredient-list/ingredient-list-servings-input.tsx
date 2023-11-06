'use client';

import { Flex, Text, TextField } from '@radix-ui/themes';
import { useController, useFormContext } from 'react-hook-form';

import type { IngredientListSchema } from './ingredient-list-schema';

interface IngredientListServingsInputProps {
  translations: {
    servings: string;
  };
}

export const IngredientListServingsInput = ({
  translations,
}: IngredientListServingsInputProps) => {
  const { formState, control } = useFormContext<IngredientListSchema>();
  const { servings: initialServings } = formState.defaultValues ?? {};
  const { field } = useController({ name: 'servings', control });
  const { disabled, name, onBlur, onChange, ref, value } = field;

  return (
    <Text as={'label'} size={'2'}>
      <Flex align={'center'} gap={'2'}>
        {translations.servings}
        <TextField.Root className={'w-16'}>
          <TextField.Input
            className={'mr-1'}
            disabled={disabled}
            max={initialServings! * 10}
            min={1}
            name={name}
            onBlur={onBlur}
            onChange={onChange}
            ref={ref}
            type={'number'}
            value={value}
          />
        </TextField.Root>
      </Flex>
    </Text>
  );
};
