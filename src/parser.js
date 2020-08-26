import ini from 'ini';
import yaml from 'js-yaml';
import _ from 'lodash';

const isNumeric = (value) => !Number.isNaN(parseFloat(value));

export const numberifyValues = (obj) => _.mapValues(obj, (value) => {
  if (_.isObject(value)) {
    return numberifyValues(value);
  }
  if (isNumeric(value)) {
    return parseFloat(value);
  }
  return value;
});

const parsers = {
  json: (file) => JSON.parse(file),
  yml: (file) => yaml.safeLoad(file),
  yaml: (file) => yaml.safeLoad(file),
  ini: (file) => numberifyValues(ini.parse(file)),
};

export const parseData = (file, extention) => parsers[extention](file);
