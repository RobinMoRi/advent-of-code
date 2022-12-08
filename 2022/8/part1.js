const path = require('path');
const { syncReadFile } = require('../readFile')
const { buildColumns, lookAround, isVisisble } = require('./utils')

const mode = process.argv[2];
const inputFile = mode === 'test' ? 'test.txt' : 'input.txt';
const input = syncReadFile(path.join(__dirname, inputFile));

let columnsByIndex = buildColumns(input);

//Count visibility
function countVisibility(input){
    let count = 0;
    for(let i = 0; i < input.length; i++){
        let row = input[i].split('').map(el => parseInt(el));
        for(let j = 0; j < row.length; j++){
            const curr = input[i][j];
            const { left, right, up, down } = lookAround(i, j, row, columnsByIndex[j]);
            if(isVisisble(left, right, up, down, curr)) count++;
        }
    }
    return count;
}
console.log(countVisibility(input));