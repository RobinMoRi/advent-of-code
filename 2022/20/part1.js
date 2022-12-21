const util = require('util');
const { processData } = require('./util');

let data = processData();

function mix(data){
    const LENGTH = data.length;
    //Array to manipulate - add refs to make values unique
    let ref = data.map((el, i) => ({val: el, ref: i}));

    //To keep track of next item to process
    let copyRef = JSON.parse(JSON.stringify(ref)); 

    for(let i = 0; i < copyRef.length; i++){
        let currIdx = ref.findIndex(el => el.ref === copyRef[i].ref);
        let moveToIdx = (currIdx + copyRef[i].val) % (LENGTH - 1);
        moveToIdx = moveToIdx === 0 ? LENGTH-1 : moveToIdx; //Zero-index outcome will be put at end of list.
        ref.splice(currIdx, 1);
        ref.splice(moveToIdx, 0, copyRef[i]);
    }
    return ref.map(el => el.val);
}

function findGrooveCoordinates(ref){
    let idx = ref.findIndex(el => el === 0);
    let numbers = [1000, 2000, 3000];
    let grooveCoords = [];
    for(let i = 0; i < numbers.length; i++){
        let val = ref[(idx + numbers[i]) % ref.length];
        grooveCoords.push(val);
    }
    return grooveCoords;
}

let ref = mix(data);
let grooveCoords = findGrooveCoordinates(ref);
console.log('Sum of groove coords: ', grooveCoords.reduce((acc, curr) => acc+curr))