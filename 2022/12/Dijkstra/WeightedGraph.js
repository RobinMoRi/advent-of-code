const { PriorityQueue } = require('./PriorityQueue');

//Undirected graph
class WeightedGraph{
    constructor(){
        this.adjacencyList = {}
    }

    // Add Vertex in graph if not found
    addVertex(name){
        if(!this.adjacencyList[name]){
            this.adjacencyList[name] = [];
        }
    }

    // Add edge between vertices
    addEdge(vertex1, vertex2, weight){
        if(!this.adjacencyList[vertex1]){
            this.addVertex(vertex1)
        };
        if(!this.adjacencyList[vertex2]){
            this.addVertex(vertex2)
        };
        if(this.adjacencyList[vertex1].filter(curr => curr.vertex === vertex2).length === 0){
            this.adjacencyList[vertex1].push({vertex: vertex2, weight: weight});
        }
    }
    
    //Dijkstra's algorithm
    shortestPath(start, end){
        if(this.adjacencyList[end] === undefined || this.adjacencyList[start] === undefined){
            throw 'Some vertex are not in the tree';
        }
        let queue = new PriorityQueue();
        let previous = {};
        let dist = {}
        let visited = [];
        for(let key of Object.keys(this.adjacencyList)){
            previous[key] = null;
            dist[key] = Infinity;
        }
        queue.enqueue(start, 0);
        dist[start] = 0;
        
        let current;
        while(queue.values.length > 0){
            current = queue.dequeue().val;
            visited.push(current);
            for (let neighbour of this.adjacencyList[current]) {
                let candidate = dist[current] + neighbour.weight;
                if(candidate < dist[neighbour.vertex]){
                    dist[neighbour.vertex] = candidate;
                    previous[neighbour.vertex] = current;
                }
                if(!visited.includes(neighbour.vertex)){
                    queue.enqueue(neighbour.vertex, neighbour.weight);
                }
            }
            
        }
        //const path = this.getPath(end, previous);
        const path = this.getPath(end, previous);
        return {shortestPath: path, distance: dist[end], previous};
    }

    getPath(end, previous){
        let path = [];
        let node = end;
        while(node !== null){
            path.push(node);
            node = previous[node];
        }
        return path.reverse();
    }

}

module.exports = {
    WeightedGraph
}