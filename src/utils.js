import fs from 'fs';
import path from 'path';
import _ from 'lodash';

export const readFile = (filepath) => fs.readFileSync(path.join(path.resolve(), filepath), 'utf-8');

const isNumeric = (value) => {
  const possibleNumber = parseFloat(value);
  return !Number.isNaN(possibleNumber);
};

export const numberifyValues = (obj) => _.mapValues(obj, (value) => {
  if (_.isObject(value)) {
    return numberifyValues(value);
  }
  if (isNumeric(value)) {
    return parseFloat(value);
  }

  return value;
});
