const path = require('path');
const { syncReadFile } = require('../readFile');
const { buildColumns, lookAround, getScenicScore } = require('./utils');

const mode = process.argv[2];
const inputFile = mode === 'test' ? 'test.txt' : 'input.txt';
const input = syncReadFile(path.join(__dirname, inputFile));

let columnsByIndex = buildColumns(input);

//Count scenic score
function countScenicScore(input){
    let highestScore = 0;
    for(let i = 0; i < input.length; i++){
        let row = input[i].split('').map(el => parseInt(el));
        for(let j = 0; j < row.length; j++){
            const curr = parseInt(input[i][j]);
            const { left, right, up, down } = lookAround(i, j, row, columnsByIndex[j]);
            const currScenicScore = getScenicScore(left, right, up, down, curr);
            if(currScenicScore > highestScore) highestScore = currScenicScore;
        }
    }
    return highestScore;
}
console.log(countScenicScore(input));