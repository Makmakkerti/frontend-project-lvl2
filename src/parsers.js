import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const parserSelector = {
  json: (file) => JSON.parse(file),
  yml: (file) => yaml.safeLoad(file),
  yaml: (file) => yaml.safeLoad(file),
  ini: (file) => ini.parse(file),
};

export const readFile = (filepath) => fs.readFileSync(path.join(path.resolve(), filepath), 'utf-8');

export const parseFile = (filepath) => {
  const file = readFile(filepath);
  const extention = path.extname(filepath).slice(1);
  return parserSelector[extention](file);
};
