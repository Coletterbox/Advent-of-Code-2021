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

  return inputArray;
}

function getNumbers(fileName) {
  let inputArray = readInput(fileName);
  return inputArray[0];
}

function getBoards(fileName) {
  let inputArray = readInput(fileName);
  let boardArray = [];
  let newBoardArray = [];
  let newBoardArray2 = [];
  let newBoardArray3 = [[]];

  for (let i = 2; i < inputArray.length; i++) {
    boardArray.push(inputArray[i]);
  }

  for (let i = 0; i < boardArray.length; i+=6) {
    newBoardArray.push(boardArray.slice(i, i+6));
  }

  for (let i = 0; i < newBoardArray.length; i++) {
    for (let j = 0; j < newBoardArray[i].length; j++) {
      newBoardArray2.push(newBoardArray[i][j].split(' ').filter(el => {return el != null && el != ''}));
    }
  }

  let newArrayIndex = 0;
  for (let i = 0; i < newBoardArray2.length; i++) {
    if (newBoardArray2[i].length === 0) {
      newBoardArray3.push([]);
      newArrayIndex++;
    } else {
      newBoardArray3[newArrayIndex].push(newBoardArray2[i]);
    }
  }

  console.log('newBoardArray3:', newBoardArray3);

  return newBoardArray3;
}

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
                && previous3[1] == previous4[1]) 
                  // idk about this indentation
                  {
                    indexOfLastNumber = indexOfNumbers;
                    console.log('indexOfLastNumber', indexOfLastNumber);
                    console.log('index of winning board', current[0]);

                    return current[0]; // this is the index of the winning board
              }
            }
          }
        }
      }
    }
  }
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
                  indexOfLastNumber = indexOfNumbers;
                  console.log('indexOfLastNumber', indexOfLastNumber);
                  console.log('index of winning board', current[0]);
                  let lastNumber = numbers[indexOfLastNumber];
                  console.log(lastNumber);
                  return lastNumber;
              }
            }
          }
        }
      }
    }
  }
}

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
      if (numbers.includes(winningBoard[i][j].toString()) == false) {
        sumOfUnmarkedNumbers+=parseInt(winningBoard[i][j]);
        console.log(sumOfUnmarkedNumbers);
      }
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
  // getResult('day4TestInput.txt'); // 24 * 188 = 4512
  getResult('day4Input.txt'); // 96 * 188 = 63552
}

run();
