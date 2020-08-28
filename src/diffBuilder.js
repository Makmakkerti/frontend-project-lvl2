import _ from 'lodash';

export const buildDiff = (oldData, newData) => {
  const mergedKeys = _.union(_.keys(oldData), _.keys(newData));

  return mergedKeys.sort().map((key) => {
    const buildNodeData = () => {
      if (!_.has(oldData, key)) return { type: 'added', value: newData[key] };
      if (!_.has(newData, key)) return { type: 'deleted', value: oldData[key] };
      if (_.isObject(oldData[key]) && _.isObject(newData[key])) {
        const children = buildDiff(oldData[key], newData[key]);
        return { type: 'nested', children };
      }
      if (oldData[key] !== newData[key]) return { type: 'modified', oldValue: oldData[key], newValue: newData[key] };
      return { type: 'unmodified', value: oldData[key] };
    };
    return { key, ...buildNodeData() };
  });
};
