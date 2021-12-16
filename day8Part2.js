// parse input (return 2D array)
// iterate through array[i][0] to establish which numbers are which
// iterate through array[i][1] to get four digits


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

function figureOutNumbers(fileName) {
    const resultArray = readInput(fileName);
    const digitsArray = [];
    const digitsArray2 = [];

    for (let i = 0; i < resultArray.length; i++) {
        const numbers = resultArray[i][0].split(' ');
        // const digits = ['0', '0', '0', '0'];
        let lettersIn1 = '';
        let lettersIn4 = '';
        let lettersIn7 = '';
        let lettersIn8 = '';
        // (each digit)
        for (let i = 0; i < numbers.length; i++) {
            let sortedLetters = numbers[i].split('').sort().join('');
            switch(numbers[i].length) {
                case 2:
                    lettersIn1 = sortedLetters;
                    break;
                case 3:
                    lettersIn7 = sortedLetters;
                    break;
                case 4:
                    lettersIn4 = sortedLetters;
                    break;
                case 7:
                    lettersIn8 = sortedLetters;
                    break;
            }
        }
        // console.log('1, 4, 7 and 8:', lettersIn1, lettersIn4, lettersIn7, lettersIn8);
        // 1, 4, 7 and 8 have been figured out at this point
        // 3 would have length of 5 and contain the two letters in 1
        // 6 has length of 6 and does not include the letters in 1
        let lettersIn3 = '';
        let lettersIn6 = '';
        for (let i = 0; i < numbers.length; i++) {
            let sortedLetters = numbers[i].split('').sort().join('');
            if (numbers[i].length === 5 && sortedLetters.includes(lettersIn1.charAt(0)) && sortedLetters.includes(lettersIn1.charAt(1))) {
                // console.log('1:', sortedLetters, lettersIn1)
                lettersIn3 = sortedLetters;
            }
            if (numbers[i].length === 6 && !sortedLetters.includes(lettersIn1)) {
                lettersIn6 = sortedLetters;
            }
        }
        // console.log()
        console.log('3 and 6:', lettersIn3, lettersIn6);
        // 2 would have a length of 5; the letter that's in 6 but not in 5 would be in 2
        // the other with a length of 5 would be 5
        // (all letters in 5 are in 6)
        // 9 would have length of 6 and contain the two letters in 1 (so would 0)
        // 9 has all the letters in 3
        // 6 would be the other with the length of 6
    }
}

let assert = require('assert');

function runTests() {
    // console.log(readInput('day8TestInput.txt'));
    figureOutNumbers('day8TestInput.txt');
    // assert.equal(26, count1748('day8TestInput.txt'));
    // assert.equal(397, count1748('day8Input.txt'));
}

runTests();