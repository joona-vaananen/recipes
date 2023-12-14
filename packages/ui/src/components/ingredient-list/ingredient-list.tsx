import { Box, Flex, Heading } from '@radix-ui/themes';
import { useTranslations } from 'next-intl';

import { IngredientListProvider } from './ingredient-list-context';
import { IngredientListForm } from './ingredient-list-form';
import { IngredientListItems } from './ingredient-list-items';
import { IngredientListServingsInput } from './ingredient-list-servings-input';

interface IngredientListProps {
  items: {
    id: number;
    items: {
      altAmount?: number;
      altUnit?: string;
      amount?: number;
      content: any;
      id: number;
      unit?: string;
    }[];
    title?: string;
  }[];
  servings: number;
}

export const IngredientList = ({ items, servings }: IngredientListProps) => {
  const t = useTranslations('IngredientList');

  return (
    <IngredientListProvider defaultValues={{ servings: servings ?? 0 }}>
      <Box>
        <Heading as={'h2'} mb={'4'} size={'7'}>
          {t('title')}
        </Heading>
        <Flex direction={'column'} gap={'6'}>
          <Flex asChild>
            <IngredientListForm>
              <IngredientListServingsInput
                translations={{
                  servingPlural: t('servingPlural'),
                  servingSingular: t('servingSingular'),
                  servingsLabel: t('servingsLabel'),
                }}
              />
            </IngredientListForm>
          </Flex>
          <IngredientListItems items={items} />
        </Flex>
      </Box>
    </IngredientListProvider>
  );
};
