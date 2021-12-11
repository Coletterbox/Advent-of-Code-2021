function readInput(fileName) {
  const fs = require('fs');
  const inputArray = [];

  try {
    const data = fs.readFileSync(fileName, 'UTF-8');
    const lines = data.split(/\r?\n/);

    lines.forEach((line) => {
      // console.log(line);
      inputArray.push(line);
    });
  } catch (err) {
    console.error(err);
  }

  // console.log(inputArray);
  return inputArray;
}

function getNumbers(fileName) {
  let inputArray = readInput(fileName);
  // console.log('numbers:', inputArray[0]);
  return inputArray[0];
}

function getBoards(fileName) {
  let inputArray = readInput(fileName);
  let boardArray = [];
  let newBoardArray = [];
  let newBoardArray2 = [];
  // let newBoardArray3 = [];
  let newBoardArray3 = [[]];

  for (let i = 2; i < inputArray.length; i++) {
    boardArray.push(inputArray[i]);
  }

  for (let i = 0; i < boardArray.length; i+=6) {
    newBoardArray.push(boardArray.slice(i, i+6));
  }

  // console.log('boardArray:', boardArray);
  // console.log('newBoardArray:', newBoardArray);

  for (let i = 0; i < newBoardArray.length; i++) {
    for (let j = 0; j < newBoardArray[i].length; j++) {
      // console.log('newBoardArray[i][j]', newBoardArray[i][j]);
      newBoardArray2.push(newBoardArray[i][j].split(' ').filter(el => {return el != null && el != ''}));
    }
  }

  // console.log('newBoardArray2:', newBoardArray2);

  let newArrayIndex = 0;
  for (let i = 0; i < newBoardArray2.length; i++) {
    if (newBoardArray2[i].length === 0) {
      // newBoardArray3.push([]);
      // newBoardArray3.push([[]]);
      newBoardArray3.push([]);
      newArrayIndex++;
    } else {
      // newBoardArray3.push(newBoardArray2[i]);
      // newBoardArray3[newArrayIndex] = newBoardArray2[i];
      // newBoardArray3[newArrayIndex].push(newBoardArray2[i]);
      // newBoardArray3[newArrayIndex] = newBoardArray3[newArrayIndex].push(newBoardArray2[i]);
      // newBoardArray3[newArrayIndex] = newBoardArray3[newArrayIndex]+=newBoardArray2[i];
      // newBoardArray3[newArrayIndex]+='test';
      // newBoardArray3[newArrayIndex].push('test');
      newBoardArray3[newArrayIndex].push(newBoardArray2[i]);
      // console.log(newBoardArray3[newArrayIndex]);
    }
  }

  console.log('newBoardArray3:', newBoardArray3);

  return newBoardArray3;
}

// function createMarkerArray(fileName) {
//   let markerArray = [];
//   let boardArray = getBoards(fileName);
// }

// 7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

function checkNumbers(fileName) {
  let numbers = getNumbers(fileName);
  numbers = numbers.split(',');
  const boards = getBoards(fileName);
  let markerArray = [];
  let indexOfLastNumber = 0;

  for (let indexOfNumbers = 0; indexOfNumbers < numbers.length; indexOfNumbers++) {
    for (let j = 0; j < boards.length; j++) {
      for (let k = 0; k < boards[j].length; k++) {
        for (let l = 0; l < boards[j][k].length; l++) {
          // console.log(boards[j][k][l]);
          if (boards[j][k][l] === numbers[indexOfNumbers]) {
            markerArray.push(j.toString() + ' ' + k.toString() + ' ' + l.toString());
            markerArray.sort(); // this is alphabetical but it's fine for this purpose
            // check markerArray for five with same j and k (and consecutive ls (keep in mind real input will produce two-digit numbers)
            for (let i = 4; i < markerArray.length; i++) {
              let previous4 = markerArray[i-4].split(' ');
              let previous3 = markerArray[i-3].split(' ');
              let previous2 = markerArray[i-2].split(' ');
              let previous = markerArray[i-1].split(' ');
              let current = markerArray[i].split(' ');
              // console.log('previous:', previous);
              // console.log('current:', current);
              // let tally = [];
              // ...idk I WAS TIRED IT'S FINE
              if (markerArray.length > 4
                && current[0] == previous[0]
                && current[1] == previous[1]
                && previous[0] == previous2[0]
                && previous[1] == previous2[1]
                && previous2[0] == previous3[0]
                && previous2[1] == previous3[1]
                && previous3[0] == previous4[0]
                && previous3[1] == previous4[1]
              ) {
                  // tally.push([current[0], current[1]]);
                  // console.log('tally:', tally
                  // indexOfLastNumber = i; // this isn't correct; i is the index of something else
                  indexOfLastNumber = indexOfNumbers;
                  console.log('indexOfLastNumber', indexOfLastNumber);
                  console.log('index of winning board', current[0]);

                  return current[0]; // this is the index of the winning board

                  // let lastNumber = numbers[indexOfLastNumber];
                  // console.log(lastNumber);
                  // return lastNumber;
              }
            }
            // check markerArray for five with same j and l (and consecutive ks)
          }
        }
      }
    }
  }

  // these four lines should really go somewhere else
  // console.log(markerArray);
  // let sumOfUnmarkedNumbers = findSumOfUnmarkedNumbers(fileName);
  // console.log(sumOfUnmarkedNumbers);
  // getResult(sumOfUnmarkedNumbers, indexOfNumbers);
}

