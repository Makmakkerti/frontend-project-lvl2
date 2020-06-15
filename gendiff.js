#!/usr/bin/env node
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-prototype-builtins */
import program from 'commander';
import fs from 'fs';

const checkDiff = (file1, file2) => {
  const obj1 = JSON.parse(fs.readFileSync(file1, 'utf-8'));
  const obj2 = JSON.parse(fs.readFileSync(file2, 'utf-8'));
  const result = ['{'];

  const entries1 = Object.entries(obj1);
  const entries2 = Object.entries(obj2);
  for (const [key, value] of entries1) {
    if (obj2.hasOwnProperty(key) && obj2[key] === value) {
      result.push(`    ${key}:${value}`);
    } else if (obj2.hasOwnProperty(key)) {
      result.push(`  - ${key}: ${value}`);
      result.push(`  + ${key}: ${obj2[key]}`);
    } else {
      result.push(`  - ${key}: ${value}`);
    }
  }

  for (const [key, value] of entries2) {
    if (!obj1.hasOwnProperty(key)) {
      result.push(`  + ${key}: ${value}`);
    }
  }
  result.push('}');
  return result.join('\n');
};

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((file1, file2) => {
    console.log(checkDiff(file1, file2));
  });

program.parse(process.argv);
