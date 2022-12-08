const path = require('path');
const { syncReadFile } = require('../readFile')

const mode = process.argv[2];
const inputFile = mode === 'test' ? 'test.txt' : 'input.txt';
const input = syncReadFile(path.join(__dirname, inputFile));

//Helper structure to releaf computing...
let columnsByIndex = {};
for(let i = 0; i < input.length; i++){
    for(let j = 0; j < input[0].length; j++){
        if(!columnsByIndex[j]){
            columnsByIndex[j] = [];
        }
        columnsByIndex[j].push(parseInt(input[i][j]));
    }
}

//Count visibility
function countVisibility(input){
    let count = 0;
    for(let i = 0; i < input.length; i++){
        let row = input[i].slice(0, input.length).split('').map(el => parseInt(el));
        for(let j = 0; j < row.length; j++){
            // Count edges
            if( (i === 0) || (i === input.length - 1) || ((j === 0 || j === row.length - 1) && (i !== 0))) count++;
            else{
                const left = row.slice(0, j);
                const right = row.slice(j+1, row.length);
                const up = columnsByIndex[j].slice(0, i);
                const down = columnsByIndex[j].slice(i+1, columnsByIndex[j].length);
                const curr = input[i][j]
                if( left.every(el => el < curr) || 
                    right.every(el => el < curr) ||
                    up.every(el => el < curr) ||
                    down.every(el => el < curr)) count++;
            }
        }
    }
    console.log(count)
}

countVisibility(input)