import { BASE_URL } from '@/constants';
import { apiClient } from '@/lib/api/client';
import { type APIContentTypes } from '@recipes/api-client';
import { Locale, getPathname, locales } from '@recipes/ui';

export const GET = async () => {
  const { data: recipes } = await apiClient.getMany({
    contentType: 'recipes',
    parameters: {
      fields: ['id', 'locale', 'slug'],
      locale: 'all',
      populate: 'localizations',
    },
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xhtml="http://www.w3.org/1999/xhtml">
    ${generateUrls(recipes)}
  </urlset>`;

  return new Response(sitemap, {
    headers: {
      'Cache-Control': `s-maxage=86400`,
      'Content-Type': 'application/xml',
    },
  });
};

type Recipe = APIContentTypes['recipes'];

const generateUrls = (recipes: Recipe[]) => {
  return locales
    .flatMap((locale) => {
      return recipes
        .filter((recipe) => recipe.attributes.locale === locale)
        .map((recipe) => {
          return `<url>
  <loc>${generateUrl(recipe)}</loc>
  ${generateAlternates(recipe)}
</url>`;
        });
    })
    .join('\n');
};

const generateUrl = (recipe: Recipe) => {
  const { locale, slug } = recipe.attributes;

  return `${BASE_URL}/${locale}${getPathname({
    locale: locale as Locale,
    href: {
      pathname: '/recipes/[slug]',
      params: { slug },
    },
  }).replace(/\/$/, '')}`;
};

const generateAlternates = (recipe: Recipe) => {
  const recipes = [recipe, ...(recipe.attributes.localizations?.data ?? [])];

  return recipes.length > 1
    ? recipes
        .map((recipe) => {
          return `<xhtml:link
  rel="alternate"
  hreflang="${recipe.attributes.locale}"
  href="${generateUrl(recipe)}"/>`;
        })
        .join('\n')
    : '';
};
