import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) return '[complex value]';
  if (typeof value !== 'string') return value;
  return `'${value}'`;
};

const getPropertyDescription = (name, type, value, newValue) => {
  switch (type) {
    case 'added':
      return `Property '${name}' was added with value: ${value}`;
    case 'modified':
      return `Property '${name}' was updated. From ${value} to ${newValue}`;
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

const changedTypes = ['added', 'modified', 'deleted'];

const formatToPlain = (tree) => {
  const iter = (property, type = '', parents = []) => {
    const {
      key, value, oldValue, newValue,
    } = property;

    const propertyPath = parents.length ? `${[...parents, key].join('.')}` : key;

    if (!Object.keys(property).includes('children') || changedTypes.includes(type)) {
      const propertyValue = oldValue ? stringify(oldValue) : stringify(value);
      const propertyNewValue = newValue ? stringify(newValue) : '';
      return getPropertyDescription(propertyPath, property.type, propertyValue, propertyNewValue);
    }
    return property.children.flatMap((child) => iter(child, child.type, [...parents, key]));
  };
  return tree.flatMap((node) => iter(node)).filter((propertyDescription) => propertyDescription !== ' ').sort().join('\n');
};

export default formatToPlain;
