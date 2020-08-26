import fs from 'fs';
import path from 'path';

export const readFile = (filepath) => fs.readFileSync(path.join(path.resolve(), filepath), 'utf-8');
