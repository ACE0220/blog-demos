import { defineConfig } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import rollupTypescript from 'rollup-plugin-typescript2';

const config = defineConfig({
  input: './src/index.ts',
  external: /^(?!\/|\.).*$/,
  plugins: [
    resolve(),
    commonjs(),
    rollupTypescript({
      tsconfig: './tsconfig.json',
    }),
  ],
  output: [
    {
      format: 'esm',
      file: 'dist/es/index.js',
      // preserveModules: true,
    },
    {
      format: 'cjs',
      dir: 'dist/cjs/index.js',
      // preserveModules: true,
    },
  ],
});

export default config;
