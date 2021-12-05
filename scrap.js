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

function filterByBitCriteria(inputArray, position) {
  // tally nth bits; see which is highest (if equal, use 1)
  // make array of lines with same nth bit
  // repeat on new, shortened array, not on full array
  // stop if there is only one number

  // temporaryArray is the oxygen generator
  let temporaryArray = [];
  // let co2Array = [];

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
    } else {
      // co2Array.push(inputArray[i]);
    }
  }

  console.log('temporaryArray', temporaryArray);
  // console.log('co2Array', co2Array);
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
    // answer = newArray[0].toString();
    // answer = 2;
    console.log('answer1', answer);
    // return;
    // return answer;
    // return newArray[0];
    // let test = newArray[0];
    // var test = newArray[0];
    // return test;

    // I'm too tired to figure out why it won't let me reassign a value within this is statement, so I'm just going to finish it here:
    let ogString = answer.toString();
    console.log(ogString.split(''));
    let co2 = findCo2ScrubberRating(ogString.split(''));
    console.log(co2)
    let oxygenGeneratorDecimal = parseInt(answer, 2);
    let co2ScrubberDecimal = parseInt(co2, 2);
    console.log(oxygenGeneratorDecimal, co2ScrubberDecimal);
  } else {
    loop(newArray, index + 1);
  }
  // return answer;
  // console.log(answer);
  return answer;
  // return test;
}

function findOxygenGeneratorRating(fileName) {
  // get full list
  const inputArray = readInput(fileName);

  // loop(inputArray, 0);
  // let answer = loop(inputArray, 0);
  // console.log('answer', answer);
  // return answer;
  return loop(inputArray, 0);
}

// this isn't right - I think I misread something
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
  let ogr = findOxygenGeneratorRating('testInput5.txt');
  console.log('ogr', ogr);
  loop(['00100', '11110',
    '10110', '10111',
    '10101', '01111',
    '00111', '11100',
    '10000', '11001',
    '00010', '01010',
  ], 0);
  let loopAnswer = loop(['00100', '11110',
      '10110', '10111',
      '10101', '01111',
      '00111', '11100',
      '10000', '11001',
      '00010', '01010',
    ], 0);
  console.log('loopAnswer', loopAnswer);
  // console.log(findOxygenGeneratorRating('testInput5.txt'));
  // //findCo2ScrubberRating(findOxygenGeneratorRating('testInput5.txt'));
  //
  // let oxygenGeneratorRatingTest = findOxygenGeneratorRating('testInput5.txt');
  // console.log(oxygenGeneratorRatingTest);
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
