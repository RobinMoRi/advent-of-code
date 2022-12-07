const path = require('path');
const util = require('util');
const { syncReadFile } = require('../../readFile');
const { Tree } = require('./tree');
const { DISK_AVAILABLE, UNUSED_SPACE_NEEDED } = require('./constants')

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

//returns minimum file to delete
function deleteFile(root){
    const UNUSED_SPACE = DISK_AVAILABLE - fileSys.root.fileSize;
    const filesToDelete = [];

    let stack = [root];
    while(stack.length > 0){
        const currentNode = stack.pop();
        if(currentNode.fileSize + UNUSED_SPACE >= UNUSED_SPACE_NEEDED) filesToDelete.push(currentNode.fileSize);
        for(let child of currentNode.children){
            stack.push(child);
        }
    }
    return Math.min(...filesToDelete);
}

const tree = new Tree();
let fileSys = tree.build(input);
treeTraversal(fileSys.root);
console.log(util.inspect(fileSys, false, null, true))
console.log(deleteFile(fileSys.root))
