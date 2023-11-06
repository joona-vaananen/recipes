'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { createContext, useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import {
  ingredientListSchema,
  type IngredientListSchema,
} from './ingredient-list-schema';

const IngredientListContext = createContext<
  { ingredientMultiplier: number } | undefined
>(undefined);

interface IngredientListProviderProps {
  children: React.ReactNode;
  defaultValues: { servings: number };
}

export const IngredientListProvider = ({
  children,
  defaultValues,
}: IngredientListProviderProps) => {
  const ingredientListForm = useForm<IngredientListSchema>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(ingredientListSchema),
  });

  const { watch } = ingredientListForm;
  const servings = watch('servings');
  const ingredientMultiplier = servings! / defaultValues.servings;

  return (
    <IngredientListContext.Provider value={{ ingredientMultiplier }}>
      <FormProvider {...ingredientListForm}>{children}</FormProvider>
    </IngredientListContext.Provider>
  );
};

export const useIngredientList = () => {
  const ingredientList = useContext(IngredientListContext);

  if (typeof ingredientList === 'undefined') {
    throw new Error(
      'useIngredientList must be used within a IngredientListProvider'
    );
  }

  return ingredientList;
};
