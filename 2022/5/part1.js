const path = require('path');
const { syncReadFile } = require('../readFile')
const { initStack, printLastItem2d } = require('./util')

const mode = process.argv[2];
const inputFile = mode === 'test' ? 'test.txt' : 'input.txt';
const arr = syncReadFile(path.join(__dirname, inputFile))
    .filter(el => el[0] === 'm')
    .map(el => el.split(' '));
const stacks = initStack(mode);

for(let instruction of arr){
    const numberOfMovements = parseInt(instruction[1]);
    const from = parseInt(instruction[3]) - 1;
    const to = parseInt(instruction[5]) - 1;

    for(let i = 0; i < numberOfMovements; i++){
        const el = stacks[from].pop();
        stacks[to].push(el);
    }
}

printLastItem2d(stacks);