import flatFormat from './plain.js';
import formatJson from './json.js';
import stylishFormat from './stylish.js';

export const formatters = {
  stylish: (tree) => stylishFormat(tree),
  plain: (tree) => flatFormat(tree),
  json: (tree) => formatJson(tree),
};
