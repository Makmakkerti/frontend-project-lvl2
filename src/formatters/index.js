import _ from 'lodash';
import formatToPlain from './plain.js';
import formatToJson from './json.js';
import formatToStylish from './stylish.js';

export const formatters = {
  stylish: formatToStylish,
  plain: formatToPlain,
  json: formatToJson,
};

export const getFormatted = (formatter, diffTree) => {
  if (!_.has(formatters, formatter)) {
    throw new Error(`Unknown formatter: ${formatter}`);
  }
  return formatters[formatter](diffTree);
};
