const { ranges } = require('./util');
const face = { right: 0, down: 1, left: 2, up: 3 };

class Player{
    constructor(start, grid, face='right'){
        this.y = start.y;
        this.x = start.x;
        this.face = this._setFace(face);
        this.grid = grid;
    }

    _setFace(faceStr){
        return face[faceStr];
    }

    _peekNextAvailable(){
        let next = {x: this.x, y: this.y, val: null};
        while(true){
            //Move right
            if(this.face === 0){
                next.x++;
                if(next.x > this.grid[0].length-1){
                    next.x = 0
                };
            }
            //Move down
            else if(this.face === 1){
                next.y++;
                if(next.y > this.grid.length-1){
                    next.y = 0
                };
            }
            //Move left
            else if(this.face === 2){
                next.x--;
                if(next.x < 0){
                    next.x = this.grid[0].length-1
                };
            }
            //Move up
            else if(this.face === 3){
                next.y--;
                if(next.y < 0){
                    next.y = this.grid.length-1
                };
            }
            else{
                throw new Error('Something went wrong trying to peek')
            }
            if(this.grid[next.y][next.x] === '#' || this.grid[next.y][next.x] === '.'){
                next.val = this.grid[next.y][next.x];
                return next;
            };
        }
    }

    //Handle out of boundary and obstacle detection
    move(steps, part='part1'){
        //Move in correct direction
        for(let i = 0; i < steps; i++){
            let next;
            if(part === 'part1') next = this._peekNextAvailable();
            else if(part === 'part2') next = this._peekNextAvailable2();

            if(next.val === '.'){
                this.x = next.x;
                this.y = next.y;
            }
        }
        return;
    }

    //Decide when we step out of boundaries and when we do so, 
    //decide which should be the new coordinate and what should be the face direction
    _peekNextAvailable2(){
        let next = {x: this.x, y: this.y, val: null};
        //Move right
        if(this.face === 0) next.x++;
        //Move down
        else if(this.face === 1) next.y++;
        //Move left
        else if(this.face === 2) next.x--;
        //Move up
        else if(this.face === 3) next.y++;

        //Out of boundaries left (4, 6)
        if(next.x < 0){
            //We need to convert next.x, next.y and set next.face (this.face = next.face in move());
        }
        //Boundaries right (2)
        else if(next.x > this.grid[0].length-1){
            //We need to convert next.x, next.y and set next.face (this.face = next.face in move());
        }
        //Boundaries top (1 and 2)
        else if(next.y < 0){
            //We need to convert next.x, next.y and set next.face (this.face = next.face in move());
        }
        //Boundaries bottom (6)
        else if(next.y > this.grid.length-1){
            //We need to convert next.x, next.y and set next.face (this.face = next.face in move());
        }
        //We are still inside grid boundaries but outside playable area (1, 2, 3, 4, 5, 6)
        else if(this.grid[next.y][next.x] === ' '){
            //We need to convert next.x, next.y and set next.face (this.face = next.face in move());
        }

        if(this.grid[next.y][next.x] === '#' || this.grid[next.y][next.x] === '.'){
            next.val = this.grid[next.y][next.x];
            return next;
        };

    }

    //Rotate left or right, direction = 'L' (CCW) || 'R' (CW)
    rotate(direction){
        if(direction === 'L'){
            this.face--;
            if(this.face < 0) this.face = 3;
        }else{
            this.face++;
            if(this.face > 3) this.face = 0;
        }
    }
}

module.exports = {
    Player
}