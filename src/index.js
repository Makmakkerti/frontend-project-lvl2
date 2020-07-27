/* eslint-disable no-restricted-syntax */
import _ from 'lodash';
import { parseFile } from './parsers.js';

// eslint-disable-next-line import/prefer-default-export
const checkDiff = (file1, file2) => {
  const obj1 = parseFile(file1);
  const obj2 = parseFile(file2);
  const result = ['{'];

  for (const [key, value] of Object.entries(obj1)) {
    if (_.has(obj2, key)) {
      if (obj2[key] === value) {
        result.push(`    ${key}: ${value}`);
      } else {
        result.push(`  - ${key}: ${value}\n  + ${key}: ${obj2[key]}`);
      }
    } else {
      result.push(`  - ${key}: ${value}`);
    }
  }

  for (const [key, value] of Object.entries(obj2)) {
    if (!(_.has(obj1, key))) {
      result.push(`  + ${key}: ${value}`);
    }
  }
  result.push('}');
  return result.join('\n');
};

export default checkDiff;
