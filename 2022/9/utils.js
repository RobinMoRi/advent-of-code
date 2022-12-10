const directions = {
    'U': 1,
    'D': -1,
    'L': -1,
    'R': 1,
}

function isAdjacent(x1, y1, x2, y2){
    /**
     * Manhattan distance:
     * Overlapping: dx+dy=0
     * Adjacent vertically or horisontally: dx+dy=1
     * Adjacent diagonally: dx+dy=2
     */
    const dx = Math.abs(x1 - x2);
    const dy = Math.abs(y1 - y2);
    return dx <= 1 && dy <= 1;
}

function drawMotion(coords, marker){
    let minY = Math.min(...coords.map(el => el[1]));
    let maxY = Math.max(...coords.map(el => el[1]));
    let minX = Math.min(...coords.map(el => el[0]));
    let maxX = Math.max(...coords.map(el => el[0]));
    let cols = maxX-minX+20;
    let rows = maxY-minY+20;

    let yOffset = Math.abs(minY);
    let xOffset = Math.abs(minX);
    
    let arr = [];
    for(let row = 0; row < rows; row++){
        arr.push(Array(cols).fill('.'));
    }

    for(let coord of coords){
        let row = coord[1]+yOffset;
        let col = coord[0]+xOffset;
        arr[row][col] = (coord[0] === 0 && coord[1] === 0) ? "s" : marker;
    }
    
    arr.reverse();
    for(let line of arr){
        console.log(line.join(''))
    }
}

function moveTail(head, tail){
    //Below should work for both diagonally, horisontal and vertical movements
    if(head.x > tail.x){
        tail.x++;
    }
    else if(head.x < tail.x){
        tail.x--;
    }
    if(head.y > tail.y){
        tail.y++;
    }
    else if(head.y < tail.y){
        tail.y--;
    }
    tail.visited.push([tail.x, tail.y])
}

module.exports = {
    directions,
    isAdjacent,
    drawMotion,
    moveTail
}