const path = require('path');
const { syncReadFile } = require('../readFile');
const util = require('util');


const mode = process.argv[2];
const inputFile = mode === 'test' ? 'test.txt' : 'input.txt';
const input = syncReadFile(path.join(__dirname, inputFile)).map(el => el.split(' ')).reverse();



function cycleInstructions(input){
    let cycle = 1;
    let X = 1;
    let lock = false;
    let period;
    let instruction = [];
    let CRT = [''];

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
        
        //Write to CRT
        if(cycle === 41 || cycle === 81 || cycle === 121 || cycle === 161 || cycle === 201){
            CRT.push('');
        }
        let currIdx = (cycle-1) % 40;
        if((X === currIdx) || (X-1 === currIdx) || (X+1 === currIdx)){
            CRT[CRT.length - 1] += '#'
        }else{
            CRT[CRT.length - 1] += '.'
        }

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
    return {CRT};
}


let {CRT} = cycleInstructions(input);
console.log(CRT)