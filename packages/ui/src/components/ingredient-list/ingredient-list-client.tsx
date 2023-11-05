'use client';

import { Checkbox, Flex, Heading, Text, TextField } from '@radix-ui/themes';
import { useState } from 'react';

interface IngredientListClientProps {
  items: {
    id: number;
    items: {
      amount?: number;
      id: number;
      label: string;
      unit?: string;
    }[];
    title?: string;
  }[];
  servings: number;
  translations: {
    servings: string;
  };
}

// TODO: Have a form for servings and validate input against Zod schema?
// TODO: Format amounts with format.number
export const IngredientListClient = ({
  items,
  servings: initialServings,
  translations,
}: IngredientListClientProps) => {
  const [servings, setServings] = useState<number>(initialServings);
  const scale = servings / initialServings;

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(parseInt(event.target.value), 1);
    setServings(value);
  };

  return (
    <Flex direction={'column'} gap={'4'}>
      <Text as={'label'} size={'2'}>
        <Flex align={'center'} gap={'2'}>
          {translations.servings}
          <TextField.Root className={'w-16'}>
            <TextField.Input
              className={'mr-1'}
              onChange={onChange}
              min={1}
              type={'number'}
              value={servings}
            />
          </TextField.Root>
        </Flex>
      </Text>
      <ul>
        {items.map((item) => (
          <li className={'mb-4 last:mb-0'} key={item.id}>
            {item.title ? (
              <Heading as={'h3'} mb={'4'} size={'4'}>
                {item.title}
              </Heading>
            ) : null}
            <ul>
              {item.items.map((item) => (
                <li className={'w-fit'} key={item.id}>
                  <Text as={'label'} size={'2'}>
                    <Flex gap={'2'} width={'auto'}>
                      <Checkbox />
                      <Flex gap={'1'}>
                        {item.amount ? (
                          <Text weight={'bold'}>
                            {[item.amount * scale, item.unit]
                              .filter((attribute) => attribute)
                              .join(' ')}
                          </Text>
                        ) : null}
                        {item.label}
                      </Flex>
                    </Flex>
                  </Text>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Flex>
  );
};
