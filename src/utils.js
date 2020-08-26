import fs from 'fs';
import path from 'path';
import _ from 'lodash';

export const getFileExtention = (filepath) => path.extname(filepath).slice(1);

export const readFile = (filepath) => fs.readFileSync(path.join(path.resolve(), filepath), 'utf-8');

const isNumeric = (value) => !Number.isNaN(parseFloat(value));

export const numberifyValues = (obj) => _.mapValues(obj, (value) => {
  if (_.isObject(value)) {
    return numberifyValues(value);
  }
  if (isNumeric(value)) {
    return parseFloat(value);
  }
  return value;
});
