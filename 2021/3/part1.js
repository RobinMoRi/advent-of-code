const path = require('path');
const fs = require('fs');

function syncReadFile(filename) {
  const arr = fs
  .readFileSync(path.join(__dirname, filename), 'utf8')
  .toString()
  .trim()
  .split('\n')
  return arr;
}

const arr = syncReadFile('input.txt');
// const arr = syncReadFile('test.txt');

const lengthArr = arr.length;

const count = {}; //count ones in each row per bit (0 is the first bit, 1 is the second and so on...)

//count ones
for(let i = 0; i < arr.length; i++){
    for(let j = 0; j < arr[i].length; j++){
        if(count[j] !== undefined){
            count[j] += parseInt(arr[i][j]);
        }else{
            count[j] = 0;
        }
    }
}

//construct gamma rate (most common bit for each position) and epsilon rate (least common bit)
let gammaRate = '';
let epsilonRate = '';
for(let i = 0; i < arr[0].length; i++){
    const oneCount = count[i];
    const zeroCount = lengthArr - oneCount;
    if(oneCount > zeroCount){
        gammaRate += '1';
        epsilonRate += '0';
    };
    if(oneCount < zeroCount){
        gammaRate += '0';
        epsilonRate += '1';
    };
}
// convert to decimal and multiply
console.log(parseInt(gammaRate, 2) * parseInt(epsilonRate, 2));