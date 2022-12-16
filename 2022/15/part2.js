const util = require('util');
const { processData, isOverlappingPartly, isOverlappingFully } = require('./util');
const { SensorCoverage } = require('./SensorCoverage')

const data = processData();

function retrieveCoverage(y){
    let coverages = [];
    for(let line of data.input){
        let sensorCoverage = new SensorCoverage(line.sensor, line.beacon);
        let ranges = sensorCoverage.getCoverageRangeByY(y);
        if(ranges.length > -1){
            coverages.push(sensorCoverage.getCoverageRangeByY(y));
        }
    }
    return coverages;
}

//TODO: clean up
function sumCoverageRanges(coverages){
    coverages.sort((a,b) => a.minX - b.minX)
    // console.log(coverages)

    let sums = [coverages[0].length];
    let min = coverages[0].minX;
    let max = coverages[0].maxX;

    let minMax = [{min, max}];
    
    for(let i = 1; i < coverages.length; i++){
        let currMin = coverages[i].minX;
        let currMax = coverages[i].maxX;
        
        if(isOverlappingFully(min, max, currMin, currMax)){
            //Ignore
        }
        else if(isOverlappingPartly(min, max, currMin, currMax) && !isOverlappingFully(min, max, currMin, currMax)){
            let sum = coverages[i].length - ( max - currMin );
            sums[sums.length-1] += sum;
            max = currMax;
            minMax[minMax.length-1].max = max;
        }
        else{
            sums.push(coverages[i].length);
            min = currMin;
            max = currMax;
            minMax.push({min, max})
        }
    }
    return {sum: sums.reduce((acc, curr) => acc+curr), length: sums.length, minMax};
}

const MAXVAL = 4000000;
let result = null;
for(let y = 0; y <= MAXVAL; y++){
    let coverages = retrieveCoverage(y);
    let sum = sumCoverageRanges(coverages);
    if(sum.sum <= MAXVAL || sum.length > 1){
        result = {sum, coverages, y};
        break;
    }
}
let x = result.sum.minMax[0].max + 1;
let y = result.y;
console.log({tuningFrequency: x*MAXVAL + y, x, y});
