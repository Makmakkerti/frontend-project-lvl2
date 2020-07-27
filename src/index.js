/* eslint-disable no-restricted-syntax */
import _ from 'lodash';
import { parseFile } from './parsers.js';

const buildDiff = (obj1, obj2, depth = 2) => {
  const result = [];
  const tabs = ' '.repeat(depth);
  const signs = { no: '  ', add: '+ ', rem: '- ' };

  result.push('{');
  for (const [key, value] of Object.entries(obj1)) {
    if (_.has(obj2, key)) {
      if (obj2[key] === value) {
        result.push(`${tabs}${signs.no}${key}: ${value}`);
      } else {
        result.push(`${tabs}${signs.rem}${key}: ${value}`);
        result.push(`${tabs}${signs.add}${key}: ${obj2[key]}`);
      }
    } else {
      result.push(`${tabs}${signs.rem}${key}: ${value}`);
    }
  }

  for (const [key, value] of Object.entries(obj2)) {
    if (!(_.has(obj1, key))) {
      result.push(`${tabs}${signs.add}${key}: ${value}`);
    }
  }
  result.push('}');
  return result.join('\n');
};

const checkDiff = (file1, file2) => {
  const obj1 = parseFile(file1);
  const obj2 = parseFile(file2);
  return buildDiff(obj1, obj2);
};

export default checkDiff;
