
import fs from 'fs';
import path from 'path';

// eslint-disable-next-line import/prefer-default-export
export const readFile = (filepath) => fs.readFileSync(path.join(path.resolve(), filepath), 'utf-8');
