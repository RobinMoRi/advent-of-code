const path = require('path');
const { syncReadFile } = require('../readFile');

function processData(){
    const mode = process.argv[2];
    const inputFile = mode === 'test' ? 'test.txt' : 'input.txt';
    const input = syncReadFile(path.join(__dirname, inputFile))
        .map(el => el.trim().replace(',', '').split(' ').filter((el) => el.includes('=')))
        .map((el => {
            const sensor = {
                x: parseInt(el[0].split('=')[1]),
                y: parseInt(el[1].split('=')[1])
            };
            const beacon = {
                x: parseInt(el[2].split('=')[1]),
                y: parseInt(el[3].split('=')[1])
            };
            return { sensor, beacon }
        }));

        //For input data I need to maybe decrease the coordinates a bit....
        const { maxX, maxY, minX, minY, cols, rows } = getBorders(input);

    return { input, maxX, maxY, minX, minY, cols, rows };
}

function getBorders(input){
    const yCoords = input.map(el => [el.sensor.y, el.beacon.y]).flat();
    const xCoords = input.map(el => [el.sensor.x, el.beacon.x]).flat();

    const maxX = Math.max(...xCoords);
    const maxY = Math.max(...yCoords);
    const minX = Math.min(...xCoords);
    const minY = Math.min(...yCoords);
    const cols = maxX - minX + 1;
    const rows = maxY - minY + 1;

    return {maxX, maxY, minX, minY, rows, cols};
}

function isOverlappingPartly(x1min, x1max, x2min, x2max){
    return (x1max >= x2min);
}
function isOverlappingFully(x1min, x1max, x2min, x2max){
    return (x1max >= x2min) && (x1max >= x2max);
}

module.exports = {
    processData,
    isOverlappingPartly,
    isOverlappingFully
}