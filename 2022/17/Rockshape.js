class Rockshape{
    constructor(x=0, y=0){
        this.bottomLeft = {x, y};
        this.coordinates = [];
    }

    moveLeft(grid){
        //Check borders first
        for(let coord of this.coordinates){
            const newX = coord.x - 1;
            if(newX < 0 || grid[coord.y][newX] === '#') return false;
        }

        for(let coord of this.coordinates){
            coord.x--;
        }
        return true;
    }

    moveRight(grid){
        //Check borders first
        for(let coord of this.coordinates){
            const newX = coord.x + 1;
            if(newX >= grid[0].length || grid[coord.y][newX] === '#') return false;
        }

        for(let coord of this.coordinates){
            coord.x++;
        }
        return true;
    }

    moveDown(grid){
        //Check borders first
        for(let coord of this.coordinates){
            const newY = coord.y + 1;
            if(newY >= grid.length || grid[newY][coord.x] === '#') return false;
        }

        for(let coord of this.coordinates){
            coord.y++;
        }
        return true;
    }

}
class Horisontal extends Rockshape{
    constructor(){
        super();
        this.height = 1;
    }
    init(x, y){
        this.bottomLeft.x = x;
        this.bottomLeft.y = y;
        this.coordinates.push({x: this.bottomLeft.x, y: this.bottomLeft.y});
        this.coordinates.push({x: this.bottomLeft.x + 1, y: this.bottomLeft.y});
        this.coordinates.push({x: this.bottomLeft.x + 2, y: this.bottomLeft.y});
        this.coordinates.push({x: this.bottomLeft.x + 3, y: this.bottomLeft.y});
    }
}
class Cross extends Rockshape{
    constructor(){
        super();
        this.height = 3;
    }
    init(x, y){
        this.bottomLeft.x = x;
        this.bottomLeft.y = y;
        this.coordinates.push({x: this.bottomLeft.x + 1, y: this.bottomLeft.y});
        this.coordinates.push({x: this.bottomLeft.x, y: this.bottomLeft.y - 1});
        this.coordinates.push({x: this.bottomLeft.x + 1, y: this.bottomLeft.y - 1});
        this.coordinates.push({x: this.bottomLeft.x + 2, y: this.bottomLeft.y - 1});
        this.coordinates.push({x: this.bottomLeft.x + 1, y: this.bottomLeft.y - 2});
    }
} 
class Perpendicular extends Rockshape{
    constructor(){
        super();
        this.height = 3;
    }
    init(x, y){
        this.bottomLeft.x = x;
        this.bottomLeft.y = y;
        this.coordinates.push({x: this.bottomLeft.x, y: this.bottomLeft.y});
        this.coordinates.push({x: this.bottomLeft.x + 1, y: this.bottomLeft.y});
        this.coordinates.push({x: this.bottomLeft.x + 2, y: this.bottomLeft.y});
        this.coordinates.push({x: this.bottomLeft.x + 2, y: this.bottomLeft.y - 1});
        this.coordinates.push({x: this.bottomLeft.x + 2, y: this.bottomLeft.y - 2});
    }
} 
class Vertical extends Rockshape{
    constructor(){
        super();
        this.height = 4;
    }
    init(x, y){
        this.bottomLeft.x = x;
        this.bottomLeft.y = y;
        this.coordinates.push({x: this.bottomLeft.x, y: this.bottomLeft.y});
        this.coordinates.push({x: this.bottomLeft.x, y: this.bottomLeft.y - 1});
        this.coordinates.push({x: this.bottomLeft.x, y: this.bottomLeft.y - 2});
        this.coordinates.push({x: this.bottomLeft.x, y: this.bottomLeft.y - 3});
    }
} 
class Square extends Rockshape{
    constructor(){
        super();
        this.height = 2;
    }
    init(x, y){
        this.bottomLeft.x = x;
        this.bottomLeft.y = y;
        this.coordinates.push({x: this.bottomLeft.x, y: this.bottomLeft.y});
        this.coordinates.push({x: this.bottomLeft.x + 1, y: this.bottomLeft.y});
        this.coordinates.push({x: this.bottomLeft.x, y: this.bottomLeft.y - 1});
        this.coordinates.push({x: this.bottomLeft.x + 1, y: this.bottomLeft.y - 1});
    }
}
function createRockShape(type){
    let rockShape;
    if(type === 1){
        rockShape = new Horisontal();
    }
    else if(type === 2){
        rockShape = new Cross();
    }
    else if(type === 3){
        rockShape = new Perpendicular();
    }
    else if(type === 4){
        rockShape = new Vertical();
    }
    else if(type === 5){
        rockShape = new Square();
    }
    return rockShape;
}

