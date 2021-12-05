function readInput(fileName) {
  const fs = require('fs');
  const inputArray = [];

  try {
    const data = fs.readFileSync(fileName, 'UTF-8');
    const lines = data.split(/\r?\n/);

    lines.forEach((line) => {
      console.log(line);
      inputArray.push(line);
    });
  } catch (err) {
    console.error(err);
  }

  console.log(inputArray);
  return inputArray;
}

function getNumbers(fileName) {
  let inputArray = readInput(fileName);
  console.log(inputArray[0]);
  return inputArray[0];
}

function getBoards(fileName) {
  let inputArray = readInput(fileName);
  let boardArray = [];

  for (let i = 2; i < inputArray.length; i++) {
    boardArray.push(inputArray[i]);
  }

  console.log('boards:', boardArray);
}

function run() {
  getNumbers('day4TestInput.txt');
  getBoards('day4TestInput.txt');
}

run();
