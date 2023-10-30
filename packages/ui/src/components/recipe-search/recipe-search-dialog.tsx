'use client';

import {
  Button,
  Dialog,
  Flex,
  Inset,
  ScrollArea,
  Separator,
} from '@radix-ui/themes';
import { Filter, RotateCcw } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

interface RecipeSearchDialogProps {
  children: React.ReactNode;
  translations: {
    filters: string;
    openFilters: string;
    resetFilters: string;
    showResults: string;
  };
}

export const RecipeSearchDialog = ({
  children,
  translations,
}: RecipeSearchDialogProps) => {
  const { reset } = useFormContext();

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
            onClick={() =>
              reset({
                category: null,
                course: null,
                cuisine: null,
                diet: null,
                ingredient: null,
                mealType: null,
                method: null,
                search: null,
                season: null,
                sort: null,
              })
            }
            variant={'outline'}
          >
            {translations.resetFilters}
            <RotateCcw size={16} />
          </Button>
          <Dialog.Close>
            <Button>{translations.showResults}</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
