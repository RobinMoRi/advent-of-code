const { SSL_OP_MSIE_SSLV2_RSA_PADDING } = require('constants');
const path = require('path');
const { syncReadFile } = require('../readFile')

const mode = process.argv[2];
const inputFile = mode === 'test' ? 'test.txt' : 'input.txt';
const arr = syncReadFile(path.join(__dirname, inputFile))
    .map((pairs) => {
        const min1 = parseInt(pairs.split(',')[0].split('-')[0]);
        const max1 = parseInt(pairs.split(',')[0].split('-')[1]);
        const min2 = parseInt(pairs.split(',')[1].split('-')[0]);
        const max2 = parseInt(pairs.split(',')[1].split('-')[1]);
        return {min1, max1, min2, max2}
    });

let overlapCount = 0;
for(pairs of arr){
    const {min1, max1, min2, max2} = pairs;
    if( (min1 >= min2 && max1 <= max2) || 
        (min2 >= min1 && max2 <= max1) ||
        (min2 <= max1 && max1 <= max2) ||
        (min1 <= max2 && max2 <= max1)
    ) overlapCount++;
}

console.log(overlapCount);