'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname, useRouter } from 'next/navigation';
import { stringify } from 'qs';
import { createContext, useContext, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import {
  recipeSearchFormSchema,
  type RecipeSearchFormSchema,
} from './recipe-search-form-schema';

const RecipeSearchContext = createContext<undefined>(undefined);

interface RecipeSearchProviderProps {
  children: React.ReactNode;
  defaultValues: RecipeSearchFormSchema;
}

export const RecipeSearchProvider = ({
  children,
  defaultValues,
}: RecipeSearchProviderProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const recipeSearchForm = useForm<RecipeSearchFormSchema>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(recipeSearchFormSchema),
  });

  const { handleSubmit, watch } = recipeSearchForm;

  useEffect(() => {
    const onSubmit = (values: RecipeSearchFormSchema) => {
      router.push(
        `${pathname}${stringify(values, {
          addQueryPrefix: true,
          arrayFormat: 'repeat',
          encodeValuesOnly: true,
        })}`,
        { scroll: false }
      );
    };

    const subscription = watch(() => {
      void handleSubmit(onSubmit)();
    });

    return () => subscription.unsubscribe();
  }, [router, pathname, watch, handleSubmit]);

  return (
    <RecipeSearchContext.Provider value={undefined}>
      <FormProvider {...recipeSearchForm}>{children}</FormProvider>
    </RecipeSearchContext.Provider>
  );
};

export const useRecipeSearch = () => {
  const recipeSearch = useContext(RecipeSearchContext);

  if (typeof recipeSearch === 'undefined') {
    throw new Error(
      'useRecipeSearch must be used within a RecipeSearchProvider'
    );
  }

  return recipeSearch;
};
