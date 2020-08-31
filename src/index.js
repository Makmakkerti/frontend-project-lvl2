import path from 'path';
import { readFile } from './utils.js';
import { getFormatted } from './formatters/index.js';
import { parse } from './parser.js';
import { buildDiff } from './diffBuilder.js';

export const getFormat = (filepath) => path.extname(filepath).slice(1);

const checkDiff = (formatName, filepath1, filepath2) => {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);
  const obj1 = parse(getFormat(filepath1), data1);
  const obj2 = parse(getFormat(filepath2), data2);
  const comparisonResult = buildDiff(obj1, obj2);

  return getFormatted(formatName, comparisonResult);
};

export default checkDiff;
