const util = require('util');
const { processData } = require('./util');

//Process data
let data = processData();

function snafuToDecimal(snafu, base=5){
    let decimal = 0;
    let currPlace = snafu.length-1;
    let currNumber = base**currPlace;
    for(let ch of snafu){
        if(ch === '='){
            decimal += (-2)*currNumber;
        }
        else if(ch === '-'){
            decimal += (-1)*currNumber;
        }
        else{
            decimal += parseInt(ch)*currNumber;
        }
        currPlace--;
        currNumber = base**currPlace;
    }

    return decimal;
}

function decimalToSnafu(decimal, base=5){
    let values = [];
    
    while(decimal > 0){
        let remainder = decimal % base;
        if(remainder > 2){
            decimal += remainder;
            let diff = remainder - base;
            if(diff >= 0){
                values.push(String(diff));
            }
            else if(String(diff) === '-1'){
                values.push('-');
            }
            else if(String(diff) === '-2'){
                values.push('=');
            }
        }else{
            values.push(String(remainder))
        }
        // console.log({number, remainder})
        decimal = Math.floor(decimal/base);
    }
    return values.reverse().join('');
}

function getSnafus(input){
    let snafus = [];
    for(let snafu of input){
        snafus.push(snafuToDecimal(snafu));
    }
    return snafus;
}

let decimal = getSnafus(data).reduce((acc, curr) => acc+curr);
console.log('SNAFU Sum (in decimal): ', decimal);
console.log('SNAFU Sum (in snafu): ', decimalToSnafu(decimal));