import { Button, Container, Flex } from '@radix-ui/themes';
import { ArrowDown } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { cn } from '../../lib/utils/cn';
import { Rating } from '../rating';

interface RecipeInfoProps extends React.HTMLAttributes<HTMLElement> {
  averageRating?: number;
  ratingCount: number;
  recipeAnchor: string;
}

export const RecipeInfo = ({
  averageRating,
  className,
  ratingCount,
  recipeAnchor,
  ...props
}: RecipeInfoProps) => {
  const t = useTranslations('RecipeInfo');

  return (
    <section className={cn('pb-10 pt-4 sm:pb-20', className)} {...props}>
      <Container className={'container'} size={'3'}>
        <Flex
          direction={{
            initial: 'column',
            sm: 'row',
          }}
          gap={'4'}
          justify={'between'}
        >
          <Rating averageRating={averageRating} ratingCount={ratingCount} />
          <Button asChild>
            <a href={`#${recipeAnchor}`}>
              {t('jumpToRecipe')}
              <ArrowDown className={'h-4 w-4'} />
            </a>
          </Button>
        </Flex>
      </Container>
    </section>
  );
};
