import { BASE_URL } from '@/constants';

// TODO: Uncomment sitemap for dynamic pages, when some exist
const sitemaps = [
  'sitemap-static.xml',
  // 'sitemap-dynamic.xml',
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
        'Cache-Control': `s-maxage=${86_400}`,
        'Content-Type': 'application/xml',
      },
    }
  );
};

export const dynamic = 'force-dynamic';

const generateSitemaps = () => {
  return sitemaps
    .map((sitemap) => {
      return `<sitemap>
  <loc>${BASE_URL}/${sitemap}</loc>
</sitemap>`;
    })
    .join('\n');
};
