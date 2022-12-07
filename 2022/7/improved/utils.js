class Node{
    constructor(name, fileSize, parent=null){
        this.name = name;
        this.fileSize = fileSize;
        this.children = [];
        this.parent = parent;
    }
}

class Tree{
    constructor(){
        this.root = null;
    }
}

// construct data structure to traverse
function buildFileTree(input){
    const fileTree = new Tree();
    let currentNode = null;

    for(row of input){
        const data = row.split(' ');
        if(data[2] === '..'){
            currentNode = currentNode.parent;
        }
        else if(data[1] === 'cd'){
            let newNode = new Node(data[2], 0, currentNode);
            if(fileTree.root === null){
                fileTree.root = newNode;
            }else{
                currentNode.children.push(newNode);
            }
            currentNode = newNode;
        }
        else if(data[0].match(/[0-9]+/)){
            currentNode.fileSize += parseInt(data[0]);
        }
    }
    return fileTree;
}

module.exports = {
    buildFileTree,
};