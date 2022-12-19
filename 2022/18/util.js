const path = require('path');
const { syncReadFile } = require('../readFile');

function processData(){
    const mode = process.argv[2];
    const inputFile = mode === 'test' ? 'test.txt' : 'input.txt';
    const input = syncReadFile(path.join(__dirname, inputFile)).map(el => {
        let coords = el.trim().split(',');
        return { x: parseInt(coords[0]), y: parseInt(coords[1]), z: parseInt(coords[2]) }
    });
    

    return input;
}

module.exports = {
    processData
}