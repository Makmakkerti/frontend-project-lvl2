/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-prototype-builtins */
import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();
export const readFile = (filename) => fs.readFileSync(path.join(__dirname, filename), 'utf-8');

const parseJson = (text) => JSON.parse(readFile(text));

export const checkDiff = (file1, file2) => {
  const obj1 = parseJson(file1);
  const obj2 = parseJson(file2);
  const result = ['{'];

  for (const [key, value] of Object.entries(obj1)) {
    if (obj2.hasOwnProperty(key) && obj2[key] === value) {
      result.push(`    ${key}:${value}`);
    } else if (obj2.hasOwnProperty(key)) {
      result.push(`  - ${key}: ${value}`);
      result.push(`  + ${key}: ${obj2[key]}`);
    } else {
      result.push(`  - ${key}: ${value}`);
    }
  }

  for (const [key, value] of Object.entries(obj2)) {
    if (!obj1.hasOwnProperty(key)) {
      result.push(`  + ${key}: ${value}`);
    }
  }

  result.push('}');
  return result.join('\n');
};
