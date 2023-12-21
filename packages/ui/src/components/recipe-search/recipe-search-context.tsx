'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import throttle from 'lodash.throttle';
import { usePathname, useRouter } from 'next/navigation';
import { stringify } from 'qs';
import { createContext, useContext, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import {
  recipeSearchParamsSchema,
  type RecipeSearchParamsSchema,
} from './recipe-search-schemas';

const RecipeSearchContext = createContext<
  | {
      isSearching: boolean;
      setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
    }
  | undefined
>(undefined);

interface RecipeSearchProviderProps {
  children: React.ReactNode;
  defaultValues: RecipeSearchParamsSchema;
}

export const RecipeSearchProvider = ({
  children,
  defaultValues,
}: RecipeSearchProviderProps) => {
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const currentUrl = `${pathname}${stringify(defaultValues, {
    addQueryPrefix: true,
    arrayFormat: 'repeat',
    encodeValuesOnly: true,
    skipNulls: true,
  })}`;

  const recipeSearchForm = useForm<RecipeSearchParamsSchema>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(recipeSearchParamsSchema),
  });

  const { handleSubmit, watch } = recipeSearchForm;

  const onSubmit = throttle((values: RecipeSearchParamsSchema) => {
    const url = `${pathname}${stringify(values, {
      addQueryPrefix: true,
      arrayFormat: 'repeat',
      encodeValuesOnly: true,
      skipNulls: true,
    })}`;

    if (url === currentUrl) {
      return;
    }

    setIsSearching(true);

    router.push(url, { scroll: false });
  }, 500);

  useEffect(() => {
    const subscription = watch(() => {
      void handleSubmit(onSubmit)();
    });

    return () => subscription.unsubscribe();
  }, [handleSubmit, onSubmit, watch]);

  useEffect(() => {
    return () => {
      onSubmit.cancel();
    };
  }, [onSubmit]);

  useEffect(() => {
    setIsSearching(false);
  }, [defaultValues]);

  return (
    <RecipeSearchContext.Provider value={{ isSearching, setIsSearching }}>
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
