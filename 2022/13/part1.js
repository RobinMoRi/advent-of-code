const util = require('util');
const { processData, stringToArray } = require('./util');

const pairs = processData();

function checkPairsRightOrder(left, right){
    //Convert to array to be able to loop for loop below
    if(typeof left === 'number') left = [left];
    if(typeof right === 'number') right = [right];

    let maxIdx = Math.max(left.length, right.length);
    for(let i = 0; i < maxIdx; i++){
        //If left or right run out of elements (return true/false)
        if (left[i] === undefined) return true;
        if (right[i] === undefined) return false;

        if(typeof left[i] === 'number' && typeof right[i] === 'number'){
            if(left[i] < right[i]) return true;
            if(left[i] > right[i]) return false;
        }
        else if(Array.isArray(left[i]) || Array.isArray(right[i])){
            let isRightOrder = checkPairsRightOrder(left[i], right[i]);
            if(isRightOrder !== undefined) return isRightOrder;
        }
    }
}

//Find indices of pairs that are in the correct order
let indices = [];
for(let i = 0; i < pairs.length; i++){
    let isRight = checkPairsRightOrder(pairs[i].first, pairs[i].second);
    if(isRight) indices.push(i+1);
}

//Sum indices
console.log('Sum of indices in correct order: ', indices.reduce((acc, curr) => acc+curr));