import { useTranslations } from 'next-intl';
import { RecipeCarousel } from './recipe-carousel';

interface SimilarRecipeCarouselProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof RecipeCarousel>,
    'initialFilters' | 'title'
  > {
  recipe: number;
}

export const SimilarRecipeCarousel = ({
  categories,
  cuisines,
  recipe,
  locale,
  searchClient,
  ...props
}: SimilarRecipeCarouselProps) => {
  const t = useTranslations('SimilarRecipeCarousel');

  const initialFilters = [`NOT id IN ["${recipe}"]`];

  return (
    <RecipeCarousel
      categories={categories}
      cuisines={cuisines}
      initialFilters={initialFilters}
      locale={locale}
      searchClient={searchClient}
      title={t('title')}
      {...props}
    />
  );
};
