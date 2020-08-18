import checkDiff from '../index';
import { readFile } from '../src/parsers';

const testing = ({ before, after, result }) => {
  const received = checkDiff(before, after);
  const expected = readFile(result);
  expect(received).toBe(expected);
};
const fpath = './fixtures/flat/';
const npath = './fixtures/nested/';

test.each`
  before                       | after                     | result
  ${`${fpath}before.json`}     | ${`${fpath}after.json`}   |  ${`${fpath}result.txt`}
  ${`${fpath}before.yml`}      | ${`${fpath}after.yml`}    |  ${`${fpath}result.txt`}
  ${`${fpath}before.ini`}      | ${`${fpath}after.ini`}    |  ${`${fpath}result.txt`}
  ${`${npath}before.json`}     | ${`${npath}after.json`}   |  ${`${npath}result.txt`}
  ${`${npath}before.yml`}      | ${`${npath}after.yml`}    |  ${`${npath}result.txt`}
  ${`${npath}before.ini`}      | ${`${npath}after.ini`}    |  ${`${npath}result.txt`}
  `('Check each file format', testing);
