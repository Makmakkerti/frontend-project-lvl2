import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) return '[complex value]';
  if (typeof value !== 'string') return value;
  return `'${value}'`;
};

const typeDescriptions = {
  added: (value) => `added with value: ${value}`,
  modified: (oldValue, newValue) => `updated. From ${oldValue} to ${newValue}`,
  deleted: 'removed',
  nested: ' ',
  unmodified: ' ',
};

const buildPropertyDescription = (property) => {
  const { type } = property;

  if (type === 'added') {
    const value = stringify(property.value);
    return typeDescriptions[type](value);
  }
  if (type === 'modified') {
    const oldValue = stringify(property.oldValue);
    const newValue = stringify(property.newValue);
    return typeDescriptions[type](oldValue, newValue);
  }
  const description = typeDescriptions[type];

  if (!description) {
    throw new Error(`Unknown property type: '${type}'`);
  }
  return description;
};

const changedTypes = ['added', 'modified', 'deleted'];

const formatToPlain = (tree) => {
  const iter = (property, type = '', parents = []) => {
    const { key } = property;
    const propertyPath = parents.length ? `${[...parents, key].join('.')}` : key;

    const keys = Object.keys(property);
    if (!keys.includes('children') || changedTypes.includes(type)) {
      const propertyDescription = buildPropertyDescription(property);
      return propertyDescription !== ' ' ? `Property '${propertyPath}' was ${propertyDescription}` : ' ';
    }
    return property.children.flatMap((child) => iter(child, child.type, [...parents, key]));
  };
  return tree.flatMap((node) => iter(node)).filter((propertyDescription) => propertyDescription !== ' ').sort().join('\n');
};

export default formatToPlain;
