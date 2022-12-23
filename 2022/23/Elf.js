class Elf{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    lookAround(grid){
        const N = {x: this.x, y: this.y-1, val: grid[`${this.x},${this.y-1}`]};
        const S = {x: this.x, y: this.y+1, val: grid[`${this.x},${this.y+1}`]};
        const W = {x: this.x-1, y: this.y, val: grid[`${this.x-1},${this.y}`]};
        const E = {x: this.x+1, y: this.y, val: grid[`${this.x+1},${this.y}`]};

        const NW = {x: this.x-1, y: this.y-1, val: grid[`${this.x-1},${this.y-1}`]};
        const NE = {x: this.x+1, y: this.y-1, val: grid[`${this.x+1},${this.y-1}`]};
        const SW = {x: this.x-1, y: this.y+1, val: grid[`${this.x-1},${this.y+1}`]};
        const SE = {x: this.x+1, y: this.y+1, val: grid[`${this.x+1},${this.y+1}`]};

        const noElfAround = !N.val && !S.val && !W.val && !E.val && !NW.val && !NE.val && !SW.val && !SE.val;

        return {N, S, W, E, NW, NE, SW, SE, noElfAround};
    }

    set elfCoordinates({x, y, grid}){
        if(grid[`${this.x},${this.y}`]){
            delete grid[`${this.x},${this.y}`];
        }
        this.x = x;
        this.y = y;
        grid[`${x},${y}`] = this;

    }

    get elfCoordinates(){
        return {x: this.x, y: this.y}
    }
}

module.exports = {
    Elf
}