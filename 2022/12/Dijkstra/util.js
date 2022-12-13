const path = require('path');
const { syncReadFile } = require('../../readFile');
const { WeightedGraph } = require('./WeightedGraph');

function convertChar(char){
    let tempChar = char;
    if(tempChar === 'E') tempChar = 'z';
    else if(tempChar === 'S') tempChar = 'a';
    return tempChar;
}

function processData(){
    const mode = process.argv[2];
    const inputFile = mode === 'test' ? 'test.txt' : 'input.txt';
    const input = syncReadFile(path.join(__dirname, inputFile)).map(el => el.trim().split(''));
    let endIndex = '';
    let startIndex = '';

    let graph = new WeightedGraph();
    for(let i = 0; i < input.length; i++){
        for(let j = 0; j < input[0].length; j++){
            let curr = convertChar(input[i][j]);

            //Set start and end indices
            if(input[i][j] === 'E') endIndex = `${i}-${j}-${curr}`;
            if(input[i][j] === 'S') startIndex = `${i}-${j}-${curr}`;

            let temp = [];
            //Top
            if(input[i-1] && input[i-1][j]){
                temp.push({val: convertChar(input[i-1][j]), row: i-1, col: j});
            };
            //Bottom
            if(input[i+1] && input[i+1][j]){
                temp.push({val: convertChar(input[i+1][j]), row: i+1, col: j});
            };
            //Left
            if(input[i][j-1]){
                temp.push({val: convertChar(input[i][j-1]), row: i, col: j-1});
            };
            //Right
            if(input[i][j+1]){
                temp.push({val: convertChar(input[i][j+1]), row: i, col: j+1});
            };
            
            while(temp.length > 0){
                const child = temp.pop();
                //distance should be maximum to be eligible for adding to graph.
                let distance = child.val.charCodeAt(0) - curr.charCodeAt(0);
                if(distance <= 1){
                    //distance above could be negative, hence we should math abs it
                    distance = Math.abs(distance+25);
                    graph.addEdge(`${i}-${j}-${curr}`, `${child.row}-${child.col}-${child.val}`, distance);
                }
            }
        }
    }
    return { graph, startIndex, endIndex, input };
}


function drawPath(path, input){
    let grid = input.map((arr) => arr.slice());

    for(line of path){
        let row = parseInt(line.split('-')[0]);
        let col = parseInt(line.split('-')[1]);
        grid[row][col] = `\x1b[35m${grid[row][col]}\x1b[0m`;
    }

    for(let i = 0; i < grid.length; i++){
        let temp = grid[i].join('');
        console.log(temp);
    }

}

module.exports = {
    processData,
    drawPath,
    convertChar
}