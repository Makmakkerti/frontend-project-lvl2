import _ from 'lodash';
import formatToPlain from './plain.js';
import formatToJson from './json.js';
import formatToStylish from './stylish.js';

const formatters = {
  stylish: formatToStylish,
  plain: formatToPlain,
  json: formatToJson,
};

export const format = (comparisonResult, formatName) => {
  if (!_.has(formatters, formatName)) throw new Error(`Unknown formatter: ${formatName}`);
  return formatters[formatName](comparisonResult);
};
