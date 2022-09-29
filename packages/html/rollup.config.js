import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";

import packageJson from "./package.json";

export default {
  input: "src/index.ts",
  output: [
    {
      format: "cjs",
      file: packageJson.main,
      sourcemap: true
    },
    {
      format: 'umd',
      file: packageJson.umd,
      name: 'CloudinaryHtml',
      sourcemap: true,
    },
    {
      format: "esm",
      file: packageJson.module,
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
