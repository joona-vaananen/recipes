'use client';

import { Checkbox, Flex, Text } from '@radix-ui/themes';
import Fraction from 'fraction.js';
import { useState } from 'react';

import { cn } from '../../lib/utils/cn';
import { RichText } from '../rich-text';
import { useIngredientList } from './ingredient-list-context';

interface IngredientListItemProps {
  altAmount?: number;
  altUnit?: string;
  amount?: number;
  content: any;
  unit?: string;
}

export const IngredientListItem = ({
  altAmount,
  altUnit,
  amount,
  content,
  unit,
}: IngredientListItemProps) => {
  const [checked, setChecked] = useState(false);
  const { ingredientMultiplier } = useIngredientList();

  const onCheckedChange = (checked: boolean | 'indeterminate') => {
    if (typeof checked === 'boolean') {
      setChecked(checked);
    }
  };

  return (
    <Text as={'label'}>
      <Flex align={'center'} gap={'2'} width={'auto'}>
        <Checkbox
          checked={checked}
          className={'print:hidden'}
          onCheckedChange={onCheckedChange}
        />
        <Flex
          className={cn('gap-x-1 print:no-underline', {
            'line-through': checked,
          })}
          wrap={'wrap'}
        >
          {amount && ingredientMultiplier ? (
            <Text weight={'bold'}>
              {[
                new Fraction(amount * ingredientMultiplier).toFraction(true),
                unit,
              ]
                .filter((attribute) => attribute)
                .join(' ')}
            </Text>
          ) : null}
          {altAmount && ingredientMultiplier ? (
            <Text color={'gray'}>
              {`(${[
                new Fraction(altAmount * ingredientMultiplier).toFraction(true),
                altUnit,
              ]
                .filter((attribute) => attribute)
                .join(' ')})`}
            </Text>
          ) : null}
          <RichText blocks={content} wrapper={false} />
        </Flex>
      </Flex>
    </Text>
  );
};
