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
            if(node.operation === '/'){
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

setVal(tree.root);
// console.log(util.inspect(tree, false, null, true));
console.log('root val: ', tree.root.val)