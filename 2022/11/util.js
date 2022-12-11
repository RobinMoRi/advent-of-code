const path = require('path');
const { syncReadFile } = require('../readFile');

function processData(){
    const mode = process.argv[2];
    const inputFile = mode === 'test' ? 'test.txt' : 'input.txt';
    const input = syncReadFile(path.join(__dirname, inputFile)).map(el => el.trim().split(' '));

    const monkeys = [];
    for(let i = 0; i < input.length; i+=7){
        let monkey = {};
        monkey.items = input[i+1].slice(2).map(el => parseInt(el));
        monkey.operation = {
            value1: input[i+2][input[i+2].length-3], 
            value2: input[i+2][input[i+2].length-1], 
            op: input[i+2][input[i+2].length-2]
        };
        monkey.divisible = parseInt(input[i+3][input[i+3].length-1]);
        monkey.ifTrue = parseInt(input[i+4][input[i+4].length-1]);
        monkey.ifFalse = parseInt(input[i+5][input[i+5].length-1]);
        monkey.inspections = 0;

        monkeys.push(monkey);
    }

    
    return monkeys;
}

module.exports = {
    processData,
}