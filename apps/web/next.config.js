const path = require('path');
const withNextIntl = require('next-intl/plugin')();

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['@recipes/api-client', '@recipes/ui'],
    outputFileTracingRoot: path.join(__dirname, '../../'),
  },
  images: {
    remotePatterns: [
      {
        hostname: `${process.env.API_AWS_BUCKET}.s3.${process.env.API_AWS_REGION}.amazonaws.com`,
        pathname: '/**',
        port: '',
        protocol: 'https',
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  output: 'standalone',
  transpilePackages: ['@recipes/api-client', '@recipes/ui'],
};

module.exports = withNextIntl(nextConfig);
