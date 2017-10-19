import { readdirSync } from 'fs';
import path from 'path';

import * as Bundle from '../index';

const srcPath = path.resolve(__dirname, '..');

describe('Gypcrete Bundle', () => {
    it('is exports every file in src/', () => {
        const allFileNames = readdirSync(srcPath);
        const expectedFileNames = allFileNames.filter((fileName) => {
            const isJsFile = fileName.match(/\.jsx?$/);
            const isIndexFile = fileName === 'index.js';

            return isJsFile && !isIndexFile;
        });

        expect(Object.keys(Bundle)).toHaveLength(expectedFileNames.length);
    });
});
