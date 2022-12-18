const util = require('util');
const { processData, drawGrid, emptyRow } = require('./util');
const { createRockShape } = require('./Rockshape');

let data = processData().reverse(); //Instruction stack

let count = 1;
let board = [[...emptyRow], [...emptyRow], [...emptyRow]];
let rocks = 0;
while(rocks < 2022){
    // if(data.length <= 0) data = processData().reverse(); //re-read data
    
    
    //Init rockshape to loop through
    let rockShape = createRockShape(count);
    rocks++;

    let initX = 2;
    let initY = rockShape.height - 1;
    const minY = getHighestRockY(board);
    if(minY){
        //Clean rows
        for(let i = 0; i < minY; i++){
            board.shift(); //TODO very unecessary....
        }

        //add three new rows
        for(let i = 0; i < 3; i++){
            board.unshift([...emptyRow]);
        }
    }

    //Add height of shape to board
    for(let i = 0; i < rockShape.height; i++){
        board.unshift([...emptyRow]); //TODO should maybe push and reverse at and....
    }

    rockShape.init(initX, initY);

    // console.log('INIT STATE')
    // lockShapeToGrid(board, rockShape);
    // drawGrid(board);
    // removeShapeToGrid(board, rockShape);
    // console.log('\n');

    //Move rockshape until reached bottom.
    while(true){
        if(data.length <= 0) data = processData().reverse(); //re-read data
        let instruction = data.pop();
        if(instruction === '<') rockShape.moveLeft(board);
        else rockShape.moveRight(board);

        let moveDown = rockShape.moveDown(board);
        if(!moveDown) break;
    }

    // console.log('FINAL STATE')
    lockShapeToGrid(board, rockShape);
    // drawGrid(board);
    // console.log('\n');

    if(count % 5 === 0) count = 1;
    else count++;
}

function lockShapeToGrid(grid, rockShape){
    for(let coord of rockShape.coordinates){
        grid[coord.y][coord.x] = "#";
    }
}

function removeShapeToGrid(grid, rockShape){
    for(let coord of rockShape.coordinates){
        grid[coord.y][coord.x] = ".";
    }
}

//Retrieves the highest rock coordinate Y
function getHighestRockY(grid){
    for(let y = 0; y < grid.length; y++){
        for(let x = 0; x < grid[0].length; x++){
            if(grid[y][x] === "#") return y;
        }
    }
    return null;
}

// console.log(util.inspect(board.reverse(), false, null, true))
drawGrid(board);

let minY = getHighestRockY(board);
console.log({height: board.length-minY, heightGrid: board.length, minY})