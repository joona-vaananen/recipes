'use client';

import { Flex, Select, Text } from '@radix-ui/themes';
import { useController, useFormContext } from 'react-hook-form';

import { RecipeSearchParamsSchema } from './recipe-search-schemas';

interface RecipeSearchSortOrderProps {
  label: string;
  options: {
    name: string;
    value: string;
  }[];
}

export const RecipeSearchSortOrder = ({
  label,
  options,
}: RecipeSearchSortOrderProps) => {
  const { control, setValue } = useFormContext<RecipeSearchParamsSchema>();
  const { field } = useController({ name: 'sort', control });
  const { disabled, name, ref, value } = field;

  const onValueChange = (value: string) => {
    setValue(name, value);
  };

  return (
    <Text as={'label'} size={'2'}>
      <Flex align={'center'} gap={'2'}>
        {label}
        <Select.Root
          disabled={disabled}
          onValueChange={onValueChange}
          value={value ?? undefined}
        >
          <Select.Trigger ref={ref} />
          <Select.Content>
            {options.map((option) => (
              <Select.Item key={option.value} value={option.value}>
                {option.name}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </Flex>
    </Text>
  );
};
