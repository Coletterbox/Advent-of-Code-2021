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

// function doThing(fileName) {
//   const inputArray = readInput(fileName);
//   let firstBitZeroCount = 0;
//   let firstBitOneCount = 0;
//   // let firstBitIsOne = true;
//   let firstBit = 0;
//
//   for (let i = 0; i < inputArray.length; i++) {
//     if (inputArray[i][0] === '0') {
//       firstBitZeroCount++;
//     // assumes all input is valid
//     } else {
//       firstBitOneCount++;
//     }
//   }
//   if (firstBitZeroCount > firstBitOneCount) {
//     // firstBitIsOne = false;
//     // condense this (default value of firstBit is 0):
//     firstBit = 0;
//   } else {
//     // firstBitIsOne = true;
//     firstBit = 1;
//   }
//
//   let oxygenGeneratorArray = [];
//   let co2ScrubberArray = [];
//   for (let i = 0; i < inputArray.length; i++) {
//     if (firstBit == inputArray[i][0]) {
//       oxygenGeneratorArray.push(inputArray[i]);
//     } else {
//       co2ScrubberArray.push(inputArray[i]);
//     }
//   }
// }

// function findOxygenGeneratorRating(fileName) {
//   const inputArray = readInput(fileName);
//   // let currentBitArray = [];
//   for (let i = 0; i < inputArray[0].length; i++) {
//     let zeroCount = 0;
//     let oneCount = 0;
//     let currentBit = 0;
//     let temporaryArray = [];
//     for (let j = 0; j < inputArray.length; j++) {
//       if (inputArray[j][i] === '0') {
//         zeroCount++;
//       } else {
//         // assumes all input is valid
//         oneCount++;
//       }
//       if (oneCount >= zeroCount) {
//         currentBit = 1;
//       }
//       console.log('currentBit', currentBit);
//       // currentBitArray.push(currentBit);
//
//       if (currentBit === parseInt(inputArray[j][i])) {
//         console.log(currentBit, parseInt(inputArray[j][i]));
//         temporaryArray.push(inputArray[j]);
//         console.log(temporaryArray);
//       }
//
//     }
//     // if (oneCount >= zeroCount) {
//     //   currentBit = 1;
//     // }
//     // // currentBitArray.push(currentBit);
//     // if (currentBit == inputArray[j][i]) {
//     //   temporaryArray.push(inputArray[j]);
//     //   console.log(temporaryArray);
//     // }
//   }
//   // console.log(currentBitArray);
// }

// rewrite this - it doesn't need to repeat for each position;
// it just needs to condense the array based on the nth bit
// and then it'll get called again
// function filterByBitCriteria(inputArray) {
//   // tally nth bits; see which is highest (if equal, use 1)
//   // make array of lines with same nth bit
//   // repeat on new, shortened array, not on full array
//   // stop if there is only one number
//
//   let temporaryArray = [];
//
//   // for each position
//   for (let j = 0; j < inputArray[0].length; j++) {
//     let zeroCount = 0;
//     let oneCount = 0;
//     let currentBit = 0;
//     // for each line
//     for (let i = 0; i < inputArray.length; i++) {
//       if (parseInt(inputArray[i][j]) === 0) {
//         zeroCount++;
//       } else {
//         oneCount++;
//       }
//     }
//     if (oneCount >= zeroCount) {
//       currentBit = 1;
//     }
//     // add matching lines
//     for (let i = 0; i < inputArray.length; i++) {
//       if (parseInt(inputArray[i][j]) === currentBit) {
//         temporaryArray.push(inputArray[i]);
//       }
//     }
//   }
//
//   console.log(temporaryArray);
// }

function filterByBitCriteria(inputArray, position) {
  // tally nth bits; see which is highest (if equal, use 1)
  // make array of lines with same nth bit
  // repeat on new, shortened array, not on full array
  // stop if there is only one number

  let temporaryArray = [];

  let zeroCount = 0;
  let oneCount = 0;
  let currentBit = 0;

  // for each line
  for (let i = 0; i < inputArray.length; i++) {
    if (parseInt(inputArray[i][position]) === 0) {
      zeroCount++;
    } else {
      oneCount++;
    }
  }
  if (oneCount >= zeroCount) {
    currentBit = 1;
  }
  // add matching lines
  for (let i = 0; i < inputArray.length; i++) {
    if (parseInt(inputArray[i][position]) === currentBit) {
      temporaryArray.push(inputArray[i]);
    }
  }

  console.log(temporaryArray);
  return temporaryArray;
}

