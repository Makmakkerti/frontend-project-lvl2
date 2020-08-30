import ini from 'ini';
import yaml from 'js-yaml';
import _ from 'lodash';

const isNumeric = (value) => !Number.isNaN(parseFloat(value));

export const numberifyValues = (obj) => _.mapValues(obj, (value) => {
  if (_.isObject(value)) return numberifyValues(value);
  if (isNumeric(value)) return parseFloat(value);
  return value;
});

const iniParse = (data) => numberifyValues(ini.parse(data));

const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  yaml: yaml.safeLoad,
  ini: iniParse,
};

export const parseData = (data, extention) => {
  if (!_.has(parsers, extention)) {
    throw new Error(`Unknown file extention: ${extention}`);
  }
  return parsers[extention](data);
};
