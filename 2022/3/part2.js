const path = require('path');
const { syncReadFile } = require('../readFile')

const mode = process.argv[2];
const inputFile = mode === 'test' ? 'test.txt' : 'input.txt';
const arr = syncReadFile(path.join(__dirname, inputFile))

const commonItems = [];
// Brute force solutinon O(n^2)
for(let i = 0; i < arr.length; i+=3){
    const rucksacks =[arr[i], arr[i+1], arr[i+2]];
    //Sort for longest array
    rucksacks.sort((a,b) => b.length - a.length);
    console.log(rucksacks)

    for(let item of rucksacks[0]){
        if(rucksacks[1].includes(item) && rucksacks[2].includes(item)){
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