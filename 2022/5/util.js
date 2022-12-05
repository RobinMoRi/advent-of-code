// Could not come up with a way to parse the stacks... So I just hardcoded them in..

const stacksTest = [
    ['Z', 'N'],
    ['M', 'C', 'D'],
    ['P']
]

const stacks = [
    ['Z', 'J', 'G'],
    ['Q', 'L', 'R', 'P', 'W', 'F', 'V', 'C'],
    ['F', 'P', 'M', 'C', 'L', 'G', 'R'],
    ['L', 'F', 'B', 'W', 'P', 'H', 'M'],
    ['G', 'C', 'F', 'S', 'V', 'Q'],
    ['W', 'H', 'J', 'Z', 'M', 'Q', 'T', 'L'],
    ['H', 'F', 'S', 'B', 'V'],
    ['F', 'J', 'Z', 'S'],
    ['M', 'C', 'D', 'P', 'F', 'H', 'B', 'T'],
]

function initStack(mode) {
    return mode === 'test' ? stacksTest : stacks;
}

//Print last item of each row in 2d array
function printLastItem2d(array2d){
    //log last items
    let output = '';
    for(row of array2d){
    output += row[row.length - 1];
    }
    console.log(output);
}


module.exports = {
    initStack,
    printLastItem2d
};