import { useTranslations } from 'next-intl';

import { RecipeRatingClient } from './recipe-rating-client';

interface RecipeRatingProps {
  averageRating?: number;
  locale: string;
  ratingCount: number;
  recipe: number;
}

export const RecipeRating = ({
  averageRating,
  locale,
  ratingCount,
  recipe,
}: RecipeRatingProps) => {
  const t = useTranslations('RecipeRating');

  const rating = { average: averageRating, count: ratingCount };

  return (
    <RecipeRatingClient
      locale={locale}
      rating={rating}
      recipe={recipe}
      translations={{
        ratingNone: t('ratingNone'),
        ratingPlural: t('ratingPlural'),
        ratingSingular: t('ratingSingular'),
        scoreUnit: t('scoreUnit'),
      }}
    />
  );
};
