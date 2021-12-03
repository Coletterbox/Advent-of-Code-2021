function readInput(fileName) {
  const fs = require('fs');
  const inputArray = [];

  try {
    const data = fs.readFileSync(fileName, 'UTF-8');
    const lines = data.split(/\r?\n/);

    lines.forEach((line) => {
      inputArray.push(parseInt(line));
    });
  } catch (err) {
    console.error(err);
  }

  return inputArray;
}

function doThing(fileName) {
  const inputArray = readInput(fileName);
  let index = 0;
  let prevTotal = 0;
  let currentTotal = 0;

  for (let i = 4; i < inputArray.length; i++) {
    prevTotal = inputArray[i - 4] + inputArray[i - 3] + inputArray[i - 2];
    currentTotal = inputArray[i - 3] + inputArray[i - 2] + inputArray[i - 1];
    if (currentTotal > prevTotal) {
      index++;
    }
  }
  console.log(index);
  return index;
}

function run() {
  doThing('testInput.txt');
  doThing('testInput2.txt');
  doThing('testInput3.txt');
  doThing('day1Input.txt');
}

run();

// 1136
