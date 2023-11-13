import { BASE_URL } from '@/constants';

const sitemaps = [
  'sitemap-static.xml',
  'sitemap-dynamic.xml',
  'sitemap-recipes.xml',
];

export const GET = () => {
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${generateSitemaps()}
  </sitemapindex>`,
    {
      headers: {
        'Cache-Control': `s-maxage=86400`,
        'Content-Type': 'application/xml',
      },
    }
  );
};

const generateSitemaps = () => {
  return sitemaps
    .map((sitemap) => {
      return `<sitemap>
  <loc>${BASE_URL}/${sitemap}</loc>
</sitemap>`;
    })
    .join('\n');
};
