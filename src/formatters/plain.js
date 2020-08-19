import _ from 'lodash';

const checkValueCompexity = (value) => {
  if (_.isObject(value)) return '[complex value]';
  if (typeof value !== 'string') return value;
  return `'${value}'`;
};

const buildString = (node) => {
  const { type } = node;
  if (type === 'added') return `added with value: ${checkValueCompexity(node.value)}`;
  if (type === 'modified') return `updated. From ${checkValueCompexity(node.oldValue)} to ${checkValueCompexity(node.newValue)}`;
  if (type === 'deleted') return 'removed';
  return ' ';
};

const typeList = ['added', 'modified', 'deleted'];

const flatFormat = (tree) => {
  const iter = (node, type = '', parent = '') => {
    parent += `.${node.key}`;
    const beginning = `Property '${parent.slice(1)}' was`;
    const keys = Object.keys(node);
    if (!keys.includes('children') || typeList.includes(type)) {
      const ret = buildString(node);
      return ret !== ' ' ? `${beginning} ${buildString(node)}` : ' ';
    }
    const { children } = node;
    return children.flatMap((child) => iter(child, child.type, parent));
  };
  return tree.flatMap((el) => iter(el)).filter((s) => s !== ' ').sort().join('\n');
};

export default flatFormat;
