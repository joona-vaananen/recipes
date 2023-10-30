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
      category: null,
      course: null,
      cuisine: null,
      diet: null,
      ingredient: null,
      mealType: null,
      method: null,
      season: null,
      sort: null,
    });
  };

  return (
    <Button onClick={onClick} variant={'outline'}>
      {translations.reset}
      <RotateCcw size={16} />
    </Button>
  );
};
