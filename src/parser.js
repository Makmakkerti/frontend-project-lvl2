import ini from 'ini';
import yaml from 'js-yaml';
import { numberifyValues } from './utils.js';

export const parseFile = (file, extention, parserSelector) => parserSelector[extention](file);

export const parsers = {
  json: (file) => JSON.parse(file),
  yml: (file) => yaml.safeLoad(file),
  yaml: (file) => yaml.safeLoad(file),
  ini: (file) => numberifyValues(ini.parse(file)),
};
