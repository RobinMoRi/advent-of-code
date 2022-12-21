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

//recursively set vals to each node
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
        else if(curr.operation === '-'){
            next.val = curr.val + val;
        }
        console.log({currVal: curr.val, nextVal: next.val, otherVal: val, operation: curr.operation})

        curr = next;

    }
    return curr;
}

let rootVal = setVal(tree.root);
console.log('root val: ', tree.root.val, tree.root.left.val, tree.root.right.val);
let humn = getNode(tree.root, 'humn');
let humnEqualized = getHumnVal(tree.root, getPath(humn));
console.log(humnEqualized.name, 'value: ', humnEqualized.val);