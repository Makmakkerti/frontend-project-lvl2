import _ from 'lodash';
import path from 'path';
import { readFile } from './utils.js';
import { formatters } from './formatters/index.js';
import { parseData } from './parser.js';
import { buildDiff } from './diffBuilder.js';

export const getFormat = (filepath) => path.extname(filepath).slice(1);

const formatResult = (comparisonResult, format) => formatters[format](comparisonResult);

const checkDiff = (formatter, filepath1, filepath2) => {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);
  const obj1 = parseData(data1, getFormat(filepath1));
  const obj2 = parseData(data2, getFormat(filepath2));
  const comparisonResult = buildDiff(obj1, obj2);

  return formatResult(comparisonResult, formatter);
};

export default checkDiff;
