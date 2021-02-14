const sveltePreprocess = require('svelte-preprocess');

const preprocessOptions = {
  sourceMap: true,
  defaults: {
    script: "typescript",
  }
};

module.exports = {
  preprocess: sveltePreprocess(preprocessOptions),

  // Export this to allow rollup.config.js to inherit the same preprocess options.
  preprocessOptions,
}