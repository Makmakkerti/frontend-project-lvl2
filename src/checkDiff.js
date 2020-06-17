/* eslint-disable no-restricted-syntax */
import fs from 'fs';
import path from 'path';

export const readFile = (filename) => fs.readFileSync(path.join(path.resolve(), filename), 'utf-8');
const parseJson = (text) => JSON.parse(readFile(text));

export const checkDiff = (file1, file2) => {
  const obj1 = parseJson(file1);
  const obj2 = parseJson(file2);
  const result = ['{'];

  for (const [key, value] of Object.entries(obj1)) {
    if (key in obj2) {
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
    if (!(key in obj1)) {
      result.push(`  + ${key}: ${value}`);
    }
  }

  result.push('}');
  return result.join('\n');
};
