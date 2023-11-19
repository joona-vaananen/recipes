import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { BASE_URL } from '@/constants';
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
  const { locale } = params;

  const recipeSearchPage = await getRecipeSearchPageData({
    params,
    searchParams,
  });

  const { filters, pageSize, sortOrder, title } = recipeSearchPage.attributes;

  return (
    <RecipeSearch
      filters={filters}
      locale={locale}
      pageSize={pageSize}
      searchClient={searchClient}
      searchParams={searchParams}
      sortOrder={sortOrder}
      title={title}
    />
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
    title:
      recipeSearchPage.attributes.metadata?.title ||
      recipeSearchPage.attributes.title,
    description: recipeSearchPage.attributes.metadata?.description,
    openGraph: {
      title:
        recipeSearchPage.attributes.metadata?.ogTitle ||
        recipeSearchPage.attributes.metadata?.title ||
        recipeSearchPage.attributes.title,
      description:
        recipeSearchPage.attributes.metadata?.ogDescription ||
        recipeSearchPage.attributes.metadata?.description,
      images: recipeSearchPage.attributes.metadata?.ogImage?.data
        ? `${BASE_URL}${
            recipeSearchPage.attributes.metadata.ogImage.data.attributes.formats
              ?.large.url ??
            recipeSearchPage.attributes.metadata.ogImage.data.attributes.url
          }`
        : undefined,
    },
  };
};

const getRecipeSearchPageData = async ({ params }: RecipeSearchPageProps) => {
  const { locale } = params;

  const {
    data: [recipeSearchPage],
  } = await apiClient.getMany({
    contentType: 'recipe-search-page',
    parameters: {
      fields: ['id', 'pageSize', 'title'],
      locale,
      populate: {
        filters: {
          on: {
            'recipe-search.checkbox-filter': true,
          },
        },
        metadata: {
          fields: [
            'description',
            'ogDescription',
            'ogImage',
            'ogTitle',
            'title',
          ],
          populate: {
            ogImage: true,
          },
        },
        sortOrder: {
          populate: {
            options: true,
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
