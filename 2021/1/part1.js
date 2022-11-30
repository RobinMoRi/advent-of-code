console.log('Starting part 1');

const path = require('path');
const fs = require('fs');

function syncReadFile(filename) {
  const arr = fs
  .readFileSync(path.join(__dirname, filename), 'utf8')
  .toString()
  .trim()
  .split('\n')
  .map((num) => parseInt(num, 10));
  return arr;
}

// const arr = syncReadFile('input.txt');
const arr = syncReadFile('test.txt');

let count = 0;
for(let i = 0; i < arr.length; i++){
    const curr = arr[i];
    const next = arr[i+1];
    if(next > curr){
        count++;
    }
}
console.log(count);