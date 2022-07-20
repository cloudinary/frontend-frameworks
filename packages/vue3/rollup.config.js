import typescript from "rollup-plugin-typescript2";
import vue from "rollup-plugin-vue";
import replace from "@rollup/plugin-replace";
import { version, devDependencies } from "./package.json";
const vueVersion = devDependencies.vue;

export default [
  // ESM build to be used with webpack/rollup.
  {
    input: "src/index.ts",
    output: {
      format: "esm",
      file: "dist/index.esm.js",
    },
    plugins: [
      vue({ target: "browser" }),
      replace({
        SDK_PACKAGE_VERSION_INJECTED_DURING_BUILD: version,
        VUE_VERSION_INJECTED_DURING_BUILD: vueVersion,
        preventAssignment: false,
      }),
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            declaration: true,
          },
          include: null,
        },
      }),
    ],
    external: ["vue", "@cloudinary/html", "vue/server-renderer"],
  },
  // SSR build.
  {
    input: "src/index.ts",
    output: {
      format: "cjs",
      file: "dist/index.ssr.js",
    },
    plugins: [
      vue({ target: "node" }), // use 'node' to compile for SSR
      replace({
        SDK_PACKAGE_VERSION_INJECTED_DURING_BUILD: version,
        VUE_VERSION_INJECTED_DURING_BUILD: vueVersion,
        preventAssignment: false,
      }),
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            declaration: true,
          },
          include: null,
        },
      }),
    ],
    external: ["vue", "@cloudinary/html", "vue/server-renderer"],
  },
  // Browser build.
  {
    input: "src/index.ts",
    output: {
      format: "iife",
      file: "dist/index.js",
    },
    plugins: [
      vue({ target: "browser" }),
      replace({
        SDK_PACKAGE_VERSION_INJECTED_DURING_BUILD: version,
        VUE_VERSION_INJECTED_DURING_BUILD: vueVersion,
        preventAssignment: false,
      }),
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            declaration: true,
          },
          include: null,
        },
      }),
    ],
    external: ["vue", "@cloudinary/html", "vue/server-renderer"],
  },
];
