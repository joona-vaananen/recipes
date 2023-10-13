import { defineConfig } from 'tsup';

const config = defineConfig({
  clean: true,
  dts: true,
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  minify: true,
  platform: 'node',
  sourcemap: true,
  splitting: true,
});

export default config;
