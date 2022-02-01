import {execSync} from "child_process";
import fs from 'fs';
import * as path from "path";

describe('tests for the package', () => {
  it('works', () => {
    execSync('npm run build');
    const dirContents = fs.readdirSync(path.resolve(__dirname, '../dist'));

    expect(dirContents.indexOf('index.js')).toBeGreaterThan(-1);
    expect(dirContents.indexOf('index.umd.js')).toBeGreaterThan(-1);
    expect(dirContents.indexOf('index.cjs.js')).toBeGreaterThan(-1);
    expect(dirContents.indexOf('index.d.ts')).toBeGreaterThan(-1);
    expect(dirContents.indexOf('package.json')).toBeGreaterThan(-1);
  });
});
