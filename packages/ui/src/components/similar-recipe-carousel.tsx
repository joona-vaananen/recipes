import { useTranslations } from 'next-intl';
import { RecipeCarousel, type RecipeCarouselProps } from './recipe-carousel';

interface SimilarRecipeCarouselProps
  extends Pick<
    RecipeCarouselProps,
    'categories' | 'cuisines' | 'limit' | 'searchClient' | 'sort'
  > {
  id: number;
}

export const SimilarRecipeCarousel = ({
  categories,
  cuisines,
  id,
  searchClient,
  sort,
}: SimilarRecipeCarouselProps) => {
  const t = useTranslations('SimilarRecipeCarousel');

  const initialFilters = [`NOT id IN ["${id}"]`];

  return (
    <RecipeCarousel
      categories={categories}
      cuisines={cuisines}
      initialFilters={initialFilters}
      sort={sort}
      searchClient={searchClient}
      title={t('title')}
    />
  );
};
