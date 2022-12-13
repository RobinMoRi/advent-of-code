/**
 * THIS ONE IS NOT WORKING, PLEASE REFER TO MY BRUTE FORCE IMPLEMENTATION WITH A* :)
 */

const util = require('util')
const { processData, drawPath, convertChar } = require('./util');

const { graph, startIndex, endIndex, input } = processData();

//Collect all starting points (brute force delux)
const startingPoints = [];
for(let i = 0; i < input.length; i++){
    for(let j = 0; j < input[0].length; j++){
        if(input[i][j] === 'a' || input[i][j] === 'S'){
            startingPoints.push(`${i}-${j}-${convertChar(input[i][j])}`);
        }
    }
}
console.log(util.inspect(graph, false, null, true), {startingPoints});

let steps = [];
for(let startingPoint of startingPoints){
    let dijkstra = graph.shortestPath(startingPoint, endIndex);
    console.log(dijkstra.previous)
    if(dijkstra.shortestPath.length-1 > 0){
        drawPath(dijkstra.shortestPath, input);
        console.log('Steps:', dijkstra.shortestPath.length-1, {startingPoint, endIndex},'\n');
        steps.push(dijkstra.shortestPath.length-1);
    }
}
console.log('Shortest amount of steps: ', Math.min(...steps));