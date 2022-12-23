const util = require('util');
const { Elf } = require('./Elf');
const { processData, createDirectionValidationQueue } = require('./util');

//Process data
let elves = processData();
let validationQueue = createDirectionValidationQueue();

function suggestMove(elves, validationQueue){
    // console.log('First prio:', validationQueue[0].validation.name)
    //Propose a move
    let suggestions = {};
    for(let key of Object.keys(elves)){
        let elf = elves[key];
        let surr = elf.lookAround(elves);

        //If we have at least one elf around
        if(!surr.noElfAround){
            let x;
            let y;
            for(let item of validationQueue){
                if(item.validation(surr)){
                    result = item.getCoordinates(surr);
                    x = result.x;
                    y = result.y;
                    // console.log('Validated with: ', item.validation.name, item.validation(surr))
                    // console.log('Going from: ', {x: elf.x, y: elf.y}, 'to:', {x,y})
                    break;
                }
            }

            if(!suggestions[`${x},${y}`] && x!==undefined && y!==undefined) suggestions[`${x},${y}`] = [];
            if(x!==undefined && y!==undefined) suggestions[`${x},${y}`].push(elf);
        }
    }

    let first = validationQueue.shift(); //Remove first element;
    validationQueue.push(first); //Push to last
    return suggestions;
}

function move(suggestions, elves){
   let moveCount = 0;
    for(let key of Object.keys(suggestions)){
        let x = parseInt(key.split(',')[0]);
        let y = parseInt(key.split(',')[1]);
        if(suggestions[key].length === 1){
            let elf = suggestions[key][0];
            elf.elfCoordinates = {x: x, y: y, grid: elves};
            moveCount++;
        }
    }
    // draw(elves);
    return moveCount;
}


function moveRounds(elves, validationQueue, rounds=10){
    for(let i = 0; i < rounds; i++){
        let suggestions = suggestMove(elves, validationQueue);
        move(suggestions, elves);
    }
}

function countEmptyTiles(elves){
    let xCoords = [];
    let yCoords = [];
    for(let elf of Object.values(elves)){
        xCoords.push(elf.x);
        yCoords.push(elf.y);
    }

    let cols = Math.max(...xCoords) - Math.min(...xCoords);
    let rows = Math.max(...yCoords) - Math.min(...yCoords);
    // console.log({cols, rows, xCoords, yCoords})
    return ((cols+1)*(rows+1)) - xCoords.length;
}

function draw(elves){
    let xCoords = [];
    let yCoords = [];
    for(let elf of Object.values(elves)){
        xCoords.push(elf.x);
        yCoords.push(elf.y);
    }
    let xOffset = Math.min(...xCoords) < 0 ? Math.abs(Math.min(...xCoords)) : 1;
    let yOffset = Math.min(...yCoords) < 0 ? Math.abs(Math.min(...yCoords)) : 1;
    let cols = Math.max(...xCoords) - Math.min(...xCoords) + xOffset*10;
    let rows = Math.max(...yCoords) - Math.min(...yCoords) + yOffset*10;
    let grid = [];
    for(let i = 0; i < rows; i++){
        grid.push([]);
        for(let j = 0; j < cols; j++){
            grid[grid.length-1].push('.');
        }
    }

    for(let elf of Object.values(elves)){
        grid[elf.y+yOffset][elf.x+xOffset] = '#';
    }

    for(let row of grid){
        console.log(row.join(''));
    }

    
}

moveRounds(elves, validationQueue);
console.log('AFTER 10 ROUNDS')
console.log('Number of Empty Tiles: ', countEmptyTiles(elves));
