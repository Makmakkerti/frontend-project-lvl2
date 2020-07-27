/* eslint-disable no-undef */
import checkDiff from '../index';
import { readFile } from '../src/parsers';

const result = readFile('./fixtures/result.txt');
test.each([
  ['fixtures/before.json', 'fixtures/after.json'],
  ['fixtures/before.yml', 'fixtures/after.yml'],
  ['fixtures/before.ini', 'fixtures/after.ini'],
])('Test checkDiff', (a, b) => {
  expect(checkDiff(a, b)).toBe(result);
});
