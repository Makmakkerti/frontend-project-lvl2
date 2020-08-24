import _ from 'lodash';
import ini from 'ini';
import path from 'path';
import yaml from 'js-yaml';
import { readFile, numberifyValues } from './utils.js';
import { formatters } from './formatters/index.js';

const getTypeSettings = (key, before, after, cb) => {
  if (!_.has(before, key) && _.has(after, key)) return { type: 'added', value: after[key] };
  if (_.has(before, key) && !_.has(after, key)) return { type: 'deleted', value: before[key] };
  if (_.isObject(before[key]) && _.isObject(after[key])) {
    const children = cb(before[key], after[key]);
    return { type: 'nested', children };
  }
  if (before[key] !== after[key]) return { type: 'modified', oldValue: before[key], newValue: after[key] };
  if (before[key] === after[key]) return { type: 'unmodified', value: before[key] };
  return null;
};

const buildDiff = (before, after) => {
  const mergedKeys = _.union(_.keys(before), _.keys(after));

  return mergedKeys.sort().map((key) => {
    const args = [key, before, after];
    const { type } = getTypeSettings(...args, buildDiff);
    return { key, type, ...getTypeSettings(...args, buildDiff) };
  });
};

export const parseFile = (filepath, parserSelector) => {
  const file = readFile(filepath);
  const extention = path.extname(filepath).slice(1);
  return parserSelector[extention](file);
};

export const parsers = {
  json: (file) => JSON.parse(file),
  yml: (file) => yaml.safeLoad(file),
  yaml: (file) => yaml.safeLoad(file),
  ini: (file) => {
    const data = ini.parse(file);
    return numberifyValues(data);
  },
};

const checkDiff = (formatter, file1, file2, formatterSelector = formatters) => {
  const obj1 = parseFile(file1, parsers);
  const obj2 = parseFile(file2, parsers);
  return formatterSelector[formatter](buildDiff(obj1, obj2));
};

export default checkDiff;
