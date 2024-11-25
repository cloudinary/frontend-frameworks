process.env.TS_NODE_COMPILER_OPTIONS = JSON.stringify({
  allowJs: true,
  module: 'commonjs',
});

process.env.TS_NODE_PREFER_TS_EXTS = 'true';

process.env.NODE_ENV = 'test';
process.env.TZ = 'UTC';

module.exports = {
  recursive: true,
  parallel: true,
  jobs: 3,
  timeout: 20000,
  require: ['tsconfig-paths/register', 'ts-node/register/transpile-only', 'jsdom-global/register'],
};
