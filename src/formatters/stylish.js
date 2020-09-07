import _ from 'lodash';

const tab = 4;
const startIndent = 2;
const getIndent = (depth, indent = 0) => ' '.repeat(depth * tab + indent);

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }
  const stringifiedChildren = _.keys(value).map((key) => `${key}: ${stringify(value[key], depth + 1)}`);
  const stringifiedObject = stringifiedChildren.join(`\n${getIndent(depth, tab)}`);
  return `{\n${getIndent(depth, tab)}${stringifiedObject}\n${getIndent(depth)}}`;
};

const getStringFor = {
  deleted: (depth, { key, value }) => `- ${key}: ${stringify(value, depth)}`,
  added: (depth, { key, value }) => `+ ${key}: ${stringify(value, depth)}`,
  unmodified: (depth, { key, value }) => `  ${key}: ${stringify(value, depth)}`,
  modified: (depth, { key, oldValue, value }) => [`- ${key}: ${stringify(oldValue, depth)}`, `+ ${key}: ${stringify(value, depth)}`],
  nested: (depth, { key, children }, fn) => `  ${key}: ${fn(children, depth)}`,
};

const formatToStylish = (diffTree) => {
  const iter = (diffTreeNode, depth) => {
    const buildString = (node) => getStringFor[node.type](depth + 1, node, iter);
    const diffString = diffTreeNode.flatMap(buildString).join(`\n${getIndent(depth, startIndent)}`);
    return `{\n${getIndent(depth, startIndent)}${diffString}\n${getIndent(depth)}}`;
  };
  return iter(diffTree, 0);
};

export default formatToStylish;
