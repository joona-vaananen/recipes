import { searchClient } from '@/lib/search/client';
import type { Hero as HeroProps } from '@recipes/api/src/components/ui/interfaces/Hero';
import type { RecipeCarousel as RecipeCarouselProps } from '@recipes/api/src/components/ui/interfaces/RecipeCarousel';
import { Hero, RecipeCarousel, RichText } from '@recipes/ui';

export const components = {
  'ui.hero': (props: HeroProps) => <Hero {...props} />,
  'ui.recipe-carousel': (props: RecipeCarouselProps) => (
    <RecipeCarousel {...props} searchClient={searchClient} />
  ),
  'ui.rich-text': RichText,
};
