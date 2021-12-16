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
    let digitsArrayArray = [];

    for (let i = 0; i < resultArray.length; i++) {
        console.log('new line');
        const numbers = resultArray[i][0].split(' ');
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
        console.log('1, 4, 7 and 8:', lettersIn1, lettersIn4, lettersIn7, lettersIn8);
        // 1, 4, 7 and 8 have been figured out at this point
        // 3 would have length of 5 and contain the two letters in 1
        // 6 has length of 6 and does not include the letters in 1
        let lettersIn3 = '';
        let lettersIn6 = '';
        for (let i = 0; i < numbers.length; i++) {
            let sortedLetters = numbers[i].split('').sort().join('');
            if (numbers[i].length === 5 && sortedLetters.includes(lettersIn1.charAt(0)) && sortedLetters.includes(lettersIn1.charAt(1))) {
                lettersIn3 = sortedLetters;
            }
            if (numbers[i].length === 6 && !sortedLetters.includes(lettersIn1)) {
                lettersIn6 = sortedLetters;
            }
        }
        console.log('3 and 6:', lettersIn3, lettersIn6);
        // 2 would have a length of 5; the letter that's in 6 but not in 5 would be in 2
        // the other with a length of 5 would be 5 (still need to include conditions since 3 is established in a separate loop)
        // let lettersIn2 = '';
        // let lettersIn5 = '';
        // commenting this out because I just realised we don't have 5 at this point
        // let letterIn6NotIn5 = '';
        // for (let i = 0; i < lettersIn6.length; i++) {
        //     if (!lettersIn5.includes(lettersIn6.charAt(i))) {
        //         letterIn6NotIn5 = lettersIn6.charAt(i);
        //     }
        // }
        // console.log('letterIn6NotIn5', letterIn6NotIn5);
        // for (let i = 0; i < numbers.length; i++) {
        //     let sortedLetters = numbers[i].split('').sort().join('');
        //     if (numbers[i].length === 5 && numbers[i].includes(letterIn6NotIn5) && !(sortedLetters.includes(lettersIn1.charAt(0)) && sortedLetters.includes(lettersIn1.charAt(1)))) {
        //         lettersIn2 = sortedLetters;
        //     } else if (numbers[i].length === 5 && !(sortedLetters.includes(lettersIn1.charAt(0)) && sortedLetters.includes(lettersIn1.charAt(1)))) {
        //         lettersIn5 = sortedLetters;
        //     } else {
        //         console.log(sortedLetters);
        //     }
        // }
        // console.log('2:', lettersIn2, '5:', lettersIn5);
        // 9 would have length of 6 and contain the two letters in 1 (so would 0)
        // 9 has all the letters in 3
        // 6 would be the other with the length of 6
        // ...
        // 2 and 5 have length of 5 but do not contain both letters in 1
        // all letters in 5 are in 6
        let lettersIn2 = '';
        let lettersIn5 = '';
        for (let i = 0; i < numbers.length; i++) {
            let sortedLetters = numbers[i].split('').sort().join('');
            if (numbers[i].length === 5 && !(sortedLetters.includes(lettersIn1.charAt(0)) && sortedLetters.includes(lettersIn1.charAt(1)))) {
                // narrow down between 2 and 5
                for (let i = 0; i < sortedLetters.length; i++) {
                    if (!lettersIn6.includes(sortedLetters.charAt(i))) {
                        lettersIn2 = sortedLetters;
                    }
                    // } else {
                    //     lettersIn5 = sortedLetters;
                    // }
                }
            }
        }
        console.log('2:', lettersIn2, '5:', lettersIn5);
        let lettersIn0 = '';
        let lettersIn9 = '';
        for (let i = 0; i < numbers.length; i++) {
            let sortedLetters = numbers[i].split('').sort().join('');
            if (numbers[i].length === 6) {
                for (let i = 0; i < lettersIn3.length; i++) {
                    console.log(lettersIn3.charAt(i));
                    if (!sortedLetters.includes(lettersIn3.charAt(i))) {
                        lettersIn0 = sortedLetters;
                    }
                    // } else {
                    //     lettersIn9 = sortedLetters;
                    // }
                }
            }
        }
        console.log('0:', lettersIn0, '9:', lettersIn9);
        for (let i = 0; i < numbers.length; i++) {
            let sortedLetters = numbers[i].split('').sort().join('');
            if (sortedLetters.length === 6 && !lettersIn0.includes(sortedLetters)) {
                lettersIn9 = sortedLetters;
            }
            if (sortedLetters.length === 5 && !lettersIn2.includes(sortedLetters) && !lettersIn3.includes(sortedLetters)) {
                lettersIn5 = sortedLetters;
            }
        }
        console.log('5:', lettersIn5, '9:', lettersIn9);

        let digitsArray = [lettersIn0, lettersIn1, lettersIn2, lettersIn3, lettersIn4, lettersIn5, lettersIn6, lettersIn7, lettersIn8, lettersIn9];
        console.log(digitsArray);
        digitsArrayArray.push(digitsArray);
    }

    console.log(digitsArrayArray);
    return digitsArrayArray;
}

let assert = require('assert');

function runTests() {
    // console.log(readInput('day8TestInput.txt'));
    figureOutNumbers('day8TestInput.txt');
    // assert.equal(26, count1748('day8TestInput.txt'));
    // assert.equal(397, count1748('day8Input.txt'));
}

runTests();