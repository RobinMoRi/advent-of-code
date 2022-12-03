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

const commonItems = [];
// Brute force solutinon O(n^2)
for(let rucksack of arr){
    for(let item of rucksack.comp1){
        if(rucksack.comp2.includes(item)){
            commonItems.push(item);
            break;
        };
    }
}

let sum = 0;
for(let item of commonItems){
    //ASCII 97 through 122 (lower case a-z): prio 1-26
    if(item.charCodeAt(0) >= 97 && item.charCodeAt(0) <= 122) sum += item.charCodeAt(0) - 96;

    //ASCII 65 through 90 (uppcase A-Z): prio 27-52
    if(item.charCodeAt(0) >= 65 && item.charCodeAt(0) <= 90) sum += item.charCodeAt(0) - 38;
}
console.log(commonItems, sum);