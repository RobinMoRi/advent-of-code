const path = require('path');
const { syncReadFile } = require('../readFile')

const mode = process.argv[2];
const inputFile = mode === 'test' ? 'test.txt' : 'input.txt';
const arr = syncReadFile(path.join(__dirname, inputFile))
                .map((el) => {
                    const opponent = el.split(' ')[0];
                    const player = el.split(' ')[1];
                    return {opponent, player};
                })


const points = {
    X: 1,
    Y: 2,
    Z: 3
}
const beats = {
    X: 'C', //Rock beats scissor
    Y: 'A', //paper beats rock
    Z: 'B', //scissor beats paper
}
const draw = {
    X: 'A',
    Y: 'B',
    Z: 'C'
}
//A = X, B = Y, C = Z. 
let score = 0;
for(play of arr){
    
    score += points[play.player];
    // Ifi t is a draw, give 3 points
    if(play.opponent === draw[play.player]) score += 3;
    if(play.opponent === beats[play.player]) score += 6;

}

console.log(score);