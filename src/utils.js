import fs from 'fs';
import path from 'path';
import _ from 'lodash';

export const readFile = (filepath) => fs.readFileSync(path.join(path.resolve(), filepath), 'utf-8');
