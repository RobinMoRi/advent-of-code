const path = require('path');
const { syncReadFile } = require('../readFile');

function processData(){
    const mode = process.argv[2];
    const inputFile = mode === 'test' ? 'test.txt' : 'input.txt';
    const input = syncReadFile(path.join(__dirname, inputFile)).map(el => {
        let arr = el.replace(':', '').split(' ');
        return arr;
    });

    let result = {};
    for(let arr of input){
        let obj = {};
        obj.name = arr[0];
        if(!parseInt(arr[1])){
            obj.left = arr[1];
            obj.operation = arr[2]
            obj.right = arr[3];
            obj.last = false;
        }
        else{
            obj.val = parseInt(arr[1]);
            obj.last = true;
        }
        result[arr[0]] = obj;
    }
    
    return result;
}

module.exports = {
    processData
}