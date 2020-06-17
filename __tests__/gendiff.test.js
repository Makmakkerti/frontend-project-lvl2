/* eslint-disable no-undef */
import { checkDiff, readFile } from '../src/checkDiff';

const result = readFile('./__fixtures__/result.txt');
test('Test for JSON', () => {
  expect(checkDiff('__fixtures__/before.json', '__fixtures__/after.json')).toBe(result);
});
