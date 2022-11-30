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
        const steps = instr.split(' ')[1];
        return {direction, steps};
  });
  return arr;
}

const arr = syncReadFile('input.txt');
// const arr = syncReadFile('test.txt');

const instructions = {
    forward: {
        step: 1,
        direction: 'horizontal'
    },
    up: {
        step: -1,
        direction: 'depth'
    },
    down: {
        step: 1,
        direction: 'depth'
    }
}

const position = {
    horizontal: 0,
    depth: 0
}

//Not the best solution :D seemed better in my head ...

for(let i = 0; i < arr.length; i++){
    const direction = arr[i].direction;
    const steps = arr[i].steps;
    position[instructions[direction].direction] += instructions[direction].step*steps;
}

console.log(position.horizontal * position.depth);