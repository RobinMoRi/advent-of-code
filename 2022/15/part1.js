const util = require('util');
const { processData, isOverlappingPartly, isOverlappingFully } = require('./util');
const { SensorCoverage } = require('./SensorCoverage')

const data = processData();
let y = 2000000;

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

//Update
function sumCoverageRanges(coverages){
    coverages.sort((a,b) => a.minX - b.minX)

    let sums = [coverages[0].length];
    let min = coverages[0].minX;
    let max = coverages[0].maxX;
    
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
        }
        else{
            sums.push(coverages[i].length);
            min = currMin;
            max = currMax;
        }
    }
    console.log('Not available positions:', sums.reduce((acc, curr) => acc+curr))
}

//Retrieve ranges for y and then sum these
let coverages = retrieveCoverage(y);
sumCoverageRanges(coverages);