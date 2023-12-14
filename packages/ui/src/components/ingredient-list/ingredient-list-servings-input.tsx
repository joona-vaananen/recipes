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

  const min = 1;
  const max = initialServings! * 10;

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      event.target.value = `${Math.min(
        Math.max(parseInt(event.target.value), min),
        max
      )}`;
    }

    onChange(event);
  };

  return (
    <>
      <Text as={'label'} className={'print:hidden'} size={'2'}>
        <Flex align={'center'} gap={'2'}>
          {translations.servingsLabel}
          <TextField.Root className={'w-16'}>
            <TextField.Input
              className={'mr-1'}
              disabled={disabled}
              max={max}
              min={min}
              name={name}
              onBlur={onBlur}
              onChange={onInputChange}
              ref={ref}
              size={'3'}
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
