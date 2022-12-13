const path = require('path');
const { syncReadFile } = require('../../readFile');
const { Grid } = require('./Grid');

function convertChar(char){
    let tempChar = char;
    if(tempChar === 'E') tempChar = 'z';
    else if(tempChar === 'S') tempChar = 'a';
    return tempChar;
}

//Process data
function processData(){
    const mode = process.argv[2];
    const inputFile = mode === 'test' ? 'test.txt' : 'input.txt';
    const input = syncReadFile(path.join(__dirname, inputFile)).map(el => el.trim().split(''));
    let start;
    let end;

    let grid = new Grid();
    grid.init(input.length, input[0].length);

    //Populate val
    for(let i = 0; i < input.length; i++){
        for(let j = 0; j < input[0].length; j++){
            //Set start and end indices
            if(input[i][j] === 'E') end = grid.gridPoints[i][j];
            if(input[i][j] === 'S') start = grid.gridPoints[i][j];

            let currVal = convertChar(input[i][j]).charCodeAt(0) - 97; //Vals from 0 to 25
            let currGridPoint = grid.gridPoints[i][j];
            currGridPoint.val = currVal;
        }
    }

    //update neighbours
    let aCoords = [];
    for(let i = 0; i < input.length; i++){
        for(let j = 0; j < input[0].length; j++){
            let currGridPoint = grid.gridPoints[i][j];
            currGridPoint.updateNeighbors(grid);
            if(currGridPoint.val === 0) aCoords.push(currGridPoint);
        }
    }
    return { grid, start, end, input, aCoords };
}

//Heuristic function for a star (manhattan distance)
function heuristic(position0, position1) {
    let d1 = Math.abs(position1.x - position0.x);
    let d2 = Math.abs(position1.y - position0.y);
  
    return d1 + d2;
}

// A* implementation with manhattan distance as heuristic
function aStar(start, end) {
    let open = []; //array containing unevaluated grid points
    open.push(start); //Push start node to open
    let closed = []; //array containing completely evaluated grid points
    let path = [];
    //Loop through open array
    while (open.length > 0) {
        //assumption lowest index is the first one to begin with
        let lowestIndex = 0;
        for (let i = 0; i < open.length; i++) {
            if (open[i].f < open[lowestIndex].f) {
                lowestIndex = i;
            }
        }
        let current = open[lowestIndex];

        //If current is the end goal, then we have reached the end
        if (current === end) {
            let temp = current;
            path.push(temp);
            while (temp.parent) {
                path.push(temp.parent);
                temp = temp.parent;
            }
            // return the traced path
            return path.reverse();
        }
        //remove current from open
        open.splice(lowestIndex, 1);
        //add current to closed
        closed.push(current);

        let neighbors = current.neighbors;

        for (let i = 0; i < neighbors.length; i++) {
            let neighbor = neighbors[i];

            if (!closed.includes(neighbor)) {
                let possibleG = current.g + 1;
 
                if (!open.includes(neighbor)) {
                open.push(neighbor);
                } else if (possibleG >= neighbor.g) {
                    continue;
                }

                neighbor.g = possibleG;
                neighbor.h = heuristic(neighbor, end);
                neighbor.f = neighbor.g + neighbor.h;
                neighbor.parent = current;
            }
        }
    }

    //no solution by default
    return [];
}

function drawPath(path, input){
    let grid = input.map((arr) => arr.slice());

    for(line of path){
        let row = line[1];
        let col = line[0];
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
    aStar
}