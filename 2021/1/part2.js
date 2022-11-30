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

const arr = syncReadFile('input.txt');
// const arr = syncReadFile('test.txt');

let count = 0;
let prevSum = Infinity;
for(let i = 0; i < arr.length - 2; i++){
    //compute current sum
    const currSum = arr[i] + arr[i+1] + arr[i+2];
    if(currSum > prevSum){
        count++;
    }
    console.log(i, i+1, i+2, count, prevSum, currSum)
    prevSum = currSum;
}
console.log(count);