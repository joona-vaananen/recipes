import { BASE_URL } from '@/constants';
import { apiClient } from '@/lib/api/client';
import type { HomePage } from '@recipes/api/src/api/home-page/content-types/home-page/home-page';
import type { RecipeSearchPage } from '@recipes/api/src/api/recipe-search-page/content-types/recipe-search-page/recipe-search-page';
import { getPathname, type Locale } from '@recipes/ui';

type Page = HomePage | RecipeSearchPage;

export const GET = async () => {
  const [{ data: homePages }, { data: recipeSearchPages }] = await Promise.all([
    apiClient.getMany(
      {
        contentType: 'home-page',
        parameters: {
          fields: ['createdAt', 'locale', 'updatedAt'],
          locale: 'all',
          populate: {
            localizations: {
              fields: ['createdAt', 'locale', 'updatedAt'],
            },
          },
        },
      },
      { cache: 'no-store' }
    ),
    apiClient.getMany(
      {
        contentType: 'recipe-search-page',
        parameters: {
          fields: ['createdAt', 'locale', 'updatedAt'],
          locale: 'all',
          populate: {
            localizations: {
              fields: ['createdAt', 'locale', 'updatedAt'],
            },
          },
        },
      },
      { cache: 'no-store' }
    ),
  ]);

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xhtml="http://www.w3.org/1999/xhtml">
    ${generateUrls(homePages, '/')}
    ${generateUrls(recipeSearchPages, '/recipes')}
  </urlset>`;

  return new Response(sitemap, {
    headers: {
      'Cache-Control': `s-maxage=86400`,
      'Content-Type': 'application/xml',
    },
  });
};

export const dynamic = 'force-dynamic';

const generateUrls = (pages: Page[], pathname: string) => {
  return pages
    .map((page) => {
      return `<url>
  <loc>${generateUrl(page, pathname)}</loc>
  <lastmod>${
    (
      (page.attributes.updatedAt as unknown as string | undefined) ??
      (page.attributes.createdAt as unknown as string)
    ).split('T')[0]
  }</lastmod>
  ${generateAlternates(page, pathname)}
</url>`;
    })
    .join('\n');
};

const generateUrl = (page: Page, pathname: string) => {
  return `${BASE_URL}/${page.attributes.locale}${getPathname({
    locale: page.attributes.locale as Locale,
    href: pathname,
  }).replace(/\/$/, '')}`;
};

const generateAlternates = (page: Page, pathname: string) => {
  const pages = [page, ...(page.attributes.localizations?.data ?? [])];

  return pages.length > 1
    ? pages
        .map((page) => {
          return `<xhtml:link
  rel="alternate"
  hreflang="${page.attributes.locale}"
  href="${generateUrl(page, pathname)}"/>`;
        })
        .join('\n')
    : '';
};
