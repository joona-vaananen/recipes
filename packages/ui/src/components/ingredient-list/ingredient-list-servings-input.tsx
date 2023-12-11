'use client';

import { Flex, Text, TextField } from '@radix-ui/themes';
import { useFormatter } from 'next-intl';
import { useController, useFormContext } from 'react-hook-form';

import type { IngredientListSchema } from './ingredient-list-schema';

interface IngredientListServingsInputProps {
  translations: {
    servingPlural: string;
    servingSingular: string;
    servingsLabel: string;
  };
}

export const IngredientListServingsInput = ({
  translations,
}: IngredientListServingsInputProps) => {
  const { formState, control } = useFormContext<IngredientListSchema>();
  const { servings: initialServings } = formState.defaultValues ?? {};
  const { field } = useController({ name: 'servings', control });
  const { disabled, name, onBlur, onChange, ref, value } = field;
  const format = useFormatter();

  return (
    <>
      <Text as={'label'} className={'print:hidden'} size={'2'}>
        <Flex align={'center'} gap={'2'}>
          {translations.servingsLabel}
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
      <Text className={'hidden print:block'} weight={'bold'}>
        {`${format.number(value!)} ${
          value === 1
            ? translations.servingSingular
            : translations.servingPlural
        }`}
      </Text>
    </>
  );
};
