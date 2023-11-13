import { BASE_URL } from '@/constants';
import { apiClient } from '@/lib/api/client';
import { type APIContentTypes } from '@recipes/api-client';
import { locales } from '@recipes/ui';

export const GET = async () => {
  const { data: pages } = await apiClient.getMany({
    contentType: 'pages',
    parameters: {
      fields: ['id', 'locale', 'slug'],
      locale: 'all',
      populate: 'localizations',
    },
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xhtml="http://www.w3.org/1999/xhtml">
    ${generateUrls(pages)}
  </urlset>`;

  return new Response(sitemap, {
    headers: { 'Content-Type': 'application/xml' },
  });
};

type Page = APIContentTypes['pages'];

const generateUrls = (pages: Page[]) => {
  return locales
    .flatMap((locale) => {
      return pages
        .filter((page) => page.attributes.locale === locale)
        .map((page) => {
          return `<url>
  <loc>${generateUrl(page)}</loc>
  ${generateAlternates(page)}
</url>`;
        });
    })
    .join('\n');
};

const generateUrl = (page: Page) => {
  return `${BASE_URL}/${page.attributes.locale}/${page.attributes.slug}`;
};

const generateAlternates = (page: Page) => {
  const pages = [page, ...(page.attributes.localizations?.data ?? [])];

  return pages.length > 1
    ? pages
        .map((page) => {
          return `<xhtml:link
  rel="alternate"
  hreflang="${page.attributes.locale}"
  href="${generateUrl(page)}"/>`;
        })
        .join('\n')
    : '';
};
