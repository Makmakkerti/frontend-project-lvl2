import fs from 'fs';
import path from 'path';
import _ from 'lodash';

export const readFile = (filepath) => fs.readFileSync(path.join(path.resolve(), filepath), 'utf-8');

export const callObjectProperty = (obj, property, data, errMsg = 'Unknown property: ') => {
  if (!_.has(obj, property)) {
    throw new Error(`${errMsg}${property}`);
  }
  return obj[property](data);
};
