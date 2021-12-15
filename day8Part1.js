// parse input (return 2D array)
// iterate through array
    // check array[i][0] for:
        // 2 letters: 1
        // 3 letters: 7
        // 4 letters: 4
        // 7 letters: 8
    // count instances of above numbers in array[i][1]

function readInput(fileName) {
    const fs = require('fs');
    let inputArray = [];
    let resultArray = [];
  
    try {
        const data = fs.readFileSync(fileName, 'UTF-8');
        const lines = data.split(/\r?\n/);
  
        lines.forEach((line) => {
            inputArray.push(line);
        });
    } catch (err) {
      console.error(err);
    }

    inputArray.forEach((line) => {
        resultArray.push(line.split(' | '));
    });
  
    return resultArray;
}

function count1748(fileName) {
    const resultArray = readInput(fileName);
    let total = 0;

    for (let i = 0; i < resultArray.length; i++) {
        const numbers = resultArray[i][1].split(' ');
        numbers.forEach((element) => {
            if (element.length === 2 || element.length === 3 || element.length === 4 || element.length === 7) {
                total++;
            }
        });
    }
    return total;
}

let assert = require('assert');

function runTests() {
    console.log(readInput('day8TestInput.txt'));
    assert.equal(26, count1748('day8TestInput.txt'));
    assert.equal(397, count1748('day8Input.txt'));
}

runTests();