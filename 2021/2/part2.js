console.log('Starting part 1');

const path = require('path');
const fs = require('fs');

function syncReadFile(filename) {
  const arr = fs
  .readFileSync(path.join(__dirname, filename), 'utf8')
  .toString()
  .trim()
  .split('\n')
  .map((instr) => {
        const direction = instr.split(' ')[0];
        const X = parseInt(instr.split(' ')[1]);
        return {direction, X};
  });
  return arr;
}

const arr = syncReadFile('input.txt');
// const arr = syncReadFile('test.txt');

let aim = 0;
const position = {
    horizontal: 0,
    depth: 0
}

for(let i = 0; i < arr.length; i++){
    if(arr[i].direction === 'down'){
        aim += arr[i].X;
    }
    if(arr[i].direction === 'up'){
        aim -= arr[i].X;
    }
    if(arr[i].direction === 'forward'){
        position.horizontal += arr[i].X;
        position.depth += (arr[i].X*aim);
    }
}
console.log(arr)

console.log(position.horizontal * position.depth, position);