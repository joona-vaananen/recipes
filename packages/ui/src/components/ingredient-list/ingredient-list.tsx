import { Container, Flex, Heading, Section } from '@radix-ui/themes';
import { useTranslations } from 'next-intl';

import { IngredientListProvider } from './ingredient-list-context';
import { IngredientListServingsInput } from './ingredient-list-servings-input';
import { IngredientListItems } from './ingredient-list-items';

interface IngredientListProps {
  items: {
    id: number;
    items: {
      amount?: number;
      id: number;
      label: string;
      unit?: string;
    }[];
    title?: string;
  }[];
  servings: number;
}

export const IngredientList = ({ items, servings }: IngredientListProps) => {
  const t = useTranslations('IngredientList');

  return (
    <IngredientListProvider defaultValues={{ servings }}>
      <Section>
        <Container className={'container'}>
          <Heading as={'h2'} mb={'4'} size={'7'}>
            {t('title')}
          </Heading>
          <Flex direction={'column'} gap={'4'}>
            <IngredientListServingsInput
              translations={{
                servings: t('servings'),
              }}
            />
            <IngredientListItems items={items} />
          </Flex>
        </Container>
      </Section>
    </IngredientListProvider>
  );
};
