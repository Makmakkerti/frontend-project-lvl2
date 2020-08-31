import _ from 'lodash';
import formatToPlain from './plain.js';
import formatToJson from './json.js';
import formatToStylish from './stylish.js';

export const formatters = {
  stylish: formatToStylish,
  plain: formatToPlain,
  json: formatToJson,
};
