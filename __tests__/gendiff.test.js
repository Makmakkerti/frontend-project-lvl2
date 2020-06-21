/* eslint-disable no-undef */
import { checkDiff } from '../src/checkDiff';
import { readFile } from '../src/parsers';

const result = readFile('./fixtures/result.txt');
test('Test for JSON', () => {
  expect(checkDiff('fixtures/before.json', 'fixtures/after.json')).toBe(result);
});
