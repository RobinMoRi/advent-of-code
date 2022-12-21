const util = require('util');
const { processData } = require('./util');
const { Tree } = require('./tree')

let data = processData();
let tree = new Tree();
tree.build(data);

//recursively set vals to each node
function setVal(node){
        if(node.val !== null){
            return node.val
        }else{
            let leftVal = setVal(node.left);
            let rightVal = setVal(node.right);
            if(node.name === 'root'){
                node.val = leftVal === rightVal;
            }
            else if(node.operation === '/'){
                node.val = leftVal / rightVal;
            }
            else if(node.operation === '*'){
                node.val = leftVal * rightVal;
            }
            else if(node.operation === '+'){
                node.val = leftVal + rightVal;
            }
            else if(node.operation === '-'){
                node.val = leftVal - rightVal;
            }
            return node.val
        }
}

//From root, returns path to given node (starts from node and traverse up to root)
function getPath(end){
    let path = [];
    let curr = end;
    while(curr !== null){
        let parent = curr.parent;
        if(parent === null) break;
        if(parent.left === curr){
            path.push('left');
        }else{
            path.push('right');
        }
        curr = parent;
    }
    return path.reverse();
}

//Get node 
function getNode(root, name){
    let stack = [];
    stack.push(root);
    while(stack.length > 0){
        let curr = stack.pop();
        if(curr.name === name) return curr;
        if(curr.left !==null) stack.push(curr.left);
        if(curr.right !==null) stack.push(curr.right);
    }
}

//From root, got down all the way down to humn to compute the correct val for humn with new circumstances
function getHumnVal(root, path){
    let right = setVal(root.right);
    let curr = root.left;
    curr.val = right;

    for(let i = 1; i < path.length; i++){
        let nextDirection = path[i];
        let val;
        let next;
        if(nextDirection === 'left'){
            val = setVal(curr.right);
            next = curr.left;
        }else{
            val = setVal(curr.left);
            next = curr.right;
        };

        if(curr.operation === '/'){
            next.val = curr.val * val;
        }
        else if(curr.operation === '*'){
            next.val = curr.val / val;
        }
        else if(curr.operation === '+'){
            next.val = curr.val - val;
        }
        else if(curr.operation === '-' && nextDirection === 'left'){
            next.val = curr.val + val;
        }
        else if(curr.operation === '-' && nextDirection === 'right'){
            next.val = val - curr.val;
        }

        curr = next;

    }
    return curr;
}

let humn = getNode(tree.root, 'humn');
let humnEqualized = getHumnVal(tree.root, getPath(humn));
console.log(humnEqualized.name, 'should shout the following value for equality: ', humnEqualized.val);