const util = require('util');
const { processData } = require('./util');

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

//Construct packets structure
let packets = [[[2]], [[6]]];
for(let i = 0; i < pairs.length; i++){
    packets.push(pairs[i].first);
    packets.push(pairs[i].second);
}

//Sort packets structure using recursive function from part 1
packets.sort((a, b) => {
    if(checkPairsRightOrder(a, b)) return -1;
    return 1;
})

//Find indices (1-indexed) of [[2]] and [[6]]
let dividerIdx = [];
let i = 1;
for(let packet of packets){
    if(JSON.stringify(packet) === '[[6]]' || JSON.stringify(packet) === '[[2]]'){
        dividerIdx.push(i);
    }
    i++;
}
//Find Decoder key:
console.log('Decoder key: ', dividerIdx[0] * dividerIdx[1]);