import { Container, Heading, Section } from '@radix-ui/themes';
import { MeiliSearch } from 'meilisearch';

import type { Recipe_Plain } from '@recipes/api/src/api/recipe/content-types/recipe/recipe';
import type { Media } from '@recipes/api/src/common/interfaces/Media';
import type { RecipeCarousel as IRecipeCarousel } from '@recipes/api/src/components/ui/interfaces/RecipeCarousel';
import { BREAKPOINTS } from '../constants';
import { RecipeCard } from './recipe-card';
import { RecipeCarouselClient } from './recipe-carousel-client';

type RecipeCarouselProps = IRecipeCarousel & { searchClient: any };

export const RecipeCarousel = async ({
  limit,
  searchClient,
  title,
}: RecipeCarouselProps) => {
  const searchResults = await (searchClient as InstanceType<typeof MeiliSearch>)
    .index<Recipe_Plain & { image: Media['attributes'] }>('recipe')
    .searchGet('', {
      facets: ['*'],
      filter: '',
      hitsPerPage: limit ?? 15,
      page: 1,
      sort: ['publishedAt:desc'],
    });

  return (
    <Section className={'overflow-hidden'}>
      <Container className={'container'}>
        {title ? (
          <Heading as={'h2'} mb={'6'} size={'7'}>
            {title}
          </Heading>
        ) : null}
        <RecipeCarouselClient>
          <ol className={'embla__container -ml-3 flex'}>
            {searchResults.hits.map(({ id, image, slug, title }) => (
              <li
                className={
                  'embla__slide min-w-0 flex-shrink-0 flex-grow-0 basis-full pl-3 sm:basis-1/2 md:basis-1/3'
                }
                key={id}
              >
                <RecipeCard
                  image={image}
                  sizes={[
                    `(max-width: ${BREAKPOINTS.sm - 1}px) 100vw`,
                    `(max-width: ${BREAKPOINTS.md - 1}px) 50vw`,
                    '33vw',
                  ].join(', ')}
                  slug={slug}
                  title={title}
                />
              </li>
            ))}
          </ol>
        </RecipeCarouselClient>
      </Container>
    </Section>
  );
};
