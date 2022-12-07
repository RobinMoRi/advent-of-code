const path = require('path');
const util = require('util');
const { syncReadFile } = require('../../readFile')
const { Tree } = require('./utils')

const mode = process.argv[2];
const inputFile = mode === 'test' ? 'test.txt' : 'input.txt';
const input = syncReadFile(path.join(__dirname, inputFile))

//Traverse tree to add file size of a dir's subdirs
function treeTraversal(node) {
    // internal nodes get their total from children
    if (node.children.length > 0) {
        for (let child of node.children) {
            node.fileSize += treeTraversal(child);
        }
    }
    return node.fileSize;
}

//Sum all fileSize smaller than 100k, using DFS
function sumFiles(root){
    let sum = 0;
    let stack = [root];
    while(stack.length > 0){
        const currentNode = stack.pop();
        if(currentNode.fileSize <= 100000) sum += currentNode.fileSize;
        for(let child of currentNode.children){
            stack.push(child);
        }
    }
    return sum;
}

const tree = new Tree();
let fileSys = tree.build(input);
treeTraversal(fileSys.root);
console.log(util.inspect(fileSys, false, null, true))
console.log(sumFiles(fileSys.root))