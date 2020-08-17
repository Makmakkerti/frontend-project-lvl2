import checkDiff from '../index';
import { readFile } from '../src/parsers';

const tests = [
  ['fixtures/before.json', 'fixtures/after.json'],
  ['fixtures/before.yml', 'fixtures/after.yml'],
  ['fixtures/before.ini', 'fixtures/after.ini'],
];
const result = readFile('./fixtures/result.txt');

test.each(tests)('Test checkDiff', (a, b) => {
  expect(checkDiff(a, b)).toBe(result);
});
