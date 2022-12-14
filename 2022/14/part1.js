const util = require('util');
const { processData, drawGrid, lookValueExist, move, peek, SAND_UNIT, AIR, ROCK } = require('./util');

//processData takes one arg: source of sand outlet
const { grid, relativeSandSrc } = processData([500, 0]);
console.log('============ EMPTY GRID ============');
drawGrid(grid);
console.log('\n');

let count = 0;
let stopFully = false;
//Outer loop to process each unit of sand
while(!stopFully){
    let sandUnit = [...relativeSandSrc];
    let stopMove = false;
    count++;

    //Move sand unit until it has landed successfully (or outside grid)
    while(!stopMove){
        if(!grid[sandUnit[1]] || !grid[sandUnit[1]][sandUnit[0]] ){
            stopMove = true;
            stopFully = true;
        }

        //Peek in these direction (all 3 down): /|\
        let peekSouth = peek(sandUnit[0], sandUnit[1]+1, grid);
        let peekSouthWest = peek(sandUnit[0]-1, sandUnit[1]+1, grid);
        let peekSouthEast = peek(sandUnit[0]+1, sandUnit[1]+1, grid);
    
        //Prioritise moving straight down, then to left, finally to the right
        if(peekSouth.val !== ROCK && peekSouth.val !== SAND_UNIT){
            sandUnit = move(sandUnit, peekSouth.x, peekSouth.y);
        }
        else if(peekSouthWest.val !== ROCK && peekSouthWest.val !== SAND_UNIT){
            sandUnit = move(sandUnit, peekSouthWest.x, peekSouthWest.y);
        }
        else if(peekSouthEast.val !== ROCK && peekSouthEast.val !== SAND_UNIT){
            sandUnit = move(sandUnit, peekSouthEast.x, peekSouthEast.y);
        }
        else{
            //This is the position where we finally settle to a valid position
            stopMove = true;
            let row = sandUnit[1];
            let col = sandUnit[0];
            grid[row][col] = 'o'; //Update grid with position of sand unit
        }
    }
}
console.log('============ SANDED GRID ============');
drawGrid(grid);
console.log('Sand units fallen: ', count-1)