// Improved algo to populate a 2d grid from bottom, i.e. push/pop (instead of shifting/unshifting)
class RockshapeImproved{
    constructor(x=0, y=0){
        this.topRight = {x, y};
        this.coordinates = [];
    }

    moveLeft(grid){
        //Check borders first
        for(let coord of this.coordinates){
            const newX = coord.x - 1;
            if(newX < 0 || grid[coord.y][newX] === '#') return false;
        }

        for(let coord of this.coordinates){
            coord.x--;
        }
        return true;
    }

    moveRight(grid){
        //Check borders first
        for(let coord of this.coordinates){
            const newX = coord.x + 1;
            if(newX >= grid[0].length || grid[coord.y][newX] === '#') return false;
        }

        for(let coord of this.coordinates){
            coord.x++;
        }
        return true;
    }

    moveDown(grid){
        //Check borders first
        for(let coord of this.coordinates){
            const newY = coord.y - 1;
            if(newY < 0 || grid[newY][coord.x] === '#') return false;
        }

        for(let coord of this.coordinates){
            coord.y--;
        }
        return true;
    }

}
class HorisontalImproved extends RockshapeImproved{
    constructor(){
        super();
        this.height = 1;
    }
    init(x, y){
        this.topRight.x = x;
        this.topRight.y = y;
        this.coordinates.push({x: this.topRight.x, y: this.topRight.y});
        this.coordinates.push({x: this.topRight.x - 1, y: this.topRight.y});
        this.coordinates.push({x: this.topRight.x - 2, y: this.topRight.y});
        this.coordinates.push({x: this.topRight.x - 3, y: this.topRight.y});
    }
}
class CrossImproved extends RockshapeImproved{
    constructor(){
        super();
        this.height = 3;
    }
    init(x, y){
        this.topRight.x = x;
        this.topRight.y = y;
        this.coordinates.push({x: this.topRight.x - 1, y: this.topRight.y});
        this.coordinates.push({x: this.topRight.x, y: this.topRight.y + 1});
        this.coordinates.push({x: this.topRight.x - 1, y: this.topRight.y + 1});
        this.coordinates.push({x: this.topRight.x - 2, y: this.topRight.y + 1});
        this.coordinates.push({x: this.topRight.x - 1, y: this.topRight.y + 2});
    }
} 
class PerpendicularImproved extends RockshapeImproved{
    constructor(){
        super();
        this.height = 3;
    }
    init(x, y){
        this.topRight.x = x;
        this.topRight.y = y;
        this.coordinates.push({x: this.topRight.x, y: this.topRight.y});
        this.coordinates.push({x: this.topRight.x - 1, y: this.topRight.y});
        this.coordinates.push({x: this.topRight.x - 2, y: this.topRight.y});
        this.coordinates.push({x: this.topRight.x - 2, y: this.topRight.y + 1});
        this.coordinates.push({x: this.topRight.x - 2, y: this.topRight.y + 2});
    }
} 
class VerticalImproved extends RockshapeImproved{
    constructor(){
        super();
        this.height = 4;
    }
    init(x, y){
        this.topRight.x = x;
        this.topRight.y = y;
        this.coordinates.push({x: this.topRight.x, y: this.topRight.y});
        this.coordinates.push({x: this.topRight.x, y: this.topRight.y + 1});
        this.coordinates.push({x: this.topRight.x, y: this.topRight.y + 2});
        this.coordinates.push({x: this.topRight.x, y: this.topRight.y + 3});
    }
} 
class SquareImproved extends RockshapeImproved{
    constructor(){
        super();
        this.height = 2;
    }
    init(x, y){
        this.topRight.x = x;
        this.topRight.y = y;
        this.coordinates.push({x: this.topRight.x, y: this.topRight.y});
        this.coordinates.push({x: this.topRight.x - 1, y: this.topRight.y});
        this.coordinates.push({x: this.topRight.x, y: this.topRight.y + 1});
        this.coordinates.push({x: this.topRight.x - 1, y: this.topRight.y + 1});
    }
}
function createRockShapeImproved(type){
    let rockShape;
    if(type === 1){
        rockShape = new HorisontalImproved();
    }
    else if(type === 2){
        rockShape = new CrossImproved();
    }
    else if(type === 3){
        rockShape = new PerpendicularImproved();
    }
    else if(type === 4){
        rockShape = new VerticalImproved();
    }
    else if(type === 5){
        rockShape = new SquareImproved();
    }
    return rockShape;
}

module.exports = {
    createRockShape,
    createRockShapeImproved
}