// this is the same thing copied and pasted but returning different things; I'm tired
function getFinalNumber(fileName) {
  let numbers = getNumbers(fileName);
  numbers = numbers.split(',');
  const boards = getBoards(fileName);
  let markerArray = [];
  let indexOfLastNumber = 0;

  for (let indexOfNumbers = 0; indexOfNumbers < numbers.length; indexOfNumbers++) {
    for (let j = 0; j < boards.length; j++) {
      for (let k = 0; k < boards[j].length; k++) {
        for (let l = 0; l < boards[j][k].length; l++) {
          // console.log(boards[j][k][l]);
          if (boards[j][k][l] === numbers[indexOfNumbers]) {
            markerArray.push(j.toString() + ' ' + k.toString() + ' ' + l.toString());
            markerArray.sort(); // this is alphabetical but it's fine for this purpose
            // check markerArray for five with same j and k (and consecutive ls (keep in mind real input will produce two-digit numbers)
            for (let i = 4; i < markerArray.length; i++) {
              let previous4 = markerArray[i-4].split(' ');
              let previous3 = markerArray[i-3].split(' ');
              let previous2 = markerArray[i-2].split(' ');
              let previous = markerArray[i-1].split(' ');
              let current = markerArray[i].split(' ');
              // console.log('previous:', previous);
              // console.log('current:', current);
              // let tally = [];
              // ...idk I WAS TIRED IT'S FINE
              if (markerArray.length > 4
                && current[0] == previous[0]
                && current[1] == previous[1]
                && previous[0] == previous2[0]
                && previous[1] == previous2[1]
                && previous2[0] == previous3[0]
                && previous2[1] == previous3[1]
                && previous3[0] == previous4[0]
                && previous3[1] == previous4[1]
              ) {
                  // tally.push([current[0], current[1]]);
                  // console.log('tally:', tally
                  // indexOfLastNumber = i; // this isn't correct; i is the index of something else
                  indexOfLastNumber = indexOfNumbers;
                  console.log('indexOfLastNumber', indexOfLastNumber);
                  console.log('index of winning board', current[0]);

                  // return current[0]; // this is the index of the winning board

                  let lastNumber = numbers[indexOfLastNumber];
                  console.log(lastNumber);
                  return lastNumber;
              }
            }
            // check markerArray for five with same j and l (and consecutive ks)
          }
        }
      }
    }
  }

  // these four lines should really go somewhere else
  // console.log(markerArray);
  // let sumOfUnmarkedNumbers = findSumOfUnmarkedNumbers(fileName);
  // console.log(sumOfUnmarkedNumbers);
  // getResult(sumOfUnmarkedNumbers, indexOfNumbers);
}

