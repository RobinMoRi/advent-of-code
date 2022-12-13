const util = require('util');
const { processData, drawPath, aStar } = require('./util');

let { aCoords } = processData();

function findShortestPath(aCoords){
    let aCoordsCopy = aCoords.map(el => ({x: el.x, y: el.y}));
    let steps = []; //Collect steps
    for(let aCoord of aCoordsCopy){
        let { grid, end, input } = processData(); //ugly to read it again.....
        let curr = grid.gridPoints[aCoord.y][aCoord.x];
    
        let path = aStar(curr, end);
        if(path.length > 0){
            let pathCoord = path.map(el => [el.x, el.y]);
            steps.push({steps: pathCoord.length-1, x: curr.x, y: curr.y});
            drawPath(pathCoord, input);
            console.log({steps: pathCoord.length-1}, `From: (x, y): (${curr.x}, ${curr.y}) to (x, y): (${end.x}, ${end.y})`, '\n')
        }
    }
    steps.sort((a,b) => a.steps-b.steps);
    console.log('Smallest number of steps: ', steps[0].steps, `From (x, y): (${steps[0].x}, ${steps[0].y})`);
}

findShortestPath(aCoords);
