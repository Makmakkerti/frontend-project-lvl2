import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';
import { readFile } from '../utils.js';

const parserSelector = {
  json: (file) => JSON.parse(file),
  yml: (file) => yaml.safeLoad(file),
  yaml: (file) => yaml.safeLoad(file),
  ini: (file) => ini.parse(file),
};

// eslint-disable-next-line import/prefer-default-export
export const parseFile = (filepath) => {
  const file = readFile(filepath);
  const extention = path.extname(filepath).slice(1);
  return parserSelector[extention](file);
};
