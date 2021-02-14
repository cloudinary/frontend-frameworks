import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import svelte from 'rollup-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';
import {terser} from 'rollup-plugin-terser';
import autoExternal from 'rollup-plugin-auto-external';
const preprocessOptions = require("./svelte.config").preprocessOptions;

import pkg from './package.json';

// we're in production env when not using rollup watch. see dev script in package.json
const isProductionEnv = !process.env.ROLLUP_WATCH;

// Generate a UMD module name from the package.json name.
// See https://github.com/sveltejs/component-template/issues/30
const umdModuleName = pkg.name
  // Remove the scoped name @organization and svelte-, $3 means to only take the third capturing group.
  .replace(/^(@\S+\/)?(svelte-)?(\S+)/, '$3')
  .replace(/^\w/, m => m.toUpperCase())
  .replace(/-\w/g, m => m[1].toUpperCase());

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'es',
      sourcemap: isProductionEnv,
    },
    {
      file: pkg.umd,
      format: 'umd',
      name: umdModuleName,
      sourcemap: isProductionEnv,
      globals: {'@cloudinary/html': 'CloudinaryHtml'}
    },
  ],
  plugins: [
    autoExternal(),
    commonjs(),
    typescript(),
    svelte({
      dev: !isProductionEnv,
      preprocess: sveltePreprocess({
        ...preprocessOptions
      }),
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
    isProductionEnv && terser(),
  ],
  watch: {
    clearScreen: false,
  },
};
