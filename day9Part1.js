// parse input
// iterate through array
    // starting where i and j are 1, and stopping where i is array.length-2 and j is array[i].length-2
        // check 4 adjacent numbers
    // do edges and corners
    // alternatively, pad edges? idk what's cleaner
    // or maybe just catch index out of bounds exception?
// have separate function to calculate risk level
// sum risk levels

function readInput(fileName) {
    const fs = require('fs');
    const inputArray = [];
  
    try {
      const data = fs.readFileSync(fileName, 'UTF-8');
      const lines = data.split(/\r?\n/);
  
      lines.forEach((line) => {
        inputArray.push(line);
      });
    } catch (err) {
      console.error(err);
    }
  
    console.log(inputArray);
    return inputArray;
}

function checkArray(fileName) {
    const inputArray = readInput(fileName);
    let lowPoints = [];

    for (let i = 1; i < inputArray.length-1; i++) {
        for (let j = 1; j < inputArray[i].length-1; j++) {
            if (inputArray[i][j] < inputArray[i-1][j]
                && inputArray[i][j] < inputArray[i+1][j]
                && inputArray[i][j] < inputArray[i][j-1]
                && inputArray[i][j] < inputArray[i][j+1]) {
                    lowPoints.push(inputArray[i][j]);
                }
        }
    }
    for (let j = 1; j < inputArray[0].length-1; j++) {
        if (inputArray[0][j] < inputArray[1][j]
            && inputArray[0][j] < inputArray[0][j-1]
            && inputArray[0][j] < inputArray[0][j+1]) {
                lowPoints.push(inputArray[0][j]);
            }
    }
    for (let j = 1; j < inputArray[inputArray.length-1].length-1; j++) {
        if (inputArray[inputArray.length-1][j] < inputArray[inputArray.length-2][j]
            && inputArray[inputArray.length-1][j] < inputArray[inputArray.length-1][j-1]
            && inputArray[inputArray.length-1][j] < inputArray[inputArray.length-1][j+1]) {
                lowPoints.push(inputArray[inputArray.length-1][j]);
            }
    }
    for (let i = 1; i < inputArray.length-1; i++) {
        if (inputArray[i][0] < inputArray[i-1][0]
            && inputArray[i][0] < inputArray[i][1]
            && inputArray[i][0] < inputArray[i+1][0]) {
                lowPoints.push(inputArray[i][0]);
            }
    }
    for (let i = 1; i < inputArray.length-1; i++) {
        if (inputArray[i][inputArray[i].length-1] < inputArray[i-1][inputArray[i].length-1]
            && inputArray[i][inputArray[i].length-1] < inputArray[i+1][inputArray[i].length-1]
            && inputArray[i][inputArray[i].length-1] < inputArray[i][inputArray[i].length-2]) {
                lowPoints.push(inputArray[i][inputArray[i].length-1]);
            }
    }
    console.log(lowPoints);
}

function run() {
    // readInput('day9TestInput.txt');
    checkArray('day9TestInput.txt');
    checkArray('day9TestInput2.txt');
}

run();