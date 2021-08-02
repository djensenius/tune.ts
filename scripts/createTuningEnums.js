/* eslint-disable @typescript-eslint/no-var-requires, import/no-extraneous-dependencies, prefer-arrow-callback, func-names, consistent-return, no-console */
const fs = require('fs');
const numWords = require('num-words');
const _ = require('lodash');

fs.readFile('./src/tunings-pretty.json', (err, data) => {
  if (err) {
    console.error(err);
  }

  const tunings = JSON.parse(data);
  const keys = Object.keys(tunings);
  const values = Object.values(tunings);

  let fileString = 'import { Tuning } from \'./tune.js\'\n\n';
  let enumString = 'export enum TuningSystem {\n';
  fileString += 'export const System: Record<string, Tuning> = {\n';
  let tuningMD = '# List of Tunings \n';
  tuningMD += '|Name |Description |\n';
  tuningMD += '--- | --- |\n';
  for (let i = 0; i < keys.length; i += 1) {
    const split = keys[i].split('-');
    let enumValue = '';
    for (let j = 0; j < split.length; j += 1) {
      let numWord = numWords(split[j]);
      if (numWord) {
        if (numWord === '24erlich_keenan') {
          numWord = 'twenty_four_erlich_keenan';
        }
        enumValue += `${numWord.replace(/[ ,\\,+]/g, '_')}`;
      } else {
        if (split[j] === '24erlich') {
          split[j] = 'twenty_four_erlich';
        }
        enumValue += `${split[j].replace(/[ ,\\,+]/g, '_')}`;
      }
      if (j < (split.length - 1)) {
        enumValue += '_';
      }
    }
    values[i].name = keys[i];
    enumValue = _.camelCase(enumValue);
    fileString += `  ${enumValue}: `;
    fileString += `${JSON.stringify(values[i])},\n`;
    enumString += `  ${enumValue} = '${enumValue}',\n`;
    tuningMD += `|${enumValue} |${values[i].description}|\n`;
  }
  fileString += '};\n';
  enumString += '};\n';
  fileString += enumString;
  fs.writeFile('./src/tune/systems.ts', fileString, function (writeErr) {
    if (err) {
      return console.error(writeErr);
    }
    console.log('✅ Tuning enums generated');
  });
  fs.writeFile('./TUNINGS.md', tuningMD, function (writeErr) {
    if (err) {
      return console.error(writeErr);
    }
    console.log('✅ Wrote TUNINGS.md');
  });
});

