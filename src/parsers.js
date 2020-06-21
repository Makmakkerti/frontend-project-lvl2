import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

export const readFile = (filename) => fs.readFileSync(path.join(path.resolve(), filename), 'utf-8');
const parseJson = (filepath) => JSON.parse(readFile(filepath));
const parseYml = (filepath) => yaml.safeLoad(readFile(filepath));
const parseIni = (filepath) => ini.parse(readFile(filepath));

export const parseFile = (filename) => {
  const extention = path.extname(filename);
  switch (extention) {
    case '.json':
      return parseJson(filename);
    case '.yml':
      return parseYml(filename);
    case '.ini':
      return parseIni(filename);
    default:
      throw new Error('Unknown file type');
  }
};
