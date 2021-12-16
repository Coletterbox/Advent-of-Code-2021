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

    // ...huge amounts of this next chunk is unnecessary
    // (it's a double of the section underneath it - one loops through the first chunk to establish the numbers)
    const digitsArray2 = [];
    for (let i = 0; i < resultArray.length; i++) {
        const numbers = resultArray[i][0].split(' ');
        const digits = ['0', '0', '0', '0'];
        let lettersIn1 = '';
        let lettersIn3 = '';
        let lettersIn6 = '';
        // (each digit)
        for (let i = 0; i < numbers.length; i++) {
            let sortedLetters = numbers[i].split('').sort().join('');
            if (numbers[i].length === 2) {
                lettersIn1 = sortedLetters;
                console.log('lettersIn1', lettersIn1);
            }
        }
        for (let i = 0; i < numbers.length; i++) {
            let sortedLetters = numbers[i].split('').sort().join('');
            if (numbers[i].length === 5 && sortedLetters.includes(lettersIn1)) {
                digits[i] = '3';
                lettersIn3 = sortedLetters;
                console.log('lettersIn3 1', lettersIn3);
            }
        }
        for (let i = 0; i < numbers.length; i++) {
            let sortedLetters = numbers[i].split('').sort().join('');
            // 3 would have length of 5 and contain the two letters in 1
            // 2 would have a length of 5; the letter that's in 6 but not in 5 would be in 2
            // the other with a length of 5 would be 5
            // (all letters in 5 are in 6)
            // 9 would have length of 6 and contain the two letters in 1 (so would 0)
            // 9 has all the letters in 3
            // 6 would be the other with the length of 6
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
                case 5:
                    if (sortedLetters.includes(lettersIn1)) {
                        digits[i] = '3';
                        lettersIn3 = sortedLetters;
                        console.log('lettersIn3 2', lettersIn3);
                    }
                    break;
            }
        }
        for (let i = 0; i < numbers.length; i++) {
            let sortedLetters = numbers[i].split('').sort().join('');
            if (numbers[i].length === 2) {
                lettersIn1 = sortedLetters;
                console.log('lettersIn1', lettersIn1);
            }
            switch(numbers[i].length) {
                // 6 has length of 6 and does not include the letters in 1
                // case 6:
                //     if (sortedLetters.includes(lettersIn1)) {
                //         // distinguish between 9 and 0
                //         if (sortedLetters.includes(lettersIn3)) {
                //             digits[i] = '9';
                //         } else {
                //             digits[i] = '0';
                //         }
                //     } else {
                //         digits[i] = '6';
                //         lettersIn6 = sortedLetters;
                //     }
                case 6:
                    // if (!sortedLetters.includes(lettersIn1)) {
                    if (sortedLetters.includes(lettersIn1) === false) {
                        digits[i] = '6';
                        lettersIn6 = sortedLetters;
                        console.log('lettersIn6', lettersIn6);
                    } else if (sortedLetters.includes(lettersIn3)) {
                        digits[i] = '9';
                    } else {
                        digits[i] = '0';
                    }
                    break;
            }
        }
        for (let i = 0; i < numbers.length; i++) {
            let sortedLetters = numbers[i].split('').sort().join('');
            if (numbers[i].length === 2) {
                // console.log(lettersIn1);
                lettersIn1 = sortedLetters;
                // console.log(lettersIn1);
                console.log('lettersIn1', lettersIn1);

            }
            switch(numbers[i].length) {
                case 5:
                    // console.log(lettersIn1);
                    if (sortedLetters.includes(lettersIn1) === false) {
                    // if (!sortedLetters.includes(lettersIn1)) {
                        // distinguish between 2 and 5
                        console.log(lettersIn6, sortedLetters);
                        if (lettersIn6.includes(sortedLetters)) {
                            digits[i] = '5';
                        } else {
                            digits[i] = '2';
                        }
                    }
                    break;
            }
        }
        digitsArray2.push(digits);
    }
    // ...until here

    // there's a reason this loops through again, separately
    // (each line)
    for (let i = 0; i < resultArray.length; i++) {
        const numbers = resultArray[i][1].split(' ');
        const digits = ['0', '0', '0', '0'];
        let lettersIn1 = '';
        let lettersIn3 = '';
        let lettersIn6 = '';
        // (each digit)
        for (let i = 0; i < numbers.length; i++) {
            let sortedLetters = numbers[i].split('').sort().join('');
            if (numbers[i].length === 2) {
                lettersIn1 = sortedLetters;
                console.log('lettersIn1', lettersIn1);
            }
        }
        for (let i = 0; i < numbers.length; i++) {
            let sortedLetters = numbers[i].split('').sort().join('');
            if (numbers[i].length === 5 && sortedLetters.includes(lettersIn1)) {
                digits[i] = '3';
                lettersIn3 = sortedLetters;
                console.log('lettersIn3 1', lettersIn3);
            }
        }
        for (let i = 0; i < numbers.length; i++) {
            let sortedLetters = numbers[i].split('').sort().join('');
            // 3 would have length of 5 and contain the two letters in 1
            // 2 would have a length of 5; the letter that's in 6 but not in 5 would be in 2
            // the other with a length of 5 would be 5
            // (all letters in 5 are in 6)
            // 9 would have length of 6 and contain the two letters in 1 (so would 0)
            // 9 has all the letters in 3
            // 6 would be the other with the length of 6
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
                case 5:
                    if (sortedLetters.includes(lettersIn1)) {
                        digits[i] = '3';
                        lettersIn3 = sortedLetters;
                        console.log('lettersIn3 2', lettersIn3);
                    }
                    break;
            }
        }
        for (let i = 0; i < numbers.length; i++) {
            let sortedLetters = numbers[i].split('').sort().join('');
            if (numbers[i].length === 2) {
                lettersIn1 = sortedLetters;
                console.log('lettersIn1', lettersIn1);
            }
            switch(numbers[i].length) {
                // 6 has length of 6 and does not include the letters in 1
                // case 6:
                //     if (sortedLetters.includes(lettersIn1)) {
                //         // distinguish between 9 and 0
                //         if (sortedLetters.includes(lettersIn3)) {
                //             digits[i] = '9';
                //         } else {
                //             digits[i] = '0';
                //         }
                //     } else {
                //         digits[i] = '6';
                //         lettersIn6 = sortedLetters;
                //     }
                case 6:
                    // if (!sortedLetters.includes(lettersIn1)) {
                    if (sortedLetters.includes(lettersIn1) === false) {
                        digits[i] = '6';
                        lettersIn6 = sortedLetters;
                        console.log('lettersIn6', lettersIn6);
                    } else if (sortedLetters.includes(lettersIn3)) {
                        digits[i] = '9';
                    } else {
                        digits[i] = '0';
                    }
                    break;
            }
        }
        for (let i = 0; i < numbers.length; i++) {
            let sortedLetters = numbers[i].split('').sort().join('');
            if (numbers[i].length === 2) {
                // console.log(lettersIn1);
                lettersIn1 = sortedLetters;
                // console.log(lettersIn1);
                console.log('lettersIn1', lettersIn1);

            }
            switch(numbers[i].length) {
                case 5:
                    // console.log(lettersIn1);
                    if (sortedLetters.includes(lettersIn1) === false) {
                    // if (!sortedLetters.includes(lettersIn1)) {
                        // distinguish between 2 and 5
                        console.log(lettersIn6, sortedLetters);
                        if (lettersIn6.includes(sortedLetters)) {
                            digits[i] = '5';
                        } else {
                            digits[i] = '2';
                        }
                    }
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
    // console.log(readInput('day8TestInput.txt'));
    count1748('day8TestInput2.txt');
    // assert.equal(26, count1748('day8TestInput.txt'));
    // assert.equal(397, count1748('day8Input.txt'));
}

runTests();