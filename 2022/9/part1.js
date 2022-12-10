const path = require('path');
const { syncReadFile } = require('../readFile');
const { directions, isAdjacent } = require('./utils');
const util = require('util')
const { DLL } = require ('./DLL.js');

const mode = process.argv[2];
const inputFile = mode === 'test' ? 'test.txt' : 'input.txt';
const input = syncReadFile(path.join(__dirname, inputFile)).map(el => el.split(' '));

function move(input){
    // create rope using DLL
    let rope = new DLL();
    rope.build(0, 0, 2);
    
    for(let ins of input){
        const direction = directions[ins[0]];
        const steps = parseInt(ins[1]);
        
        for(let step = 0; step < steps; step++){
            //Update head
            if(ins[0] === 'U' || ins[0] === 'D') rope.head.y += direction;
            else rope.head.x += direction;
            rope.head.visited.push([rope.head.x, rope.head.y]) 

            if(!isAdjacent(rope.head.x, rope.head.y, rope.tail.x, rope.tail.y)){
                const lVisitedHead = rope.head.visited.length;
                rope.tail.x = rope.head.visited[lVisitedHead-2][0];
                rope.tail.y = rope.head.visited[lVisitedHead-2][1];
                rope.tail.visited.push([rope.tail.x, rope.tail.y])
            }
        }
    }

    return rope;
}

let result = move(input);
let unique =  result.tail.visited.map(el => el.join('')).filter((v, i, a) => a.indexOf(v) === i);
console.log(util.inspect(result.head, false, null, true), unique.length);