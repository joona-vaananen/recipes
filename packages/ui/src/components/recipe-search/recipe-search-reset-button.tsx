'use client';

import { Button } from '@radix-ui/themes';
import { RotateCcw } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

interface RecipeSearchResetButtonProps {
  translations: {
    reset: string;
  };
}

export const RecipeSearchResetButton = ({
  translations,
}: RecipeSearchResetButtonProps) => {
  const { reset } = useFormContext();

  const onClick = () => {
    reset({
      category: [],
      course: [],
      cuisine: [],
      diet: [],
      ingredient: [],
      mealType: [],
      method: [],
      season: [],
      sort: 'created-at-desc',
    });
  };

  return (
    <Button onClick={onClick} variant={'outline'}>
      {translations.reset}
      <RotateCcw size={16} />
    </Button>
  );
};
