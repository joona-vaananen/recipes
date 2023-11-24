'use client';

import { Button, DropdownMenu, Flex, Text } from '@radix-ui/themes';
import { ChevronDown } from 'lucide-react';
import { useController, useFormContext } from 'react-hook-form';

import { RecipeSearchParamsSchema } from './recipe-search-schemas';

interface RecipeSearchSortOrderProps {
  className: string;
  label: string;
  options: {
    name: string;
    value: string;
  }[];
}

export const RecipeSearchSortOrder = ({
  className,
  label,
  options,
}: RecipeSearchSortOrderProps) => {
  const { control, setValue } = useFormContext<RecipeSearchParamsSchema>();
  const { field } = useController({ name: 'sort', control });
  const { disabled, name, ref, value } = field;

  const onCheckedChange = (_checked: boolean, value: string) => {
    setValue(name, value);
  };

  return (
    <Text as={'label'} className={className} size={'2'}>
      <Flex align={'center'} gap={'2'}>
        {label}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger disabled={disabled} ref={ref}>
            <Button variant={'outline'}>
              {options.find((option) => option.value === value)?.name ??
                options[0].name}
              <ChevronDown size={16} />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            {options.map((option, index) => (
              <DropdownMenu.CheckboxItem
                checked={value ? option.value === value : index === 0}
                key={option.value}
                onCheckedChange={(checked) =>
                  onCheckedChange(checked, option.value)
                }
              >
                {option.name}
              </DropdownMenu.CheckboxItem>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Flex>
    </Text>
  );
};