// 0, 1, 2, 3, 4
// 5, 6, 7, 8, 9
// 10, 11, 12, 13, 14
// 15, 16, 17, 18, 19
// 20, 21, 22, 23, 24
// 0, 5, 10, 15, 20
// 1, 6, 11, 16, 21
// 2, 7, 12, 17, 22
// 3, 8, 13, 18, 23
// 4, 9, 14, 19, 24
// oops, diagonals DON'T count...
// 0, 6, 12, 18, 24
// 4, 8, 12, 16, 20

// sort indexes
// check list of indexes contains one of above combinations

// let sumOfUnmarkedNumbers = 0;
// function findSumOfUnmarkedNumbers(fileName) {
//   // (of winning board)
//   let numbers = getNumbers(fileName).split(',');
//   numbers = numbers.slice(0, numbers.indexOf(getFinalNumber(fileName)));
//   console.log(numbers);
//   const boards = getBoards(fileName);
//   const indexOfWinningBoard = checkNumbers(fileName);
//   let winningBoard = boards[indexOfWinningBoard]; // winning board as two-dimensional array
//   for (let i = 0; i < winningBoard.length; i++) {
//     for (let j = 0; j < winningBoard[i].length; j++) {
//       // for (let k = 0; k < numbers.length; k++) {
//       //   if (winningBoard[i][j] !)
//       // }
//       // console.log('numbers:', numbers);
//       // console.log('winningBoard[i][j]:', winningBoard[i][j]);
//       // console.log(numbers.includes(winningBoard[i][j].toString()));
//       // if (numbers.includes(winningBoard[i][j].toString()) == false) {
//       //   sumOfUnmarkedNumbers+=parseInt(winningBoard[i][j]);
//       //   console.log(sumOfUnmarkedNumbers);
//       // }
//     }
//   }
//   console.log(sumOfUnmarkedNumbers);
//   return sumOfUnmarkedNumbers;
// }

let sumOfUnmarkedNumbers = 0;
function findSumOfUnmarkedNumbers(fileName) {
  // (of winning board)
  let numbers = getNumbers(fileName).split(',');
  numbers = numbers.slice(0, numbers.indexOf(getFinalNumber(fileName))+1);
  console.log(numbers);
  const boards = getBoards(fileName);
  const indexOfWinningBoard = checkNumbers(fileName);
  let winningBoard = boards[indexOfWinningBoard]; // winning board as two-dimensional array
  for (let i = 0; i < winningBoard.length; i++) {
    for (let j = 0; j < winningBoard[i].length; j++) {
      // for (let k = 0; k < numbers.length; k++) {
  //     //   if (winningBoard[i][j] !)
  //     // }
  //     // console.log('numbers:', numbers);
  //     // console.log('winningBoard[i][j]:', winningBoard[i][j]);
  //     // console.log(numbers.includes(winningBoard[i][j].toString()));
        if (numbers.includes(winningBoard[i][j].toString()) == false) {
          sumOfUnmarkedNumbers+=parseInt(winningBoard[i][j]);
          console.log(sumOfUnmarkedNumbers);
        }
      // }
    }
  }
  console.log('sumOfUnmarkedNumbers', sumOfUnmarkedNumbers);
  return sumOfUnmarkedNumbers;
}

function getResult(fileName) {
    let sumOfUnmarkedNumbers = findSumOfUnmarkedNumbers(fileName);
    let finalNumber = getFinalNumber(fileName);
    console.log(sumOfUnmarkedNumbers);
    console.log(sumOfUnmarkedNumbers * finalNumber);
    return sumOfUnmarkedNumbers * finalNumber;
}

function run() {
  // getNumbers('day4TestInput.txt');
  // const boards = getBoards('day4TestInput.txt');
  // const indexOfWinningBoard = checkNumbers('day4TestInput.txt');
  // console.log(boards[indexOfWinningBoard]); // winning board as two-dimensional array

  // findSumOfUnmarkedNumbers('day4TestInput.txt');
  // findSumOfUnmarkedNumbers('day4Input.txt');

  // checkNumbers('day4Input.txt');
  // checkNumbers('day4TestInput.txt');
  // checkNumbers('day4TestInput2.txt');
  // checkNumbers('day4TestInput3.txt');

  // getResult('day4TestInput.txt'); // 24 * 188 = 4512
  getResult('day4Input.txt'); // 96 * 188 = 63552
}

run();
