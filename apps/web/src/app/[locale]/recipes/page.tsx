import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { apiClient } from '@/lib/api/client';
import { searchClient } from '@/lib/search/client';
import type { Recipe_Plain } from '@recipes/api/src/api/recipe/content-types/recipe/recipe';
import type { Media } from '@recipes/api/src/common/interfaces/Media';
import { RecipeSearch } from '@recipes/ui';

interface RecipeSearchPageProps {
  params: { locale: string };
}

const RecipeSearchPage = async ({ params }: RecipeSearchPageProps) => {
  const recipeSearchPage = await getRecipeSearchPageData({ params });
  const searchResults = await searchRecipes();

  return (
    <RecipeSearch
      filters={recipeSearchPage.attributes.filters}
      {...searchResults}
    >
      <pre className={'whitespace-pre-wrap'}>
        {JSON.stringify({ recipeSearchPage, searchResults }, null, 2)}
      </pre>
    </RecipeSearch>
  );
};

export default RecipeSearchPage;

export const generateMetadata = async ({
  params,
}: RecipeSearchPageProps): Promise<Metadata> => {
  const recipeSearchPage = await getRecipeSearchPageData({ params });

  return {
    title: recipeSearchPage.attributes.title,
  };
};

const getRecipeSearchPageData = async ({ params }: RecipeSearchPageProps) => {
  const { locale } = params;

  const {
    data: [recipeSearchPage],
  } = await apiClient.getMany({
    contentType: 'recipe-search-page',
    parameters: {
      fields: ['id', 'title'],
      locale,
      populate: {
        filters: {
          on: {
            'recipe-search.select-filter': true,
          },
        },
      },
    },
  });

  if (!recipeSearchPage) {
    notFound();
  }

  return recipeSearchPage;
};

const searchRecipes = async (/* { params }: PageProps */) => {
  const searchResults = await searchClient
    .index<Recipe_Plain & { image: Media['attributes'] }>('recipe')
    .searchGet('', {
      facets: ['*'],
      filter: '',
      hitsPerPage: 15,
      page: 1,
      sort: ['publishedAt:desc'],
    });

  return searchResults;
};
