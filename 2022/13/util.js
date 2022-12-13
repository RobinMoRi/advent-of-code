const path = require('path');
const { syncReadFile } = require('../readFile');

function processData(){
    const mode = process.argv[2];
    const inputFile = mode === 'test' ? 'test.txt' : 'input.txt';
    const input = syncReadFile(path.join(__dirname, inputFile)).map(el => el.trim().split(' '));
    let pairs = [];
    for(let i = 0; i < input.length; i+=3){
        let first = JSON.parse(input[i]);
        let second = JSON.parse(input[i+1]);
        pairs.push({first, second})
    }
    return pairs;
}

module.exports = {
    processData
}