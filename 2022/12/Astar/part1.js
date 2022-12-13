const util = require('util');
const { processData, drawPath, aStar } = require('./util');

const { start, end, input } = processData();

let path = aStar(start, end);
let pathCoord = path.map(el => [el.x, el.y]);
drawPath(pathCoord, input);
console.log({steps: pathCoord.length-1})