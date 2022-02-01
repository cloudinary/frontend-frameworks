import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import { version } from './package.json';

export default [
  {
    input: 'src/index.tsx',
    output: [
      {
        file: 'dist/index.umd.js',
        format: 'umd',
        name: 'CloudinaryBaseSDK'
      },
      {
        file: 'dist/index.js',
        format: 'esm'
      },
      {
        file: 'dist/index.cjs.js',
        format: 'cjs'
      }
    ],
    plugins: [
      resolve(),
      replace({
        PACKAGE_VERSION_INJECTED_DURING_BUILD: version,
        preventAssignment: false
      }),
      typescript({ target: 'es5' }),
      commonjs()
    ]
  }
];
