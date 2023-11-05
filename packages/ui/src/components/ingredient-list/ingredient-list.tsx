import { Container, Heading, Section } from '@radix-ui/themes';
import { useTranslations } from 'next-intl';

import { IngredientListClient } from './ingredient-list-client';

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
    <Section>
      <Container className={'container'}>
        <Heading as={'h2'} mb={'4'} size={'7'}>
          {t('title')}
        </Heading>
        <IngredientListClient
          items={items}
          servings={servings}
          translations={{
            servings: t('servings'),
          }}
        />
      </Container>
    </Section>
  );
};
