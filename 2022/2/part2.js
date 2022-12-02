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
    A: 1,
    B: 2,
    C: 3
}
const beats = {
    A: 'C', //Rock beats scissor
    B: 'A', //paper beats rock
    C: 'B', //scissor beats paper
}
const loses = {
    A: 'B', //Rock loses against paper
    B: 'C', //paper loses against scissor
    C: 'A', //scissor loses against rock
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
        player = loses[play.opponent]; //I will chose the one that opponent will lose against.
    };

    
    score += points[player];
    // Ifi t is a draw, give 3 points
    if(play.opponent === player) score += 3;
    if(loses[play.opponent] === player) score += 6;
    console.log(player, score)

}

console.log(score);