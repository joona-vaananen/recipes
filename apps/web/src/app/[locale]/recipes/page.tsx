import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { apiClient } from '@/lib/api/client';
import { searchClient } from '@/lib/search/client';
import { RecipeSearch } from '@recipes/ui';

interface RecipeSearchPageProps {
  params: { locale: string };
  searchParams: Record<string, string | string[] | undefined>;
}

const RecipeSearchPage = async ({
  params,
  searchParams,
}: RecipeSearchPageProps) => {
  const recipeSearchPage = await getRecipeSearchPageData({
    params,
    searchParams,
  });
  const { filters } = recipeSearchPage.attributes;

  return (
    <RecipeSearch
      filters={filters}
      searchClient={searchClient}
      searchParams={searchParams}
    >
      <pre className={'whitespace-pre-wrap'}>
        {JSON.stringify(recipeSearchPage, null, 2)}
      </pre>
    </RecipeSearch>
  );
};

export default RecipeSearchPage;

export const generateMetadata = async ({
  params,
  searchParams,
}: RecipeSearchPageProps): Promise<Metadata> => {
  const recipeSearchPage = await getRecipeSearchPageData({
    params,
    searchParams,
  });

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
