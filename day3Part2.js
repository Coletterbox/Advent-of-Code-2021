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

function filterByBitCriteria(inputArray, position, oxygenOrCo2) {
  let condensedArray = [];
  let currentBit = '1';
  let oneCount = 0;
  let zeroCount = 0;

  for (let i = 0; i < inputArray.length; i++) {
    console.log(inputArray[i][position]);
    if (inputArray[i][position] === '1') {
      oneCount++;
    } else if (inputArray[i][position] === '0') {
      zeroCount++;
    } else {
      console.log('Invalid input.');
    }
  }

  // check this?
  if ((zeroCount > oneCount) && (oxygenOrCo2 === 'oxygen')) {
    currentBit = '0';
  }
  if ((zeroCount <= oneCount) && (oxygenOrCo2 === 'co2')) {
    currentBit = '0';
  }

  for (let i = 0; i < inputArray.length; i++) {
    if (inputArray[i][position] === currentBit) {
      condensedArray.push(inputArray[i]);
    }
  }

  if (condensedArray.length === 1) {
    console.log(condensedArray);
    return condensedArray;
  } else {
    filterByBitCriteria(condensedArray, position + 1, oxygenOrCo2);
  }
}

function run() {
  let array = readInput('day3TestInput.txt');
  filterByBitCriteria(array, 0, 'oxygen');
  filterByBitCriteria(array, 0, 'co2');
}

run();
