/** @type {import('prettier').Config} */
module.exports = {
  plugins: ['prettier-plugin-tailwindcss'],
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  tailwindConfig: './packages/config/tailwind/index.js',
  tailwindFunctions: ['cn'],
  trailingComma: 'es5',
};
