/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    '../../apps/web/src/app/**/*.{ts,tsx}',
    '../../packages/ui/src/components/**/*.{ts,tsx}',
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [require('tailwindcss-animate')],
  presets: [require('radix-themes-tw').radixThemePreset],
  theme: {
    container: {
      center: true,
      padding: '16px',
    },
    fontFamily: {
      sans: ['var(--font-raleway)'],
      serif: ['var(--font-roboto-slab)'],
    },
  },
};
