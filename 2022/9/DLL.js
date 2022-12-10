class Node{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.visited = [[x, y]];
        this.next = null;
        this.prev = null;
    }
}

class DLL{
    constructor(){
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    push(x, y){
        const newNode = new Node(x, y);
        if(!this.head){
            this.head = newNode;
            this.tail = newNode;
        }else{
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
        this.length++;
        return this;
    }

    //Init if all should have same init values
    build(x, y, length){
        for(let i = 0; i < length; i++){
            this.push(x, y);
        }
    }
}

module.exports = {
    DLL
}