const path = require('path');
const { syncReadFile } = require('../readFile');

const emptyRow = ['.','.','.','.','.','.','.'];

function processData(){
    const mode = process.argv[2];
    const inputFile = mode === 'test' ? 'test.txt' : 'input.txt';
    const input = syncReadFile(path.join(__dirname, inputFile))[0].split('');
    return input;
}

function drawGrid(grid){
    for(let i = 0; i < grid.length; i++){
        console.log(grid[i].join(''));
    }
}


module.exports = {
    processData,
    drawGrid,
    emptyRow
}