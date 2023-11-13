import { useTranslations } from 'next-intl';
import { RecipeCarousel, type RecipeCarouselProps } from './recipe-carousel';

interface SimilarRecipeCarouselProps
  extends Pick<
    RecipeCarouselProps,
    'categories' | 'cuisines' | 'limit' | 'searchClient'
  > {
  id: number;
}

export const SimilarRecipeCarousel = ({
  categories,
  cuisines,
  id,
  searchClient,
}: SimilarRecipeCarouselProps) => {
  const t = useTranslations('SimilarRecipeCarousel');

  const initialFilters = [`NOT id IN ["${id}"]`];

  return (
    <RecipeCarousel
      categories={categories}
      cuisines={cuisines}
      initialFilters={initialFilters}
      searchClient={searchClient}
      title={t('title')}
    />
  );
};
