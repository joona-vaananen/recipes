const path = require('path');
const withNextIntl = require('next-intl/plugin')();

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['@recipes/api-client', '@recipes/ui'],
    outputFileTracingRoot: path.join(__dirname, '../../'),
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  output: 'standalone',
  rewrites: () => ({
    beforeFiles: [
      {
        source: '/uploads/:path',
        destination: `${process.env.API_PROTOCOL}://${process.env.API_HOST}:${process.env.API_PORT}/uploads/:path`,
      },
    ],
  }),
  transpilePackages: ['@recipes/api-client', '@recipes/ui'],
};

module.exports = withNextIntl(nextConfig);
