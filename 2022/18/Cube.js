class Cube{
    constructor(x, y, z){
        this.x = x;
        this.y = y;
        this.z = z;
        this.children = [];
    }

    //Will return true if given node of z,y and z is a child of the current node.
    isChild(x, y, z){
        return (
            (x === this.x && y === this.y && z === this.z+1) ||
            (x === this.x && y === this.y && z === this.z-1) ||
            (x === this.x && y === this.y+1 && z === this.z) ||
            (x === this.x && y === this.y-1 && z === this.z) ||
            (x === this.x+1 && y === this.y && z === this.z) ||
            (x === this.x-1 && y === this.y && z === this.z)
        )
    }

    // Get indices of potential childs
    childIndices(){
        let indices = [];
        indices.push(`${this.x},${this.y},${this.z+1}`);
        indices.push(`${this.x},${this.y},${this.z-1}`);
        indices.push(`${this.x},${this.y+1},${this.z}`);
        indices.push(`${this.x},${this.y-1},${this.z}`);
        indices.push(`${this.x+1},${this.y},${this.z}`);
        indices.push(`${this.x-1},${this.y},${this.z}`);
        return indices;
    }

    isInRange(xRange, yRange, zRange){
        return (
            (this.x >= xRange.min && this.x <= xRange.max) &&
            (this.y >= yRange.min && this.y <= yRange.max) &&
            (this.z >= zRange.min && this.z <= zRange.max)
        )
    }

    index(){
        return `${this.x},${this.y},${this.z}`;
    }
}

module.exports = {
    Cube
}