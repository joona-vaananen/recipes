import type { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

import { apiClient } from '@/lib/api/client';
import { searchClient } from '@/lib/search/client';
import { RecipeSearch, getPathname, pathnames, type Locale } from '@recipes/ui';
import { LocaleSwitcherPathnames } from '@recipes/ui/src/components';

interface RecipeSearchPageProps {
  params: { locale: string };
  searchParams: Record<string, string | string[] | undefined>;
}

const RecipeSearchPage = async ({
  params,
  searchParams,
}: RecipeSearchPageProps) => {
  const { locale } = params;

  unstable_setRequestLocale(locale);

  const recipeSearchPage = await getRecipeSearchPageData({
    params,
    searchParams,
  });

  const { filters, pageSize, sortOrder, title } = recipeSearchPage.attributes;

  return (
    <>
      <LocaleSwitcherPathnames pathnames={pathnames['/recipes']} />
      <RecipeSearch
        filters={filters}
        locale={locale}
        pageSize={pageSize}
        searchClient={searchClient}
        searchParams={searchParams}
        sortOrder={sortOrder}
        title={title}
      />
    </>
  );
};

export default RecipeSearchPage;

export const generateMetadata = async ({
  params,
  searchParams,
}: RecipeSearchPageProps): Promise<Metadata> => {
  const { locale } = params;

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
        ? recipeSearchPage.attributes.metadata.ogImage.data.attributes.formats
            ?.large.url ??
          recipeSearchPage.attributes.metadata.ogImage.data.attributes.url
        : undefined,
    },
    alternates: {
      canonical: `/${locale}${getPathname({
        locale: locale as Locale,
        href: { pathname: '/recipes' },
      })}`,
    },
  };
};

const getRecipeSearchPageData = async ({ params }: RecipeSearchPageProps) => {
  const { locale } = params;

  const {
    data: [recipeSearchPage],
  } = await apiClient.getMany(
    {
      contentType: 'recipe-search-page',
      parameters: {
        fields: ['id', 'pageSize', 'title'],
        locale,
        populate: {
          filters: {
            on: {
              'recipe-search.checkbox-filter': {
                fields: ['id', 'label', 'name'],
              },
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
              ogImage: {
                fields: ['formats', 'id', 'url'],
              },
            },
          },
          sortOrder: {
            fields: ['id', 'label'],
            populate: {
              options: {
                fields: ['id', 'name', 'value'],
              },
            },
          },
        },
        publicationState: draftMode().isEnabled ? 'preview' : 'live',
      },
    },
    { next: { revalidate: 600 } }
  );

  if (!recipeSearchPage) {
    notFound();
  }

  return recipeSearchPage;
};
