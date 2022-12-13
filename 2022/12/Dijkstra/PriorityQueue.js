class Node{
    constructor(val, prio){
        this.val = val;
        this.prio = prio;
    }
}

//Should basically be a Min Binary Heap
class PriorityQueue{
    constructor(){
        this.values = [];
    }
    enqueue(val, prio){
        //Create Node
        let node = new Node(val, prio);

        //Push node into array of values, get index of it
        this.values.push(node);
        
        //"Bubble up" the inserted node into its correct spot
        this.bubbleUp();
        
        return this;
    }
    bubbleUp(){
        let index = this.values.length - 1;
        const element = this.values[index];

        while(index > 0){
            let parentIndex = Math.floor((index-1)/2);
            let parent = this.values[parentIndex];
            if(element.prio >= parent.prio) break;

            //Swap
            this.values[parentIndex] = element;
            this.values[index] = parent;
            index = parentIndex;
        }
    }
    
    // Very ugly solution
    dequeue(){
        const min = this.values[0];
        const end = this.values.pop();
        if(this.values.length > 0){
            this.values[0] = end;
            this.sinkDown();
        }
        return min;
        
    }

    sinkDown(){
        let idx = 0;
        const length = this.values.length;
        const element = this.values[0];
        while(true){
            let leftChildIdx = 2 * idx + 1;
            let rightChildIdx = 2 * idx + 2;
            let leftChild, rightChild;
            let swap = null;

            if(leftChildIdx < length){
                leftChild = this.values[leftChildIdx];
                if(leftChild.prio < element.prio){
                    swap = leftChildIdx;
                }
            }
            if(rightChildIdx < length){
                rightChild = this.values[rightChildIdx];
                if(
                    (swap === null && rightChild.prio < element.prio) || 
                    (swap !== null && rightChild.prio < leftChild.prio)
                ){
                    swap = rightChildIdx;
                }
            }
            if(swap === null) break;
            this.values[idx] = this.values[swap];
            this.values[swap] = element;
            idx = swap;
         }
    }
}

module.exports = {
    PriorityQueue
}