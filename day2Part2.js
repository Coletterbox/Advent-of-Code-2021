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

  return inputArray;
}

function doThing(fileName) {
  const inputArray = readInput(fileName);
  let x = 0;
  let y = 0;
  let aim = 0;

  for (let i = 0; i < inputArray.length; i++) {
    let instruction = inputArray[i].split(' ');
    if (instruction[0] === 'forward') {
      x += parseInt(instruction[1]);
      console.log('x = ', x);
      y += aim * parseInt(instruction[1]);
      console.log('y = ', y);
    } else if (instruction[0] === 'down') {
      aim += parseInt(instruction[1]);
      console.log('aim = ', aim);
    } else if (instruction[0] === 'up') {
      aim -= parseInt(instruction[1]);
      console.log('aim = ', aim);
    }
  }
  console.log(x*y);
  return x*y;
}

function run() {
  doThing('day2Input.txt');
  // doThing('testInput4.txt');
}

run();

// 11727785422
