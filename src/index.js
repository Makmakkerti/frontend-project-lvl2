import path from 'path';
import { readFile, callObjectProperty } from './utils.js';
import { formatters } from './formatters/index.js';
import { parsers } from './parser.js';
import { buildDiff } from './diffBuilder.js';

export const getFormat = (filepath) => path.extname(filepath).slice(1);

const checkDiff = (formatName, filepath1, filepath2) => {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);
  const obj1 = callObjectProperty(parsers, getFormat(filepath1), data1, 'Unknown file extention:');
  const obj2 = callObjectProperty(parsers, getFormat(filepath2), data2, 'Unknown file extention:');
  const comparisonResult = buildDiff(obj1, obj2);

  return callObjectProperty(formatters, formatName, comparisonResult, 'Unknown formatter:');
};

export default checkDiff;
