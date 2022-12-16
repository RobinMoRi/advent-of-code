const path = require('path');
const { syncReadFile } = require('../../readFile');

function processData(){
    const mode = process.argv[2];
    const inputFile = mode === 'test' ? 'test.txt' : 'input.txt';
    const input = syncReadFile(path.join(__dirname, inputFile))
        .map(el => el.trim().replace(',', '').split(' ').filter((el) => el.includes('=')))
        .map((el => {
            const xs = parseInt(el[0].split('=')[1]);
            const ys = parseInt(el[1].split('=')[1]);
            const xb = parseInt(el[2].split('=')[1]);
            const yb = parseInt(el[3].split('=')[1]);
            return {xs,ys,xb,yb}
        }));


        //For input data I need to maybe decrease the coordinates a bit....
        const { maxX, maxY, minX, minY, cols, rows } = getBorders(input);

        //Create grid with empty points
        const grid = [];
        for(let i = 0; i < rows; i++){
            grid.push(new Array(cols));
            for(let j = 0; j < cols; j++){
                grid[i][j] = '.'
            }
        }

        //Populate grid with sensor and beacons
        for(let line of input){
            grid[line.yb - minY][line.xb - minX] = 'B';
            grid[line.ys - minY][line.xs - minX] = 'S';
        }



    return { sensorBeaconCoords: input, grid, maxX, maxY, minX, minY, cols, rows };
}

function getBorders(input){
    const yCoords = input.map(el => [el.ys, el.yb]).flat();
    const xCoords = input.map(el => [el.xs, el.xb]).flat();

    const maxX = Math.max(...xCoords);
    const maxY = Math.max(...yCoords);
    const minX = Math.min(...xCoords);
    const minY = Math.min(...yCoords);
    const cols = maxX - minX + 1;
    const rows = maxY - minY + 1;

    return {maxX, maxY, minX, minY, rows, cols};
}

function drawGrid(grid){
    for(let i = 0; i < grid.length; i++){
        console.log(grid[i].join(''));
    }
}

module.exports = {
    processData,
    drawGrid
}