import { Button, Container, Flex, Section } from '@radix-ui/themes';
import { ArrowDown } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Rating } from '../rating';

interface RecipeInfoProps
  extends React.ComponentPropsWithoutRef<typeof Section> {
  averageRating?: number;
  ratingCount: number;
  recipeAnchor: string;
}

export const RecipeInfo = ({
  averageRating,
  ratingCount,
  recipeAnchor,
  ...props
}: RecipeInfoProps) => {
  const t = useTranslations('RecipeInfo');

  return (
    <Section
      size={{
        initial: '2',
        sm: '3',
      }}
      {...props}
    >
      <Container className={'container'} size={'3'}>
        <Flex justify={'between'}>
          <Rating averageRating={averageRating} ratingCount={ratingCount} />
          <Button asChild>
            <a href={`#${recipeAnchor}`}>
              {t('jumpToRecipe')}
              <ArrowDown className={'h-4 w-4'} />
            </a>
          </Button>
        </Flex>
      </Container>
    </Section>
  );
};
