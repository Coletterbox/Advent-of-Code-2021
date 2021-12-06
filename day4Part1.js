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

function getNumbers(fileName) {
  let inputArray = readInput(fileName);
  console.log(inputArray[0]);
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

  console.log('boardArray:', boardArray);
  console.log('newBoardArray:', newBoardArray);

  for (let i = 0; i < newBoardArray.length; i++) {
    for (let j = 0; j < newBoardArray[i].length; j++) {
      console.log('newBoardArray[i][j]', newBoardArray[i][j]);
      newBoardArray2.push(newBoardArray[i][j].split(' ').filter(el => {return el != null && el != ''}));
    }
  }

  console.log('newBoardArray2:', newBoardArray2);

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
      console.log(newBoardArray3[newArrayIndex]);
    }
  }

  console.log('newBoardArray3:', newBoardArray3);

  return newBoardArray3;
}

function createMarkerArray(fileName) {
  let markerArray = [];
  let boardArray = getBoards(fileName);
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


function run() {
  getNumbers('day4TestInput.txt');
  getBoards('day4TestInput.txt');
}

run();
