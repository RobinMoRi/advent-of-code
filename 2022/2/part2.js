const path = require('path');
const { syncReadFile } = require('../readFile')

const mode = process.argv[2];
let inputFile = '';
if(mode === 'test'){
    inputFile = 'test.txt';
}else{
    inputFile = 'input.txt';
}
const arr = syncReadFile(path.join(__dirname, inputFile))
                .map((el) => {
                    const opponent = el.split(' ')[0];
                    const player = el.split(' ')[1];
                    return {opponent, player};
                })

const points = {
    A: 1,
    B: 2,
    C: 3
}
const beats = {
    A: 'C', //Rock beats scissor
    B: 'A', //paper beats rock
    C: 'B', //scissor beats paper
}
let score = 0;
for(play of arr){
    let player = null;
    //lose
    if(play.player === 'X'){
        player = beats[play.opponent];
    };
    //Draw
    if(play.player === 'Y'){
        player = play.opponent;
    };
    //win
    if(play.player === 'Z'){   
        player = Object.keys(beats).find(key => beats[key] === play.opponent);
    };

    score += points[player];
    if(play.opponent === player) score += 3;
    if(play.opponent === beats[player]) score += 6;

}

console.log(score);