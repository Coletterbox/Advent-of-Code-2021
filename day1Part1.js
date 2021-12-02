function readInput(fileName) {
  const fs = require('fs');
  const inputArray = [];

  try {
    const data = fs.readFileSync(fileName, 'UTF-8');
    const lines = data.split(/\r?\n/);

    lines.forEach((line) => {
      // console.log(line);
      inputArray.push(line);
    });
  } catch (err) {
    console.error(err);
  }

  return inputArray;
}

function doThing(fileName) {
  const inputArray = readInput(fileName);
  let index = 0;

  for (let i = 1; i < inputArray.length; i++) {
    if (parseInt(inputArray[i]) > parseInt(inputArray[i - 1])) {
      // console.log(inputArray[i]);
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
