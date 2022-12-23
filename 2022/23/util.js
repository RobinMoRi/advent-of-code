const path = require("path");
const { syncReadFile } = require("../readFile");
const { Elf } = require('./Elf');

function processData() {
  const mode = process.argv[2];
  const inputFile = mode === "test" ? "test.txt" : "input.txt";
  const input = syncReadFile(path.join(__dirname, inputFile)).map(el => el.split(''));

  //Retrieve starting positions of elves, store elves in hashmap
  let elves = {};
  for(let i = 0; i < input.length; i++){
    for(let j = 0; j < input[0].length; j++){
      if(input[i][j] === '#'){
        let elf = new Elf();
        elf.elfCoordinates = {x: j, y: i, grid: elves};
      }
    }
  }
  return elves;
}

//Init validation queue in following order: N, S, W, E
//Use: shift() and push() operations when changing priority
function createDirectionValidationQueue(){
  let Q = [];
  Q.push({validation: validateNorth, getCoordinates: getNorth});
  Q.push({validation: validateSouth, getCoordinates: getSouth});
  Q.push({validation: validateWest, getCoordinates: getWest});
  Q.push({validation: validateEast, getCoordinates: getEast});
  return Q;
}

function validateNorth(surr){
  return !surr.N.val && !surr.NE.val && !surr.NW.val;
}
function getNorth(surr){
  return {x: surr.N.x, y: surr.N.y};
}

function validateSouth(surr){
  return !surr.S.val && !surr.SE.val && !surr.SW.val;
}
function getSouth(surr){
  return {x: surr.S.x, y: surr.S.y};
}

function validateWest(surr){
  return !surr.W.val && !surr.NW.val && !surr.SW.val;
}
function getWest(surr){
  return {x: surr.W.x, y: surr.W.y};
}

function validateEast(surr){
 return !surr.E.val && !surr.NE.val && !surr.SE.val;
}
function getEast(surr){
  return {x: surr.E.x, y: surr.E.y};
}

module.exports = {
  processData,
  createDirectionValidationQueue
};
