import _ from 'lodash';
import { parseFile } from './parsers.js';
import stylish from './stylish.js';

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

const checkDiff = (file1, file2) => {
  const obj1 = parseFile(file1);
  const obj2 = parseFile(file2);
  return stylish(buildDiff(obj1, obj2));
};

export default checkDiff;
