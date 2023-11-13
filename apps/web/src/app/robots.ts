import type { MetadataRoute } from 'next';

import { BASE_URL } from '@/constants';

const robots = (): MetadataRoute.Robots => {
  return {
    rules: {
      allow: '/',
      disallow: '/api/',
      userAgent: '*',
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
};

export default robots;
