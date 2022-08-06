import { readFileSync } from 'fs';
import path from 'path';
import _ from 'lodash';

const getExtension = (fileName) => path.extname(fileName).slice(1);

const fullPath = (fileName) => path.resolve(process.cwd(), fileName);

const readFile = (fileName) => {
  return readFileSync(fullPath(fileName), 'utf-8');
};

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const fileData1 = readFile(filepath1);
  const fileData2 = readFile(filepath2);

  const parsedFile1 = JSON.parse(fileData1);
  const parsedFile2 = JSON.parse(fileData2);

  const keys1 = Object.keys(parsedFile1);
  const keys2 = Object.keys(parsedFile2);

  const sortedKeys = _.sortBy(_.union(keys1, keys2));
  const resultDiff = sortedKeys.map((key) => {
    const value1 = parsedFile1[key];
    const value2 = parsedFile2[key];

    if (!_.has(parsedFile2, key)) {
      return `  - ${key}: ${value1}`;
    }
    if (!_.has(parsedFile1, key)) {
      return `  + ${key}: ${value2}`;
    }
    if (_.has(parsedFile1, key) && _.has(parsedFile2, key)) {
      if (value1 === value2) {
        return `    ${key}: ${value1}`;
      } else {
        return (`  - ${key}: ${value1}\n  + ${key}: ${value2}`);
      }
    }
  });

  return `{\n${resultDiff.join('\n')}\n}`;
};

export default genDiff;
