import { useTranslations } from 'next-intl';

import { RecipeRatingClient } from './recipe-rating-client';

interface RecipeRatingProps {
  anchor: string;
  averageRating?: number;
  locale: string;
  ratingCount: number;
  recipe: number;
}

export const RecipeRating = ({
  anchor,
  averageRating,
  locale,
  ratingCount,
  recipe,
}: RecipeRatingProps) => {
  const t = useTranslations('RecipeRating');

  const rating = { average: averageRating, count: ratingCount };

  return (
    <RecipeRatingClient
      anchor={anchor}
      locale={locale}
      rating={rating}
      recipe={recipe}
      translations={{
        jumpToCommentForm: t('jumpToCommentForm'),
        ratingNone: t('ratingNone'),
        ratingPlural: t('ratingPlural'),
        ratingSingular: t('ratingSingular'),
        scoreUnit: t('scoreUnit'),
      }}
    />
  );
};
