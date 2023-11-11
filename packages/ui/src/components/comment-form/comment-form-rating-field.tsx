'use client';

import { AccessibleIcon, Flex, Text } from '@radix-ui/themes';
import { Star } from 'lucide-react';
import { useController, useFormContext } from 'react-hook-form';

import { cn } from '../..';
import type { CommentFormSchema } from './comment-form-schema';

interface CommentFormRatingFieldProps {
  translations: {
    rating: string;
    scoreUnit: string;
  };
}

export const CommentFormRatingField = ({
  translations,
}: CommentFormRatingFieldProps) => {
  const { control, setValue } = useFormContext<CommentFormSchema>();
  const { field } = useController({ name: 'rating', control });
  const { disabled, name, onBlur, ref, value } = field;

  const onClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    newValue: number
  ) => {
    if (newValue === value) {
      setValue('rating', null);
    } else {
      setValue('rating', newValue);
    }
  };

  return (
    <fieldset>
      <Text asChild mb={'2'} size={'2'}>
        <legend>{translations.rating}</legend>
      </Text>
      <Flex>
        {Array.from({ length: 5 }, (_, index) => (
          <button
            disabled={disabled}
            key={index}
            name={name}
            onBlur={onBlur}
            onClick={(event) => onClick(event, index + 1)}
            ref={ref}
            type={'button'}
          >
            <AccessibleIcon label={`${index + 1}/5 ${translations.scoreUnit}`}>
              <Star
                className={cn({
                  'h-6 w-6': true,
                  'fill-accent-9 stroke-accent-9':
                    typeof value === 'number' && value > index,
                })}
              />
            </AccessibleIcon>
          </button>
        ))}
      </Flex>
    </fieldset>
  );
};