// function loop(array, index) {
//   let newArray = filterByBitCriteria(array, index);
//   let answer = 0;
//   if (newArray.length === 1) {
//     console.log('newArray', newArray);
//     console.log('newArray[0]', newArray[0]);
//     // return newArray[0];
//     answer = newArray[0];
//     console.log('answer1', answer);
//     return answer;
//   } else {
//     loop(newArray, index + 1);
//   }
//   // return newArray[0];
//   // return answer;
// }

function loop(array, index) {
  let newArray = filterByBitCriteria(array, index);
  let answer = 0;
  if (newArray.length === 1) {
    console.log('newArray', newArray);
    console.log('newArray[0]', newArray[0]);
    answer = newArray[0];
    console.log('answer1', answer);
    return answer;
  } else {
    loop(newArray, index + 1);
  }
}

function loopTest(array, index) {
  let newArray = filterByBitCriteria(array, index);
  let answer = 0;
  if (newArray.length === 1) {
    console.log('ltnewArray', newArray);
    console.log('ltnewArray[0]', newArray[0]);
    answer = newArray[0];
    console.log('ltanswer1', answer);
    return answer;
  } else {
    loop(newArray, index + 1);
  }
}

function findOxygenGeneratorRating(fileName) {
  // get full list
  const inputArray = readInput(fileName);

  // for each position
  // filterByBitCriteria(inputArray, position)

  // function iterateThroughPositions(array) {
  //   for (let i = 0; i < inputArray[0].length; i++) {
  //     let newArray = filterByBitCriteria(inputArray, i);
  //     iterateThroughPositions(newArray);
  //   }
  // }

  // let first = filterByBitCriteria(inputArray, 0);
  // let second = filterByBitCriteria(first, 1);
  // let third = filterByBitCriteria(second, 2);
  // let fourth = filterByBitCriteria(third, 3);
  // let fifth = filterByBitCriteria(fourth, 4);



  // let oxygenGeneratorRating = loop(inputArray, 0);
  // console.log(oxygenGeneratorRating);
  // return oxygenGeneratorRating;

  loop(inputArray, 0);
  // let answer = loop(inputArray, 0);
  // console.log('answer', answer);
  // return answer;
  return loop(inputArray, 0);

  // let oxygenGeneratorRatingArray = loop(inputArray, 0);
  // return oxygenGeneratorRatingArray.join('');

  // for (let i = 0; i < inputArray[0].length; i++) {
  //   let newArray = filterByBitCriteria(inputArray, i);
  //   console.log('newArray', newArray);
  //   if (newArray.length === 1) {
  //     return newArray;
  //   } else {
  //     filterByBitCriteria(newArray, i);
  //   }
  // }
}

function findCo2ScrubberRating(oxygenGeneratorRating) {
  let co2ScrubberRatingArray = [];
  for (let i = 0; i < oxygenGeneratorRating.length; i++) {
    if (oxygenGeneratorRating[i] === 0) {
      co2ScrubberRatingArray.push('1');
    } else {
      co2ScrubberRatingArray.push('0');
    }
  }
  console.log(co2ScrubberRatingArray.join(''));
  return co2ScrubberRatingArray.join('');
}

function run() {
  // doThing('testInput5.txt');
  // // 198
  //
  // doThing('day3Input.txt');
  // // 738234

  findOxygenGeneratorRating('testInput5.txt');
  console.log(findOxygenGeneratorRating('testInput5.txt'));
  //findCo2ScrubberRating(findOxygenGeneratorRating('testInput5.txt'));

  let oxygenGeneratorRatingTest = findOxygenGeneratorRating('testInput5.txt');
  console.log(oxygenGeneratorRatingTest);
  //
  // loopTest([
  //   '00100', '11110',
  //   '10110', '10111',
  //   '10101', '01111',
  //   '00111', '11100',
  //   '10000', '11001',
  //   '00010', '01010',
  //   ], 0);
}

run();
