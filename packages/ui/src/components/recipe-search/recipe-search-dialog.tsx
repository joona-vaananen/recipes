'use client';

import {
  Button,
  Dialog,
  Flex,
  Inset,
  ScrollArea,
  Separator,
} from '@radix-ui/themes';
import { Filter, Loader2, RotateCcw } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { useRecipeSearch } from './recipe-search-context';

interface RecipeSearchDialogProps {
  children: React.ReactNode;
  totalHits: number;
  translations: {
    filters: string;
    openFilters: string;
    resetFilters: string;
    showResults: string;
  };
}

export const RecipeSearchDialog = ({
  children,
  totalHits,
  translations,
}: RecipeSearchDialogProps) => {
  const { reset } = useFormContext();
  const { isSearching, setIsSearching } = useRecipeSearch();

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>
          {translations.openFilters}
          <Filter size={16} />
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title mb={'0'}>{translations.filters}</Dialog.Title>
        <Inset clip={'padding-box'} my={'5'} side={'x'}>
          <Separator size={'4'} />
          <ScrollArea
            className={'max-h-[400px]'}
            scrollbars={'vertical'}
            type={'auto'}
          >
            {children}
          </ScrollArea>
          <Separator size={'4'} />
        </Inset>
        <Flex gap="3" mt="4" justify="end">
          <Button
            onClick={() => {
              setIsSearching(true);

              reset({
                category: null,
                course: null,
                cuisine: null,
                diet: null,
                mainIngredient: null,
                mealType: null,
                method: null,
                search: null,
                season: null,
                sort: null,
              });
            }}
            variant={'outline'}
          >
            {translations.resetFilters}
            <RotateCcw size={16} />
          </Button>
          <Dialog.Close>
            <Button>
              {translations.showResults}
              {isSearching ? (
                <Loader2 className={'animate-spin'} size={16} />
              ) : (
                ` (${totalHits})`
              )}
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
