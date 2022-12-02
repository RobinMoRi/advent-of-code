const path = require('path');
const { syncReadFile } = require('../readFile')

const mode = process.argv[2];
const inputFile = mode === 'test' ? 'test.txt' : 'input.txt';
const arr = syncReadFile(path.join(__dirname, inputFile)).map((cal) => parseInt(cal));

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