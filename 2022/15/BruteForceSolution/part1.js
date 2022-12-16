const util = require('util');
const { processData, drawGrid } = require('../util');

const { sensorBeaconCoords, grid, maxX, maxY, minX, minY, cols, rows } = processData();

drawGrid(grid);
console.log('\n')

let testCount = 0;
for(let sensorBeaconCoord of sensorBeaconCoords){
    // if(testCount > 0) break;
    let coverage = [];
    let countIter = 0;
    const xs1 = sensorBeaconCoord.xs - minX;
    const ys1 = sensorBeaconCoord.ys - minY;
    const xb1 = sensorBeaconCoord.xb - minX;
    const yb1 = sensorBeaconCoord.yb - minY;
    
    let up = ys1-1;
    let down = ys1+1;
    let left = xs1-1;
    let right = xs1+1;
    
    while(true){
        if(isNearestBeaconSensed(coverage, {x: xb1, y: yb1})) break;

        //Save coverage coordinates
        coverage.push({x: xs1, y: up});
        coverage.push({x: xs1, y: down});
        coverage.push({x: left, y: ys1});
        coverage.push({x: right, y: ys1});
    
        up--;
        down++;
        left--;
        right++;
        coverage.push(...fillQuadrant(up, ys1, xs1, 'topright'));
        coverage.push(...fillQuadrant(up, ys1, xs1, 'topleft'));
        coverage.push(...fillQuadrant(down, ys1, xs1, 'bottomleft'));
        coverage.push(...fillQuadrant(down, ys1, xs1, 'bottomright'));

        countIter++;
    }
    testCount++;
    drawCoverage(coverage, grid);
}
drawGrid(grid)
countCoverageMarks(grid, 9)

function countCoverageMarks(grid, y){
    let count = 0;
    for(let i = 0; i < grid[0].length; i++){
        if(grid[y][i] === '#') count++;
    }
    console.log(count);
}

//TODO: Should be a more efficient search
function isNearestBeaconSensed(coverage, nearestBeacon){
    for(let coord of coverage){
        if(coord.x === nearestBeacon.x && coord.y === nearestBeacon.y) return true;
    }
    return false;
}

//TODO: Clean this one up
function fillQuadrant(rowStart, rowEnd, colStart, quadrant){
    let arr = [];
    let count = 0;

    if(quadrant === 'topright'){
        for(let i = rowStart; i < rowEnd; i++){
            for(let j = colStart; j < colStart + count; j++){
                arr.push({x: j, y: i})
            }
            count++;
        }
    }
    else if(quadrant === 'topleft'){
        for(let i = rowStart; i < rowEnd; i++){
            for(let j = colStart; j > colStart - count; j--){
                arr.push({x: j, y: i})
            }
            count++;
        }
    }
    else if(quadrant === 'bottomleft'){
        for(let i = rowStart; i > rowEnd; i--){
            for(let j = colStart; j > colStart - count; j--){
                arr.push({x: j, y: i})
            }
            count++;
        }
    }
    else if(quadrant === 'bottomright'){
        for(let i = rowStart; i > rowEnd; i--){
            for(let j = colStart; j < colStart + count; j++){
                arr.push({x: j, y: i})
            }
            count++;
        }
    }
    return arr;
}


function drawCoverage(coords, grid){
    let rows = grid.length;
    let cols = grid[0].length;
    for(let coord of coords){
        if(coord.x >= 0 && coord.x < cols && coord.y >= 0 && coord.y < rows && grid[coord.y][coord.x] !== 'S' && grid[coord.y][coord.x] !== 'B'){
            grid[coord.y][coord.x] = '#';
        }
    }
}

