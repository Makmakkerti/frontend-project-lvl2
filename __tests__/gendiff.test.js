import checkDiff from '../index';
import { readFile } from '../src/parsers';

const testing = ({ before, after, result }) => {
  const received = checkDiff(before, after);
  const expected = readFile(result);
  expect(received).toBe(expected);
};

test.each`
  before                          | after                     | result
  ${'./fixtures/before.json'}     | ${'./fixtures/after.json'}|  ${'./fixtures/result.txt'}
  ${'./fixtures/before.yml'}      | ${'./fixtures/after.yml'} |  ${'./fixtures/result.txt'}
  ${'./fixtures/before.ini'}      | ${'./fixtures/after.ini'} |  ${'./fixtures/result.txt'}
  `('Check each file format', testing);
