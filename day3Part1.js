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
  let gammaArray = [];
  let epsilonArray = [];

  // for (let i = 0; i < inputArray.length; i++) {
  //   let zeroCount = 0;
  //   let oneCount = 0;
  //   for (let j = 0; j < inputArray[i].length; j++) {
  //     if (inputArray[i][j] === '0') {
  //       zeroCount++;
  //     // assumes all input is valid
  //     } else {
  //       oneCount++;
  //     }
  //   }
  //   // assumes even scores are not going to happen
  //   if (zeroCount > oneCount) {
  //     gammaArray.push('0');
  //     epsilonArray.push('1');
  //   } else {
  //     gammaArray.push('1');
  //     epsilonArray.push('0');
  //   }
  // }

  for (let i = 0; i < inputArray[0].length; i++) {
    let zeroCount = 0;
    let oneCount = 0;
    for (let j = 0; j < inputArray.length; j++) {
      if (inputArray[j][i] === '0') {
        zeroCount++;
      // assumes all input is valid
      } else {
        oneCount++;
      }
    }
    // assumes even scores are not going to happen
    if (zeroCount > oneCount) {
      gammaArray.push('0');
      epsilonArray.push('1');
    } else {
      gammaArray.push('1');
      epsilonArray.push('0');
    }
  }

  let gamma = gammaArray.join('');
  console.log('gamma', gamma);
  let gammaDecimal = parseInt(gamma, 2);
  let epsilon = epsilonArray.join('');
  console.log('epsilon', epsilon);
  let epsilonDecimal = parseInt(epsilon, 2);

  console.log(gammaDecimal, epsilonDecimal);
  const answer = gammaDecimal * epsilonDecimal;
  console.log(answer);
  return answer;
}

function run() {
  doThing('testInput5.txt');
  // 198

  doThing('day3Input.txt');
  // 738234
}

run();
