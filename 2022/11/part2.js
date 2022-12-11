const { processData } = require('./util');

const monkeys = processData();

function monkeyThrowing(monkeys, divider, rounds){
    for(let i = 0; i < rounds; i++){
        monkeyInspection(monkeys, divider)
    }
}

function monkeyInspection(monkeys, divider){
    for(let monkey of monkeys){
        while(monkey.items.length > 0){
            let item = monkey.items.reverse().pop();
            let temp1 = item;
            let temp2 = item;
            if(monkey.operation.value1 !== 'old'){
                temp1 = parseInt(monkey.operation.value1);
            }
            if(monkey.operation.value2 !== 'old'){
                temp2 = parseInt(monkey.operation.value2);
            }
            let newValue;
            if(monkey.operation.op === '+') newValue = temp1 + temp2;
            if(monkey.operation.op === '*') newValue = temp1 * temp2;

            newValue = newValue % divider;
    
            if(newValue % monkey.divisible === 0){
                monkeys[monkey.ifTrue].items.push(newValue);
            }else{
                monkeys[monkey.ifFalse].items.push(newValue);
            }
            monkey.inspections++;
        }
    }
}



//Googled and found what the divider should be..
const divider = monkeys.map((m) => m.divisible).reduce((a, b) => a * b, 1);
monkeyThrowing(monkeys, divider, 10000);
let inspections = monkeys.map(monkey => monkey.inspections).sort((a,b) => b-a)
console.log({inspections})
console.log(inspections[0]*inspections[1]);