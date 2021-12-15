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
    const digitsArray = [];

    for (let i = 0; i < resultArray.length; i++) {
        const numbers = resultArray[i][1].split(' ');
        const digits = ['0', '0', '0', '0'];
        for (let i = 0; i < numbers.length; i++) {
            // if (numbers[i].length === 2) {
            //     digits[i] = '1';
            // }
            switch(numbers[i].length) {
                case 2:
                    digits[i] = '1';
                    break;
                case 3:
                    digits[i] = '7';
                    break;
                case 4:
                    digits[i] = '4';
                    break;
                case 7:
                    digits[i] = '8';
                    break;
            }
        }
        digitsArray.push(digits);
    }
    console.log(digitsArray);
    return digitsArray;
}

let assert = require('assert');

function runTests() {
    console.log(readInput('day8TestInput.txt'));
    count1748('day8TestInput.txt');
    // assert.equal(26, count1748('day8TestInput.txt'));
    // assert.equal(397, count1748('day8Input.txt'));
}

runTests();