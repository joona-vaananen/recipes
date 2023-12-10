import { BASE_URL } from '@/constants';
import { apiClient } from '@/lib/api/client';
import { type APIContentTypes } from '@recipes/api-client';

export const GET = async () => {
  const { data: pages } = await apiClient.getMany(
    {
      contentType: 'pages',
      parameters: {
        fields: ['id', 'locale', 'publishedAt', 'slug', 'updatedAt'],
        locale: 'all',
        populate: {
          localizations: {
            fields: ['id', 'locale', 'publishedAt', 'slug', 'updatedAt'],
          },
        },
      },
    },
    { cache: 'no-store' }
  );

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xhtml="http://www.w3.org/1999/xhtml">
    ${generateUrls(pages)}
  </urlset>`;

  return new Response(sitemap, {
    headers: {
      'Cache-Control': `s-maxage=${86_400}`,
      'Content-Type': 'application/xml',
    },
  });
};

export const dynamic = 'force-dynamic';

type Page = APIContentTypes['pages'];

const generateUrls = (pages: Page[]) => {
  return pages
    .map((page) => {
      return `<url>
  <loc>${generateUrl(page)}</loc>
  <lastmod>${
    (
      (page.attributes.updatedAt as unknown as string | undefined) ??
      (page.attributes.publishedAt as unknown as string)
    ).split('T')[0]
  }</lastmod>
  ${generateAlternates(page)}
</url>`;
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
