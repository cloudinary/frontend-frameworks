import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import serve from 'rollup-plugin-serve';
import injectProcessEnv from 'rollup-plugin-inject-process-env';
import { version } from './package.json';

export default [
  {
    input: 'src/demo.tsx',
    output: [
      {
        file: 'dist/demo.js',
        format: 'esm'
      }
    ],
    plugins: [
      resolve(),
      replace({
        PACKAGE_VERSION_INJECTED_DURING_BUILD: version,
        preventAssignment: false
      }),
      typescript({ target: 'es5' }),
      commonjs(),
      injectProcessEnv({
        NODE_ENV: process.env.NODE_ENV
      }),
      serve({
        open: true,
        openPage: '/index.html',
        contentBase: './',
        historyApiFallback: false,
        host: 'localhost',
        port: 3001
      })
    ]
  }
];
