const path = require('path');
const util = require('util');
const { syncReadFile } = require('../readFile')

const mode = process.argv[2];
const inputFile = mode === 'test' ? 'test.txt' : 'input.txt';
const input = syncReadFile(path.join(__dirname, inputFile))

// construct data structure to traverse
function parseFileSys(){
    const fileSys = {};
    let dirStack = [];
    for(cmd of input){
        const currentDir = dirStack[dirStack.length-1] ? String(dirStack[dirStack.length-1]) : '';
        const currentPath = dirStack.join('/');
        if(currentDir !== '' && !fileSys[currentPath]) fileSys[currentPath] = {totalFileSize: 0, dirs: []};
    
        //If we go into a dir:
        const cdInMatch = cmd.match(/cd ([a-z\/]+)/);
        const cdOutMatch = cmd.match(/cd (\.\.)/);
        const fileMatch = cmd.match(/([0-9]+) ([a-z.]+)/);
        const dirMatch = cmd.match(/dir ([a-z]+)/);
        if(cdInMatch !== null) dirStack.push(cdInMatch[1]);
        else if(cdOutMatch) dirStack.pop();
        else if(fileMatch){
            const currentFileSize = parseInt(fileMatch[1]);
            if(currentDir !== '') fileSys[currentPath].totalFileSize += currentFileSize;
        }
        else if(dirMatch){
            if(currentDir !== '') fileSys[currentPath].dirs.push(dirStack.join('/') + "/" + dirMatch[1]);
        }
    }
    return fileSys;
}

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
    for(let [dir, content] of Object.entries(fileSys)){
        if(fileSys[dir].totalFileSize <= 100000){
            sum += fileSys[dir].totalFileSize;
        };
    }
    return sum;
}

let fileSys = parseFileSys();
treeTraversal(fileSys['/']);
console.log(sumFileSizes())