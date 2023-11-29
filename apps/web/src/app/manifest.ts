import { SITE_NAME } from '@/constants';
import type { MetadataRoute } from 'next';

const manifest = (): MetadataRoute.Manifest => {
  return {
    display: 'standalone',
    icons: [
      {
        sizes: 'any',
        src: '/favicon.ico',
        type: 'image/x-icon',
      },
    ],
    name: SITE_NAME,
    short_name: SITE_NAME,
    theme_color: '#e54666',
  };
};

export default manifest;
