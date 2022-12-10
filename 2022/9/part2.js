const path = require('path');
const fs = require('fs');
const { syncReadFile } = require('../readFile');
const { directions, isAdjacent, drawMotion, moveTail } = require('./utils');
const util = require('util')
const { DLL } = require ('./DLL.js');

const mode = process.argv[2];
const inputFile = mode === 'test' ? 'test2.txt' : 'input.txt';
const input = syncReadFile(path.join(__dirname, inputFile)).map(el => el.split(' '));

function move(input){
    // create rope using DLL
    let rope = new DLL();
    rope.build(0, 0, 10);

    for(let ins of input){
        const instruction = ins[0];
        const direction = directions[instruction];
        const steps = parseInt(ins[1]);

        for(let step = 0; step < steps; step++){
            // Update position of head
            if(instruction === 'U' || instruction === 'D'){
                rope.head.y += direction;
            }
            if(instruction === 'L' || instruction === 'R'){
                rope.head.x += direction;
            }
            rope.head.visited.push([rope.head.x, rope.head.y])

            //Update position of nodes - starting of the next node of head
            let currNode = rope.head.next;
            while(currNode){
                // Update tail if not adjacent to previous node 
                if(!isAdjacent(currNode.prev.x, currNode.prev.y, currNode.x, currNode.y)){
                    //previous node is head relative current node
                    moveTail(currNode.prev, currNode, direction, instruction);
                }
                currNode = currNode.next;
            }
        }
    }
    return rope;
}

let result = move(input);
let unique =  result.tail.visited.map(el => el.join('')).filter((v, i, a) => a.indexOf(v) === i);
console.log('Number of Visited Positions Tail', unique.length)


// Print visited positions of each knot
// let title = 'HEAD';
// let count = 0;
// let marker = 'H'
// let curr = result.head;
// while(curr){
//     console.log(`\n------------${title}------------\n`)
//     drawMotion(curr.visited, marker);
//     count++;
//     title = count === 9 ? 'Tail' : count;
//     marker = count;
//     curr = curr.next;
// }