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
  json: (data) => JSON.parse(data),
  yml: (data) => yaml.safeLoad(data),
  yaml: (data) => yaml.safeLoad(data),
  ini: (data) => numberifyValues(ini.parse(data)),
};

export const parseData = (data, extention) => parsers[extention](data);
