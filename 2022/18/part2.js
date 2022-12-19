const util = require('util');
const { processData } = require('./util');
const { Cube } = require('./Cube');

const data = processData();

//Find ranges in x,y,z direction and add padding distance of 1 unit
let xRange = {min: Math.min(...data.map(el => el.x))-1, max: Math.max(...data.map(el => el.x))+1};
let yRange = {min: Math.min(...data.map(el => el.y))-1, max: Math.max(...data.map(el => el.y))+1};
let zRange = {min: Math.min(...data.map(el => el.z))-1, max: Math.max(...data.map(el => el.z))+1};

//Find lavaCubes from init data set
function lavaCubes(data){
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
    return cubes;
}

//Sum number of childrens
function sumNonConnectedFaces(cubes){
    let sum = 0;
    for(let key of Object.keys(cubes)){
        let cube = cubes[key];
        sum += cube.children.length;
    }
    return sum;
}

//Find air cubes using dfs, the padding of 1 is very important!
function steamDFS(cubes, xRange, yRange, zRange){
    let start = new Cube(xRange.min, yRange.min, zRange.min).index();
    let S = []; //simulate stack using array
    S.push(start);
    let visited = {}; //Store visited cubes (the air cubes)

    //DFS Flood fill
    while(S.length > 0){
        //Collect current and mark as visited
        let curr = S.pop();
        let currCoords = curr.split(',');
        let currObj = new Cube(parseInt(currCoords[0]), parseInt(currCoords[1]), parseInt(currCoords[2]))
        visited[curr] = currObj;

        //If the current index is not a lava cube (does not exist in the cubes obj)
        for(let child of currObj.childIndices()){
            let childCoords = child.split(',');
            let childObj = new Cube(parseInt(childCoords[0]), parseInt(childCoords[1]), parseInt(childCoords[2]));
            
            //Collect nodes to search for: if it is a steam cube (not lava), and not visited
            if(!cubes[child] && !visited[child] && childObj.isInRange(xRange, yRange, zRange)){
                S.push(child);
            }
        }
    }

    //visited should be complete list of all visited air nodes
    return visited;
}


//Find lavaCubes from init data set, children that are pushed to these cubes are surface cubes retrieved using flood fill
function surfaceCubes(data, visited){
    let cubes = {};
    for(let line of data){
        //Create new cube
        const cube = new Cube(line.x, line.y, line.z);
    
        //add current cube to children
        for(let child of cube.childIndices()){
            if(visited[child]){
                cube.children.push(child)
            }
        }
    
        // Add cube to cubes
        cubes[cube.index()] = cube;
    }
    return cubes;
}

//these are all cubes in the set
const cubes = lavaCubes(data);

//Using DFS to find alla cubes that are adjacent to a steam cube.
// steam = steam-cubes, steamExposed = exposed to steam
const visited = steamDFS(cubes, xRange, yRange, zRange);
const surface = surfaceCubes(data, visited);
const sum = sumNonConnectedFaces(surface);
console.log('Number of faces connected to air: ', sum)