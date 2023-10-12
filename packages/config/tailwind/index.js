/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    '../../apps/web/src/app/**/*.{ts,tsx}',
    '../../packages/ui/src/components/**/*.{ts,tsx}',
  ],
  plugins: [require('tailwindcss-animate')],
  presets: [require('radix-themes-tw').radixThemePreset],
  theme: {
    fontFamily: {
      sans: ['var(--font-raleway)'],
      serif: ['var(--font-roboto-slab)'],
    },
  },
};
