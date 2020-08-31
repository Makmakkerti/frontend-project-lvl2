import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) return '[complex value]';
  if (typeof value !== 'string') return value;
  return `'${value}'`;
};

const getPropDescription = (name, type, oldValue, value) => {
  switch (type) {
    case 'added':
      return `Property '${name}' was added with value: ${stringify(value)}`;
    case 'modified':
      return `Property '${name}' was updated. From ${stringify(oldValue)} to ${stringify(value)}`;
    case 'deleted':
      return `Property '${name}' was removed`;
    case 'nested':
      return ' ';
    case 'unmodified':
      return ' ';
    default:
      throw new Error(`Unknown property type: ${type}`);
  }
};

const modified = ['added', 'modified', 'deleted'];

const formatToPlain = (tree) => {
  const iter = (property, type = '', parents = []) => {
    const {
      key, value, oldValue,
    } = property;

    const propertyPath = parents.length ? `${[...parents, key].join('.')}` : key;

    if (!_.has(property, 'children') || modified.includes(type)) {
      return getPropDescription(propertyPath, property.type, oldValue, value);
    }
    return property.children.flatMap((child) => iter(child, child.type, [...parents, key]));
  };
  return tree.flatMap((node) => iter(node)).filter((propertyDescription) => propertyDescription !== ' ').sort().join('\n');
};

export default formatToPlain;
