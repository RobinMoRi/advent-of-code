const path = require('path');
const fs = require('fs');

function syncReadFile(filename) {
  const arr = fs
  .readFileSync(path.join(__dirname, filename), 'utf8')
  .toString()
  .trim()
  .split('\n')
  return arr;
}

const arr = syncReadFile('input.txt');
// const arr = syncReadFile('test.txt');