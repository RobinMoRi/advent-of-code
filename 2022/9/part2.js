const path = require('path');
const fs = require('fs');
const { syncReadFile } = require('../readFile');
const { directions, isAdjacent, drawMotion } = require('./utils');
const util = require('util')
const { DLL } = require ('./DLL.js');

const mode = process.argv[2];
const inputFile = mode === 'test' ? 'test.txt' : 'input.txt';
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


function moveTail(head, tail, direction, instruction){
    let moveDiagonally = tail.x !== head.x && tail.y !== head.y;
    //x or y is always updated according to the same direction as head
    if(!moveDiagonally){
        if(instruction === 'U' || instruction === 'D'){
            tail.y += direction;
        }
        if(instruction === 'L' || instruction === 'R'){
            tail.x += direction;
        }
    }else{
        if(head.x > tail.x) tail.x++;
        else if(head.x < tail.x) tail.x--;
        if(head.y > tail.y) tail.y++;
        else if(head.y < tail.y) tail.y--;
    }
    tail.visited.push([tail.x, tail.y])
}

let result = move(input);
let unique =  result.tail.visited.map(el => el.join('')).filter((v, i, a) => a.indexOf(v) === i);
console.log('Number of Visited Positions Tail', unique.length)

let title = 'HEAD';
let count = 0;
let marker = 'H'
let curr = result.head;
while(curr){
    console.log(`\n------------${title}------------\n`)
    drawMotion(curr.visited, marker);
    count++;
    title = count === 9 ? 'Tail' : count;
    marker = count;
    curr = curr.next;
}