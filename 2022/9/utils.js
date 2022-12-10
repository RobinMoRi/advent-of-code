const directions = {
    'U': 1,
    'D': -1,
    'L': -1,
    'R': 1,
}

function isAdjacent(x1, y1, x2, y2){
    /**
     * overlapping: xT,yT = xH,yH
     * adjacent horisontal: yT=yH and (xT=xH-1 or xT = xH+1)
     * adjacent verticaxT=xH and (yT=yH-1 or yT = yH+1)
     * adjacent diagonally: (yT=yH-1 or yT = yH+1) and (xT=xH-1 or xT = xH+1)
     */
    const dx = Math.abs(x1 - x2);
    const dy = Math.abs(y1 - y2);
    return ((x1 === x2) && (y1 === y2)) ||
            ((y2 === y1) && (dx === 1)) ||
            ((x2 === x1) && (dy === 1)) ||
            ((dx === 1) && (dy === 1))
}

function drawMotion(coords, marker){
    let minY = Math.min(...coords.map(el => el[1]));
    let maxY = Math.max(...coords.map(el => el[1]));
    let minX = Math.min(...coords.map(el => el[0]));
    let maxX = Math.max(...coords.map(el => el[0]));
    let cols = maxX-minX+1;
    let rows = maxY-minY+1;

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

module.exports = {
    directions,
    isAdjacent,
    drawMotion
}