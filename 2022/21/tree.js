class Node{
    constructor(name, parent){
        this.name = name;
        this.val = null;
        this.left = null;
        this.right = null;
        this.parent = parent;
        this.operation = null;
    }
}

class Tree{
    constructor(){
        this.root = null;
    }

    //Build tree out of input...maybe this is redundant, but it gets easier to grasp
    build(input){
        this.root = new Node(input.root.name, null);

        function util(nodeInput, parent){
            let newNode = new Node(nodeInput.name);
            newNode.parent = parent;
            if(!nodeInput.last){
                newNode.operation = nodeInput.operation;
                newNode.left = util(input[nodeInput.left], newNode);
                newNode.right = util(input[nodeInput.right], newNode);
            }else{
                newNode.val = nodeInput.val;
            }
            return newNode;

        }
        this.root.operation = input.root.operation;
        this.root.left = util(input[input.root.left], this.root);
        this.root.right = util(input[input.root.right], this.root);

        return this;
    }
}

module.exports = {
    Tree,
};