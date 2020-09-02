import _ from 'lodash';

export const buildDiff = (oldData, newData) => {
  const mergedKeys = _.union(_.keys(oldData), _.keys(newData));

  return mergedKeys.sort().map((key) => {
    if (!_.has(oldData, key)) {
      return { key, type: 'added', value: newData[key] };
    }
    if (!_.has(newData, key)) {
      return { key, type: 'deleted', value: oldData[key] };
    }
    if (_.isObject(oldData[key]) && _.isObject(newData[key])) {
      const children = buildDiff(oldData[key], newData[key]);
      return { key, type: 'nested', children };
    }
    if (oldData[key] !== newData[key]) {
      return {
        key, type: 'modified', oldValue: oldData[key], value: newData[key],
      };
    }
    return { key, type: 'unmodified', value: oldData[key] };
  });
};
