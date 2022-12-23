const path = require("path");
const { syncReadFile } = require("../readFile");

function processData() {
  const mode = process.argv[2];
  const inputFile = mode === "test" ? "test.txt" : "input.txt";
  const input = syncReadFile(path.join(__dirname, inputFile));

  let board = input.slice(0, input.length - 2);
  board[0] = board[0].replace("1", " ");
  let letters = input[input.length - 1].split(/\d+/);
  letters = letters.slice(1, letters.length - 1);
  const digits = input[input.length - 1].split(/[A-Z]+/);
  const cols = Math.max(...board.map((el) => el.length));

  let instructions = [];
  let i = 0;
  for (let j = 0; j < digits.length; j++) {
    instructions.push(digits[j]);
    if (letters[i]) {
      instructions.push(letters[i]);
    }
    i++;
  }

  let result = [];
  for (let row of board) {
    if (row.length === cols) {
      result.push(row);
    } else {
      let diff = cols - row.length;
      for (let i = 0; i < diff; i++) {
        row += " ";
      }
      result.push(row);
    }
  }

  return { grid: result, instructions };
}


const map = {
    
}

module.exports = {
  processData
};
