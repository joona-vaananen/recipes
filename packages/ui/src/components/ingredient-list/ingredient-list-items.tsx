'use client';

import { Checkbox, Flex, Heading, Text } from '@radix-ui/themes';
import Fraction from 'fraction.js';

import { useIngredientList } from './ingredient-list-context';

interface IngredientListItemsProps {
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
}

export const IngredientListItems = ({ items }: IngredientListItemsProps) => {
  const { ingredientMultiplier } = useIngredientList();

  return (
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
                      {item.amount && ingredientMultiplier ? (
                        <Text weight={'bold'}>
                          {[
                            new Fraction(
                              item.amount * ingredientMultiplier
                            ).toFraction(true),
                            item.unit,
                          ]
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
  );
};
