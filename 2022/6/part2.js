const path = require('path');
const { syncReadFile } = require('../readFile')

const mode = process.argv[2];
const inputFile = mode === 'test' ? 'test.txt' : 'input.txt';
const input = syncReadFile(path.join(__dirname, inputFile))[0];

let right = 0;
let match;
for(let left = 0; left < input.length; left++){
    right = left + 13;
    const regex = /^(?!.*(.).*\1)[a-z]+$/
    match = input.slice(left, right+1).match(regex);
    if(match) break;
}
console.log(match[0], right + 1);