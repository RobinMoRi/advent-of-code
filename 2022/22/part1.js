const util = require('util');
const { processData } = require('./util');
const { Player } = require('./Player')

//Process data
let {grid, instructions} = processData();

//Find start position, which, according to description, should be the "leftmost open tile of the top row of tiles"
function findStartPosition(grid){
    for(let i = 0; i < grid.length; i++){
        for(let j = 0; j < grid[0].length; j++){
            if(grid[i][j] === '.') return {x: j, y: i};
        }
    }
}

//Follow instructions. Everything is handled by the Player class
function move(start, grid, instructions){
    let player = new Player(start, grid, 'right');
    for(let instruction of instructions){
        if(!parseInt(instruction)){
            player.rotate(instruction);
        }else{
            player.move(parseInt(instruction));
        }
    }
    return {col: player.x+1, row: player.y+1, face: player.face}
}
let start = findStartPosition(grid);
let final = move(start, grid, instructions);
console.log('Password:', 1000*final.row + 4*final.col + final.face);
