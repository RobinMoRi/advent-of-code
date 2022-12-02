const path = require('path');
const fs = require('fs');
const { platform } = require('os');

function syncReadFile(filename) {
  const arr = fs
  .readFileSync(path.join(__dirname, filename), 'utf8')
  .toString()
  .trim()
  .split('\n')
  .map((el) => {
      const opponent = el.split(' ')[0];
      const player = el.split(' ')[1];
      return {opponent, player};
  })
  return arr;
}

const arr = syncReadFile('input.txt');
// const arr = syncReadFile('test.txt');

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