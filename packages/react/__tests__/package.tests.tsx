import {execSync} from "child_process";
import fs from 'fs';
import * as path from "path";

describe('tests for the package output', () => {
  it('ensures that the pacakge contains the right files', () => {
    execSync('npm run build');
    const dirContents = fs.readdirSync(path.resolve(__dirname, '../dist'));

    expect(dirContents.includes('index.js')).toBe(true);
    expect(dirContents.includes('index.umd.js')).toBe(true);
    expect(dirContents.includes('index.cjs.js')).toBe(true);
    expect(dirContents.includes('index.d.ts')).toBe(true);
    expect(dirContents.includes('package.json')).toBe(true);
  });
});
