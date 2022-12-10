const path = require('path');
const { syncReadFile } = require('../readFile');
const util = require('util');


const mode = process.argv[2];
const inputFile = mode === 'test' ? 'test.txt' : 'input.txt';
const input = syncReadFile(path.join(__dirname, inputFile)).map(el => el.split(' ')).reverse();



function cycleInstructions(input){
    let cycle = 1;
    let X = 1;
    let signals = [];
    let lock = false;
    let period;
    let instruction = [];

    //If no lock get a new instruction
    while(input.length > 0 || lock){
        //If no lock, then we take another instructions from the stack
        if(!lock){
            instruction = input.pop();
            if(instruction[0] === 'noop'){
                lock = true;
                period = 1;
            }
            if(instruction[0] === 'addx'){
                lock = true;
                period = 1;
            }
        }

        if(cycle === 20 || cycle === 60 || cycle === 100 || cycle === 140 || cycle === 180 || cycle === 220) signals.push(X*cycle);
        
        //Unlock if instruction is done (addx takes 2 cycles, noop 1 cycle)
        if(period === 2 && instruction[0] === 'addx'){
            lock = false;
            X += parseInt(instruction[1]);
        }
        if(period === 1 && instruction[0] === 'noop'){
            lock = false;
        }
        
        period++;
        cycle++;
    }
    return {X, signals, cycle};
}


let {X,signals,cycle} = cycleInstructions(input);
console.log('Signal sum of given cycles', signals.reduce((acc, curr) => acc + curr))