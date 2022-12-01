const path = require('path');
const fs = require('fs');

function syncReadFile(filename) {
  const arr = fs
  .readFileSync(path.join(__dirname, filename), 'utf8')
  .toString()
  .trim()
  .split('\n')
  .map((cal) => parseInt(cal))
  return arr;
}

const arr = syncReadFile('input.txt');
// const arr = syncReadFile('test.txt');

let count = 0; //count reindeers
let sum = 0; //sum each reindeers calories
let calories = [];

for(let i = 0; i < arr.length; i++){
  if(isNaN(arr[i])){
    count++;
    calories.push(sum);
    sum = 0;
  }else{
    sum += arr[i];
  }
}

const sortedCalories = calories.sort((a,b) => b-a);

console.log(sortedCalories[0] + sortedCalories[1] + sortedCalories[2])