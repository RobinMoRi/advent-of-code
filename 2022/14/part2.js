const util = require('util');
const { processData, drawGrid, lookValueExist, move, peek, SAND_UNIT, AIR, ROCK, SAND_OUTLET } = require('./util');

//processData takes one arg: source of sand outlet
const { maxY, grid, relativeSandSrc } = processData([500, 0]);
console.log('============ EMPTY GRID ============');
drawGrid(grid);
console.log('\n');

let floorCoord = maxY + 2;

let count = 0;
let stopFully = false;
let negativeSpace = {};
while(!stopFully){
    let sandUnit = [...relativeSandSrc]; //Starting point
    let stopMove = false;
    count++;
    while(!stopMove){
        // Peek down
        let peekSouth = peek(sandUnit[0], sandUnit[1]+1, grid);
        let peekSouthWest = peek(sandUnit[0]-1, sandUnit[1]+1, grid);
        let peekSouthEast = peek(sandUnit[0]+1, sandUnit[1]+1, grid);

        //Check if we reached sand outlet
        if( sandUnit[1] === relativeSandSrc[1] && 
            sandUnit[0] === relativeSandSrc[0] && 
            peekSouth.val === SAND_UNIT && peekSouthWest.val === SAND_UNIT && peekSouthEast.val === SAND_UNIT){
            stopMove = true;
            stopFully = true;
        }

        // If south val is not a rock or sand, we can go ahead and move to that position
        if( peekSouth.val !== ROCK && 
            peekSouth.val !== SAND_UNIT && 
            negativeSpace[`${peekSouth.x},${peekSouth.y}`] !== SAND_UNIT && 
            peekSouth.y < floorCoord
        ){
            sandUnit = move(sandUnit, peekSouth.x, peekSouth.y);
        }
        else if( peekSouthWest.val !== ROCK && 
                 peekSouthWest.val !== SAND_UNIT && 
                 negativeSpace[`${peekSouthWest.x},${peekSouthWest.y}`] !== SAND_UNIT && 
                 peekSouthWest.y < floorCoord
        ){
            sandUnit = move(sandUnit, peekSouthWest.x, peekSouthWest.y);
        }
        else if( peekSouthEast.val !== ROCK && 
                 peekSouthEast.val !== SAND_UNIT && 
                 negativeSpace[`${peekSouthEast.x},${peekSouthEast.y}`] !== SAND_UNIT && 
                 peekSouthEast.y < floorCoord
        )
        {
            sandUnit = move(sandUnit, peekSouthEast.x, peekSouthEast.y);
        }
        else{
            
            let col = sandUnit[0]; //x
            let row = sandUnit[1]; //y
            if(row < maxY && col >= 0){
                grid[row][col] = SAND_UNIT;
            }else{
                negativeSpace[`${col},${row}`] = SAND_UNIT;
            }
            stopMove = true;
        }
    }
}
console.log('============ SANDED GRID ============');
drawGrid(grid);
console.log('Sand units fallen: ', count)