import { Container, Grid } from '@radix-ui/themes';

import { BREAKPOINTS } from '@/constants';
import { searchClient } from '@/lib/search/client';
import { getPathname } from '@/navigation';
import type { Recipe_Plain } from '@recipes/api/src/api/recipe/content-types/recipe/recipe';
import type { Media } from '@recipes/api/src/common/interfaces/Media';
import { RecipeCard } from '@recipes/ui';

interface PageProps {
  params: { locale: string };
}

const Page = async ({ params }: PageProps) => {
  const { locale } = params;

  const searchResponse = await searchRecipes();

  return (
    <Container className={'container'} px={'4'}>
      <Grid
        asChild
        columns={{
          initial: '1',
          sm: '2',
          md: '3',
        }}
        gap={'3'}
      >
        <ol>
          {searchResponse.hits.map(({ id, image, title, slug }) => (
            <li key={id}>
              <RecipeCard
                image={image}
                sizes={[
                  `(max-width: ${BREAKPOINTS.sm - 1}px) 100vw`,
                  `(max-width: ${BREAKPOINTS.md - 1}px) 50vw`,
                  '33vw',
                ].join(', ')}
                slug={slug}
                title={title}
                url={getPathname({
                  href: {
                    pathname: '/recipes/[slug]',
                    params: { slug },
                  },
                  locale,
                })}
              />
            </li>
          ))}
        </ol>
      </Grid>
      <pre className={'whitespace-pre-wrap'}>
        {JSON.stringify(searchResponse, null, 2)}
      </pre>
    </Container>
  );
};

export default Page;

const searchRecipes = async (/* { params }: PageProps */) => {
  const searchResponse = await searchClient
    .index<Recipe_Plain & { image: Media['attributes'] }>('recipe')
    .searchGet('', {
      facets: ['*'],
      filter: '',
      hitsPerPage: 15,
      page: 1,
      sort: ['publishedAt:desc'],
    });

  if ('message' in searchResponse && process.env.NODE_ENV === 'development') {
    throw new Error(JSON.stringify(searchResponse, null, 2));
  }

  return searchResponse;
};
