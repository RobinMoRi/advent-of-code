const path = require('path');
const { syncReadFile } = require('../readFile');
const SAND_UNIT = 'o';
const ROCK = '#';
const AIR = '.'
const SAND_OUTLET = '+';

function processData(sandSrc){
    const mode = process.argv[2];
    const inputFile = mode === 'test' ? 'test.txt' : 'input.txt';
    const input = syncReadFile(path.join(__dirname, inputFile)).map(el => el.trim().split(' -> '));
    
    let { maxX, minX, maxY, minY, cols, rows, borderCoordsX, borderCoordsY } = getGridBorders(input, sandSrc);
    let coords = [];
    let relativeSandSrc = [sandSrc[0]-minX, sandSrc[1]-minY]
    for(let line of input){
        for(let i = 0; i < line.length-1; i++){
            let currX = line[i].split(',')[0]-minX;
            let currY = line[i].split(',')[1]-minY;
            let nextX = line[i+1].split(',')[0]-minX;
            let nextY = line[i+1].split(',')[1]-minY;
    
            let temp = drawCoordinatesBetween(currX, currY, nextX, nextY);
            coords.push(...temp);
        }
    }


    let grid = [];

    for(let i = 0; i < rows; i++){
        grid.push(new Array(cols))
        for(let j = 0; j < cols; j++){
            grid[i][j] = AIR;
        }
    }

    for(let coord of coords){
        let x = coord[0];
        let y = coord[1];
        for(let i = 0; i < rows; i++){
            for(let j = 0; j < cols; j++){
                if(x === j && y === i) grid[i][j] = ROCK;
                if(j === relativeSandSrc[0] && i === relativeSandSrc[1]) grid[i][j]= SAND_OUTLET;
            }
        }
    }

    return {borderCoordsX, borderCoordsY, maxX, minX, maxY, minY, grid, relativeSandSrc};
}

function drawCoordinatesBetween(x1,y1,x2,y2){
    let coords = [];
    //Left to right
    if(x2 > x1){
        for(let i = x1; i <= x2; i++){
            coords.push([i,y1]);
        }
    }
    //Right to left
    else if(x1 > x2){
        for(let i = x2; i <= x1; i++){
            coords.push([i,y1]);
        }
    }
    //top to bottom
    else if(y2 > y1){
        for(let i = y1; i <= y2; i++){
            coords.push([x1,i]);
        }
    }
    //Bottom to top
    else if(y2 < y1){
        for(let i = y2; i <= y1; i++){
            coords.push([x1,i]);
        }
    }
    return coords;
}

function getGridBorders(input, sandSrc){
    let inputCopy = [...input]
    const borderCoordsX = [...inputCopy.flat().map(el => el.split(',')[0]), sandSrc[0]];
    const borderCoordsY = [...inputCopy.flat().map(el => el.split(',')[1]), sandSrc[1]];

    const maxX = Math.max(...borderCoordsX, sandSrc[0]);
    const maxY = Math.max(...borderCoordsY, sandSrc[1]);
    const minX = Math.min(...borderCoordsX, sandSrc[0]);
    const minY = Math.min(...borderCoordsY, sandSrc[1]);
    const cols = maxX - minX + 1;
    const rows = maxY - minY + 1;
    return { maxX, minX, maxY, minY, cols, rows, borderCoordsX, borderCoordsY }
}

function drawGrid(grid){
    for(let i = 0; i < grid.length; i++){
        console.log(grid[i].join(''));
    }
}

//Returns true if out of boundaries or if obstacle
function lookValueExist(x, y, val, grid){
    console.log(grid)
    //Change below OOB logic
    if(!grid[y] || !grid[y][x]) return true;

    if(grid[y][x] === val){
        console.log(true)
        return true;
    }
    console.log('false')
    return false;
}

//Move sand unit
function move(sandUnit, x, y){
    sandUnit = [x, y];
    return sandUnit;
}

function peek(x, y, grid){
    if(!grid[y]) return {val: undefined, x, y};
    return {val: grid[y][x], x, y};
}

module.exports = {
    processData,
    drawGrid,
    lookValueExist,
    move,
    peek,
    SAND_UNIT,
    AIR,
    ROCK,
    SAND_OUTLET
}