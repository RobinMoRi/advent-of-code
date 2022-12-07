const path = require('path');
const util = require('util');
const { syncReadFile } = require('../../readFile');
const { parseFileSys } = require('./utils');
const { DISK_AVAILABLE, UNUSED_SPACE_NEEDED } = require('./constants')

const mode = process.argv[2];
const inputFile = mode === 'test' ? 'test.txt' : 'input.txt';
const input = syncReadFile(path.join(__dirname, inputFile))

//Traverse tree to add file size of a dir's subdirs
function treeTraversal(node) {
    if (node.dirs.length > 0) {
        for (let dir of node.dirs) {
            node.totalFileSize += treeTraversal(fileSys[dir]);
        }
    }
    return node.totalFileSize;
}

//Create filesys and traverse
let fileSys = parseFileSys(input);
treeTraversal(fileSys['/']);

//PART 2 start:
const rootDirSize = fileSys['/'].totalFileSize;
const current_unused_space = DISK_AVAILABLE - rootDirSize;
const filesToDelete = [];

for(let [ dir ] of Object.entries(fileSys)){
    let currFileSize = fileSys[dir].totalFileSize;
    if(currFileSize + current_unused_space >= UNUSED_SPACE_NEEDED){
        filesToDelete.push(currFileSize);
    }
}
// Retrieve min of file sizes that are possible to delete
console.log(Math.min(...filesToDelete))