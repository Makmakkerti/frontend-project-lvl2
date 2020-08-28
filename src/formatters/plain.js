import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) return '[complex value]';
  if (typeof value !== 'string') return value;
  return `'${value}'`;
};

const buildPropertyDescription = (node) => {
  const { type } = node;
  if (type === 'added') return `added with value: ${stringify(node.value)}`;
  if (type === 'modified') return `updated. From ${stringify(node.oldValue)} to ${stringify(node.newValue)}`;
  if (type === 'deleted') return 'removed';
  if (type === 'nested' || type === 'unmodified') return ' ';
  return ' ';
};

const changedTypes = ['added', 'modified', 'deleted'];

const formatToPlain = (tree) => {
  const iter = (property, type = '', parent = []) => {
    const propertyPath = parent.length ? `${parent.join('.')}.${property.key}` : property.key;
    const keys = Object.keys(property);
    if (!keys.includes('children') || changedTypes.includes(type)) {
      const propertyDescription = buildPropertyDescription(property);
      return propertyDescription !== ' ' ? `Property '${propertyPath}' was ${propertyDescription}` : ' ';
    }
    const propertyChildren = property.children;
    return propertyChildren.flatMap((child) => iter(child, child.type, [...parent, property.key]));
  };
  return tree.flatMap((node) => iter(node)).filter((propertyDescription) => propertyDescription !== ' ').sort().join('\n');
};

export default formatToPlain;
