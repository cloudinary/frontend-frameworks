import esbuild from 'esbuild'

await esbuild.build({
  outfile: `./dist/index.js`,
  entryPoints: ['src/index.ts'],
  tsconfig: './tsconfig.json',
  bundle: true,
  platform: 'neutral',
  format: 'esm',
  packages: 'external',
})
