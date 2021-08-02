/* eslint-disable @typescript-eslint/no-var-requires, no-console */
const fs = require('fs');

fs.readFile('./coverage/coverage-summary.json', (err, data) => {
  if (err) {
    console.error(err);
  }

  const summary = JSON.parse(data);
  if (
    summary.total.lines.pct < 80
    || summary.total.statements.pct < 80
    || summary.total.functions.pct < 80
    || summary.total.branches.pct < 80
  ) {
    throw new Error('❌ Less than 80% code coverage');
  } else {
    console.log('✅ Passed code coverage');
  }
});

