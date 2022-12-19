const util = require('util');
const { processData } = require('./util');
const { Cube } = require('./Cube');

const data = processData();

let cubes = {};

for(let line of data){
    //Create new cube
    const cube = new Cube(line.x, line.y, line.z);

    //add current cube to children
    for(let key of Object.keys(cubes)){
        let temp = cubes[key];
        if(temp.isChild(cube.x, cube.y, cube.z)){
            temp.children.push(cube.index())
            cube.children.push(temp.index())
        }
    }

    // Add cube to cubes
    cubes[cube.index()] = cube;
}

let sum = 0;
for(let key of Object.keys(cubes)){
    let cube = cubes[key];
    sum += (6-cube.children.length)
}

console.log('Non-connected faces: ', sum)

console.log(util.inspect(cubes, false, null, true), sum)