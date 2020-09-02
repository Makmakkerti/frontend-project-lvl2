import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) return '[complex value]';
  if (typeof value !== 'string') return value;
  return `'${value}'`;
};

const getPropertyName = (property, parents) => [...parents, property].join('.');

const mapping = {
  added: (node, currentPath) => `Property '${getPropertyName(node.key, currentPath)}' was added with value: ${stringify(node.value)}`,
  modified: (node, currentPath) => `Property '${getPropertyName(node.key, currentPath)}' was updated. From ${stringify(node.oldValue)} to ${stringify(node.value)}`,
  deleted: (node, currentPath) => `Property '${getPropertyName(node.key, currentPath)}' was removed`,
  nested: (node, currentPath, iter) => iter(node.children, [...currentPath, node.key]),
  unmodified: () => ' ',
};

const formatToPlain = (tree) => {
  const iter = (nodes, curPath) => nodes.flatMap((node) => mapping[node.type](node, curPath, iter));
  return iter(tree, []).filter((description) => description !== ' ').join('\n');
};

export default formatToPlain;
