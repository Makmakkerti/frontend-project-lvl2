import formatToPlain from './plain.js';
import formatToJson from './json.js';
import formatToStylish from './stylish.js';

const formatters = {
  stylish: formatToStylish,
  plain: formatToPlain,
  json: formatToJson,
};

export const format = (comparisonResult, formatName) => formatters[formatName](comparisonResult);
