const { start } = require('repl');
const util = require('util');
const { processData, drawPath } = require('./util');
const { PriorityQueue } = require('./PriorityQueue');

const { graph, startIndex, endIndex, input } = processData();

console.log(util.inspect(graph, false, null, true), {startIndex, endIndex});
let dijkstra = graph.shortestPath(startIndex, endIndex);
console.log('Number of steps: ', dijkstra.shortestPath.length-1);
drawPath(dijkstra.shortestPath, input);