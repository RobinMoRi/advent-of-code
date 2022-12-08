function buildColumns(input){
    let columnsByIndex = {};
    for(let i = 0; i < input.length; i++){
        for(let j = 0; j < input[0].length; j++){
            if(!columnsByIndex[j]){
                columnsByIndex[j] = [];
            }
            columnsByIndex[j].push(parseInt(input[i][j]));
        }
    }
    return columnsByIndex;
}

function isVisisble(left, right, up, down, curr){
    return left.every(el => el < curr) || right.every(el => el < curr) || up.every(el => el < curr) || down.every(el => el < curr)
}

//From current element, look left, right, up and down, returns these structures
function lookAround(i, j, row, col){
    const left = row.slice(0, j).reverse();
    const right = row.slice(j+1, row.length);
    const up = col.slice(0, i).reverse();
    const down = col.slice(i+1, col.length);
    return {left, right, up, down}
}

function countVisibleTree(arr, val){
    let count = 0;
    for(let el of arr){
        count++;
        if(el >= val) break;
    }
    return count;
}

function getScenicScore(left, right, up, down, curr){
    return countVisibleTree(left, curr) * countVisibleTree(right, curr) * countVisibleTree(up, curr) * countVisibleTree(down, curr);
}


module.exports = {
    buildColumns,
    lookAround,
    isVisisble,
    getScenicScore
}