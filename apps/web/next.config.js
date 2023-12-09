const path = require('path');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.WEB_ANALYZE_BUNDLE === 'true',
});

const withNextIntl = require('next-intl/plugin')();

const breakpoints = require('@recipes/tailwind-config/breakpoints.json');

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['@recipes/api-client', '@recipes/ui'],
    outputFileTracingRoot: path.join(__dirname, '../../'),
  },
  images: {
    deviceSizes: Object.values(breakpoints),
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

module.exports = withBundleAnalyzer(withNextIntl(nextConfig));
