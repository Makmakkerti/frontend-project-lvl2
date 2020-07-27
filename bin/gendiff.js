#!/usr/bin/env node
import program from 'commander';
import checkDiff from '../index.js';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((file1, file2) => {
    console.log(checkDiff(file1, file2));
  });

program.parse(process.argv);
