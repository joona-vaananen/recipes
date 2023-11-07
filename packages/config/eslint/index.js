/* eslint-env node */
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'next/core-web-vitals',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'import'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: [
      '../../../apps/*/tsconfig.json',
      '../../../packages/**/*/tsconfig.json',
    ],
    tsconfigRootDir: __dirname,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: ['apps/*/tsconfig.json', 'packages/**/*/tsconfig.json'],
      },
      node: true,
    },
    next: {
      rootDir: '../../../apps/web',
    },
  },
  ignorePatterns: [
    '.next',
    '**/.eslintrc.js',
    '**/*.config.js',
    'packages/config/**',
  ],
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    'no-empty': 'off',
  },
  root: true,
};
