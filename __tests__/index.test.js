import checkDiff from '../index';
import { readFile } from '../src/utils.js';

// eslint-disable-next-line object-curly-newline
const testing = ({ before, after, result, format }) => {
  const received = checkDiff(format, before, after);
  const expected = readFile(result);
  expect(received).toBe(expected);
};
const fpath = './fixtures/flat/';
const npath = './fixtures/nested/';

test.each`
  before                       | after                     | result                   | format
  ${`${fpath}before.json`}     | ${`${fpath}after.json`}   |  ${`${fpath}result.txt`} | ${'stylish'}
  ${`${fpath}before.yml`}      | ${`${fpath}after.yml`}    |  ${`${fpath}result.txt`} | ${'stylish'}
  ${`${fpath}before.ini`}      | ${`${fpath}after.ini`}    |  ${`${fpath}result.txt`} | ${'stylish'}
  ${`${npath}before.json`}     | ${`${npath}after.json`}   |  ${`${npath}result.txt`} | ${'stylish'}
  ${`${npath}before.yml`}      | ${`${npath}after.yml`}    |  ${`${npath}result.txt`} | ${'stylish'}
  ${`${npath}before.ini`}      | ${`${npath}after.ini`}    |  ${`${npath}result.txt`} | ${'stylish'}
  ${`${npath}before.json`}     | ${`${npath}after.json`}   |  ${`${npath}plain.txt`}  | ${'plain'}
  ${`${npath}before.json`}     | ${`${npath}after.json`}   |  ${`${npath}json.txt`}   | ${'json'}
  `('Multiple check', testing);
