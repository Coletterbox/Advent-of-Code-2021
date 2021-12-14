// 594 * 9 = 5346
// TODO: fix indentation

const { get } = require('http');

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

  function getLosingBoard(fileName) {
    const indexOfLosingBoard = checkNumbers(fileName);
    const boardArray = getBoards(fileName);
    const losingBoard = boardArray[indexOfLosingBoard];
    console.log('losingBoard:', losingBoard);
    return losingBoard;
  }

  // because I can't be bothered to troubleshoot the existing code
  function getAnswerToSecondPart(fileName) {
    const losingBoard = getLosingBoard(fileName);
    const numbers = getNumbers(fileName).split(',');

    const boards = [losingBoard];
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
                    // console.log('index of winning board', current[0]); // doesn't apply anymore since it's been replaced with a single board
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
    // const boards = [getLosingBoard(fileName)];
    let markerArray = [];
    let indexOfLastNumber = 0;
    let winningBoardIndexes = [];
  
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
                    //   console.log('indexOfLastNumber', indexOfLastNumber);
                    //   console.log('index of winning board', current[0]);
  
                      winningBoardIndexes.push(current[0]); // this is the index of the winning board
                }
              }
            }
          }
        }
      }
    }
    // console.log(winningBoardIndexes);
    let filteredIndexes = [...new Set(winningBoardIndexes)];
    console.log(filteredIndexes);
    console.log('losing board:', filteredIndexes[filteredIndexes.length-1]);
    return filteredIndexes[filteredIndexes.length-1];
  }

  // yeah, idc
  function checkNumbers2(fileName) {
    let numbers = getNumbers(fileName);
    numbers = numbers.split(',');
    // const boards = getBoards(fileName);
    const boards = [getLosingBoard(fileName)];
    let markerArray = [];
    let indexOfLastNumber = 0;
    let winningBoardIndexes = [];
  
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
                    //   console.log('indexOfLastNumber', indexOfLastNumber);
                    //   console.log('index of winning board', current[0]);
  
                      winningBoardIndexes.push(current[0]); // this is the index of the winning board
                }
              }
            }
          }
        }
      }
    }
    // console.log(winningBoardIndexes);
    let filteredIndexes = [...new Set(winningBoardIndexes)];
    console.log(filteredIndexes);
    console.log('losing board:', filteredIndexes[filteredIndexes.length-1]);
    return filteredIndexes[filteredIndexes.length-1];
  }
  
  // this is the same thing copied and pasted but returning different things; I'm tired
  function getFinalNumber(fileName) {
    let numbers = getNumbers(fileName);
    numbers = numbers.split(',');
    // const boards = getBoards(fileName);
    const boards = [getLosingBoard(fileName)];
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
                    // console.log('index of winning board', current[0]); // doesn't apply anymore since it's been replaced with a single board
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
  
  // I'm not cleaning these up
  let sumOfUnmarkedNumbers = 0;
  function findSumOfUnmarkedNumbers(fileName) {
    // (of winning board)
    let numbers = getNumbers(fileName).split(',');
    numbers = numbers.slice(0, numbers.indexOf(getFinalNumber(fileName))+1);
    console.log(numbers);
    const boards = getBoards(fileName);
    const indexOfLosingBoard = checkNumbers(fileName);
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
  
  let sumOfUnmarkedNumbers2 = 0;
  function findSumOfUnmarkedNumbers2(fileName) {
    let numbers = getNumbers(fileName).split(',');
    numbers = numbers.slice(0, numbers.indexOf(getFinalNumber(fileName))+1);
    console.log(numbers);
    // const boards = getBoards(fileName);
    // const boards = getLosingBoard(fileName);
    // const indexOfLosingBoard = checkNumbers(fileName);
    // let winningBoard = boards[indexOfWinningBoard]; // winning board as two-dimensional array
    let losingBoard = getLosingBoard(fileName);
    for (let i = 0; i < losingBoard.length; i++) {
      for (let j = 0; j < losingBoard[i].length; j++) {
        if (numbers.includes(losingBoard[i][j].toString()) == false) {
          sumOfUnmarkedNumbers+=parseInt(losingBoard[i][j]);
          console.log(sumOfUnmarkedNumbers);
        }
      }
    }
    console.log('sumOfUnmarkedNumbers', sumOfUnmarkedNumbers);
    return sumOfUnmarkedNumbers;
  }

  function run() {
    // getResult('day4TestInput.txt'); // 4512 for part 1
    // getResult('day4Input.txt'); // 63552 for part 1

    // checkNumbers('day4TestInput.txt'); // 1
    // checkNumbers('day4Input.txt'); // 54

    // getFinalNumber('day4TestInput.txt');

    // findSumOfUnmarkedNumbers('day4TestInput.txt');
    // findSumOfUnmarkedNumbers('day4Input.txt'); // 932

    // getLosingBoard('day4TestInput.txt'); // this works
    // getFinalNumber('day4TestInput.txt'); // this doesn't work

    // checkNumbers2('day4TestInput.txt');
    // findSumOfUnmarkedNumbers2('day4TestInput.txt');
    // getFinalNumber('day4TestInput.txt');

    getLosingBoard('day4Input.txt');
    // losingBoard: [
    //     [ '7', '83', '51', '95', '98' ],
    //     [ '56', '93', '62', '85', '9' ],
    //     [ '72', '14', '44', '70', '67' ],
    //     [ '42', '4', '65', '37', '54' ],
    //     [ '47', '82', '1', '60', '55' ]
    //   ]
    // losingBoard: [
    //     [ '7', '83', '51', 000, 000 ],
    //     [ '56', 000, 000,  000,  000 ],
    //     [ '72', '14', '44', '70', 000 ],
    //     [ 000, '4',  000,  '37',  000 ],
    //     [ 000, 000, '1', '60', 000 ]
    //   ]
    // 85,84,30,15,46,71,64,45,13,90,63,89,62,25,87,68,73,47,65,78,2,27,67,95,88,99,96,17,42,31,91,98,57,28,38,93,43,0,55,49,22,24,82,54,59,52,3,26,9

    // getAnswerToSecondPart('day4TestInput.txt');
    // getAnswerToSecondPart('day4Input.txt');
  }
  
  run();
  