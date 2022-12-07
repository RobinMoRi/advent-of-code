const path = require('path');
const util = require('util');
const { syncReadFile } = require('../readFile')
const { parseFileSys } = require('./utils')

const mode = process.argv[2];
const inputFile = mode === 'test' ? 'test.txt' : 'input.txt';
const input = syncReadFile(path.join(__dirname, inputFile))

//Traverse tree to add file size of a dir's subdirs
function treeTraversal(node) {
    // internal nodes get their total from children
    if (node.dirs.length > 0) {
        for (let dir of node.dirs) {
            node.totalFileSize += treeTraversal(fileSys[dir]);
        }
    }
    return node.totalFileSize;
}

function sumFileSizes(){
    let sum = 0;
    for(let [ dir ] of Object.entries(fileSys)){
        if(fileSys[dir].totalFileSize <= 100000){
            sum += fileSys[dir].totalFileSize;
        };
    }
    return sum;
}

let fileSys = parseFileSys(input);
treeTraversal(fileSys['/']);
console.log(sumFileSizes())