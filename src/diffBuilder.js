import _ from 'lodash';

const getTypeSettings = (key, oldData, newData, cb) => {
  if (!_.has(oldData, key) && _.has(newData, key)) return { type: 'added', value: newData[key] };
  if (_.has(oldData, key) && !_.has(newData, key)) return { type: 'deleted', value: oldData[key] };
  if (_.isObject(oldData[key]) && _.isObject(newData[key])) {
    const children = cb(oldData[key], newData[key]);
    return { type: 'nested', children };
  }
  if (oldData[key] !== newData[key]) return { type: 'modified', oldValue: oldData[key], newValue: newData[key] };
  if (oldData[key] === newData[key]) return { type: 'unmodified', value: oldData[key] };
  return null;
};

export const buildDiff = (oldData, newData) => {
  const mergedKeys = _.union(_.keys(oldData), _.keys(newData));

  return mergedKeys.sort().map((key) => {
    const args = [key, oldData, newData];
    const { type } = getTypeSettings(...args, buildDiff);
    return { key, type, ...getTypeSettings(...args, buildDiff) };
  });
};
