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
function countScenicScore(input){
    let highestScore = 0;
    for(let i = 0; i < input.length; i++){
        let row = input[i].slice(0, input.length).split('').map(el => parseInt(el));
        for(let j = 0; j < row.length; j++){
            const left = row.slice(0, j).reverse();
            const right = row.slice(j+1, row.length);
            const up = columnsByIndex[j].slice(0, i).reverse();
            const down = columnsByIndex[j].slice(i+1, columnsByIndex[j].length);
            const curr = parseInt(input[i][j]);
            const currScenicScore = countVisibleTree(left, curr) * countVisibleTree(right, curr) * countVisibleTree(up, curr) * countVisibleTree(down, curr);
            if(currScenicScore > highestScore) highestScore = currScenicScore;
        }
    }
    console.log(highestScore)
}

function countVisibleTree(arr, val){
    let count = 0;
    for(let el of arr){
        count++;
        if(el >= val) break;
    }
    return count;
}

countScenicScore(input)