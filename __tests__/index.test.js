import checkDiff from '../index';
import { readFile } from '../src/utils.js';

const fixtPath = './__fixtures__/';

const resultFiles = {};

beforeAll(() => {
  resultFiles.stylish = readFile(`${fixtPath}stylish.txt`);
  resultFiles.plain = readFile(`${fixtPath}plain.txt`);
  resultFiles.json = readFile(`${fixtPath}json.txt`);
});

const testList = [
  ['yml', 'stylish'],
  ['yml', 'plain'],
  ['yml', 'json'],
  ['json', 'stylish'],
  ['json', 'plain'],
  ['json', 'json'],
  ['ini', 'stylish'],
  ['ini', 'plain'],
  ['ini', 'json'],
];

const buildFixturePath = (pathToFolder, filename, ext) => `${pathToFolder}${filename}.${ext}`;

test.each(testList)('Testing gendiff %s with formatter %s', (format, formatter) => {
  const received = checkDiff(formatter,
    buildFixturePath(fixtPath, 'before', format),
    buildFixturePath(fixtPath, 'after', format));

  const expected = resultFiles[formatter];
  expect(received).toBe(expected);
});
