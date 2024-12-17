import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";

export default {
  input: "src/index.ts",
  output: [
    {
      format: "cjs",
      file: "./dist/index.js",
      sourcemap: true
    },
    {
      format: 'umd',
      file: "./dist/index.umd.js",
      name: 'CloudinaryHtml',
      sourcemap: true,
    },
    {
      format: "esm",
      file: "./dist/index.esm.js",
      sourcemap: true
    }
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    typescript({
      tsconfig: "tsconfig.json",
      tsconfigOverride: {
        "exclude": [
          "tests/**/*.*"
        ]
      },
      clean: true
    }),
    commonjs(),
  ]
};
