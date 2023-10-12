const path = require('path');
const withNextIntl = require('next-intl/plugin')();

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    logging: {
      fullUrl: true,
      level: 'verbose',
    },
    outputFileTracingRoot: path.join(__dirname, '../../'),
  },
  output: 'standalone',
  transpilePackages: ['@recipes/api-client'],
};

module.exports = withNextIntl(nextConfig);
