import _ from 'lodash';

const tab = 4;
const lineOffset = 2;

const getOffset = (depth) => lineOffset + depth * tab;
const getTab = (offset) => ' '.repeat(offset);

const stringify = (value, offset) => {
  if (!_.isObject(value)) {
    return value;
  }

  const lineTab = getTab(offset + tab + lineOffset);
  const closingBracketTab = getTab(offset + lineOffset);
  const stringifiedObject = _.keys(value)
    .map((key) => `${key}: ${stringify(value[key], offset + tab)}`)
    .join(`\n${lineTab}`);
  return `{\n${lineTab}${stringifiedObject}\n${closingBracketTab}}`;
};

const getStringFor = {
  deleted: (offset, { key, value }) => `- ${key}: ${stringify(value, offset)}`,
  added: (offset, { key, value }) => `+ ${key}: ${stringify(value, offset)}`,
  unmodified: (offset, { key, value }) => `  ${key}: ${stringify(value, offset)}`,
  modified: (offset, { key, oldValue, value }) => [`- ${key}: ${stringify(oldValue, offset)}`, `+ ${key}: ${stringify(value, offset)}`],
  nested: (offset, { key, children }, fn, depth) => `  ${key}: ${fn(children, depth)}`,
};

const formatToStylish = (diffTree) => {
  const iter = (diffTreeNode, depth) => {
    const offset = getOffset(depth);
    const lineTab = getTab(offset);
    const closingBracketTab = getTab(offset - 2);

    const buildString = (node) => {
      const { type } = node;
      return getStringFor[type](offset, node, iter, depth + 1);
    };

    const diffString = _.flatten(diffTreeNode.map(buildString)).join(`\n${lineTab}`);
    return `{\n${lineTab}${diffString}\n${closingBracketTab}}`;
  };
  return iter(diffTree, 0);
};

export default formatToStylish;
