const path = require('path');
const { syncReadFile } = require('../readFile')

const mode = process.argv[2];
const inputFile = mode === 'test' ? 'test.txt' : 'input.txt';
const arr = syncReadFile(path.join(__dirname, inputFile))
    .map((rucksack) => {
        const comp1 = rucksack.slice(0, rucksack.length / 2);
        const comp2 = rucksack.slice(rucksack.length / 2);
        return {comp1, comp2}
    });

const A_ASCII = 'A'.charCodeAt(0);
const Z_ASCII = 'Z'.charCodeAt(0);
const a_ASCII = 'a'.charCodeAt(0);
const z_ASCII = 'z'.charCodeAt(0);

let sum = 0;
for(let rucksack of arr){
    const regexp = new RegExp(`[^${rucksack.comp2}]`, 'g');
    const commonCharCode = rucksack.comp1.replace(regexp, '').charCodeAt(0);

    //ASCII 97 through 122 (lower case a-z): prio 1-26
    if(commonCharCode >= a_ASCII && commonCharCode <= z_ASCII) sum += commonCharCode - 96;

    //ASCII 65 through 90 (uppcase A-Z): prio 27-52
    if(commonCharCode >= A_ASCII && commonCharCode <= Z_ASCII) sum += commonCharCode - 38;

}
console.log(sum);