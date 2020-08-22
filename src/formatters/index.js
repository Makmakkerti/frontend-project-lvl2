import yaml from 'js-yaml';
import ini from 'ini';
import flatFormat from './plain.js';
import formatJson from './json.js';
import stylishFormat from './stylish.js';

export const parsers = {
  json: (file) => JSON.parse(file),
  yml: (file) => yaml.safeLoad(file),
  yaml: (file) => yaml.safeLoad(file),
  ini: (file) => ini.parse(file),
};

export const formatters = {
  stylish: (tree) => stylishFormat(tree),
  plain: (tree) => flatFormat(tree),
  json: (tree) => formatJson(tree),
};
