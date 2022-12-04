const path = require('path');
const { syncReadFile } = require('../readFile')

const mode = process.argv[2];
const inputFile = mode === 'test' ? 'test.txt' : 'input.txt';
const arr = syncReadFile(path.join(__dirname, inputFile))


const A_ASCII = 'A'.charCodeAt(0);
const Z_ASCII = 'Z'.charCodeAt(0);
const a_ASCII = 'a'.charCodeAt(0);
const z_ASCII = 'z'.charCodeAt(0);
let sum = 0;

// Brute force solutinon O(n^2)
for(let i = 0; i < arr.length; i+=3){
    //compare last 2 strings
    const regexp1 = new RegExp(`[^${arr[i+1]}]`, 'g');
    const regexp2 = new RegExp(`[^${arr[i+2]}]`, 'g');
    const commonCharCode = arr[i].replace(regexp1, '');
    const commonCharCode2 = arr[i].replace(regexp2, '');

    //Compare result from last two with first string (result is the first element of each)
    const regexp3 = new RegExp(`[^${commonCharCode2}]`, 'g');
    const commonCharCode3 = commonCharCode.replace(regexp3, '')[0].charCodeAt(0);

    //ASCII 97 through 122 (lower case a-z): prio 1-26
    if(commonCharCode3 >= a_ASCII && commonCharCode3 <= z_ASCII) sum += commonCharCode3 - 96;

    //ASCII 65 through 90 (uppcase A-Z): prio 27-52
    if(commonCharCode3 >= A_ASCII && commonCharCode3 <= Z_ASCII) sum += commonCharCode3 - 38;
}
console.log(sum);