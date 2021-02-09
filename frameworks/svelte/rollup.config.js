import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import svelte from 'rollup-plugin-svelte';
import autoPreprocess from 'svelte-preprocess';
import {terser} from 'rollup-plugin-terser';
import autoExternal from 'rollup-plugin-auto-external';

import pkg from './package.json';

const production = !process.env.ROLLUP_WATCH;
const name = pkg.name
  .replace(/^(@\S+\/)?(svelte-)?(\S+)/, '$3')
  .replace(/^\w/, m => m.toUpperCase())
  .replace(/-\w/g, m => m[1].toUpperCase());

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'es',
      sourcemap: production,
    },
    {
      file: pkg.cjs,
      format: 'cjs',
      sourcemap: production,
    },
    {
      file: pkg.umd,
      format: 'umd',
      name,
      sourcemap: production,
      globals: {'@cloudinary/html': 'CloudinaryHtml'}
    },
  ],
  plugins: [
    autoExternal(),
    commonjs(),
    typescript(),
    svelte({
      dev: !production,
      /*
      css: css => {
        css.write('dist/index.css', production);
      },
       */
      preprocess: autoPreprocess(),
      onwarn: (warning, handler) => {
        // Don't warn on A11y issues (img missing alt attribute, etc)
        if (warning.code.includes('a11y-')) return;

        // let Rollup handle all other warnings normally
        handler(warning);
      },
    }),
    resolve({
      dedupe: [
        'svelte'
      ],
    }),
    production && terser(),
  ],
  watch: {
    clearScreen: false,
  },
};
