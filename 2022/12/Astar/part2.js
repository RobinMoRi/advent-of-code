const util = require('util');
const { processData, drawPath, heuristic } = require('./util');
const { PriorityQueue } = require('./PriorityQueue');

let { grid, start, end, input, aCoords } = processData();

// A star implementation with manhattan distance as heuristic
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
            console.log("DONE!");
            // return the traced path
            return path.reverse();
        }

        //remove current from openSet
        open.splice(lowestIndex, 1);
        //add current to closedSet
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

let aCoordsCopy = aCoords.map(el => ({x: el.x, y: el.y}));
console.log(aCoordsCopy)
let steps = [];
for(let aCoord of aCoordsCopy){
    let { grid, end, input } = processData(); //ugly to read it again.....
    let curr = grid.gridPoints[aCoord.y][aCoord.x];

    let path = aStar(curr, end);
    if(path.length > 0){
        let pathCoord = path.map(el => [el.x, el.y]);
        console.log({steps: pathCoord.length-1})
        steps.push(pathCoord.length-1);
        drawPath(pathCoord, input);
    }
}

console.log('Smallest number of steps: ', Math.min(...steps));
