// parse input
// find max X and Y; create 2D array for lines (populate with 0s)
// only consider horizontal and vertical lines, i.e. Xs are equal or Ys are equal
// increment relevant array items (plot lines)
// count array items that are over 1

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
  
    console.log(inputArray);
    return inputArray;
}

function parseInput(fileName) {
    const inputArray = readInput(fileName);
    let resultArray = [];
    // let resultArray2 = [];
    inputArray.forEach(element => {
        resultArray.push(element.split(' -> '));
    });

    console.log('resultArray:', resultArray);
    // resultArray.forEach(element => {
    //     element = [element[0].split(','), element[1].split(',')];
    //     resultArray2.push(element);
    //     // resultArray2.push([element[0].split(','), element[1].split(',')]);
    // });

    // for (let i = 0; i < resultArray2.length; i++) {
    //     for (let j = 0; j < resultArray2[i].length; j++) {
    //         resultArray2[i][j] = parseInt(resultArray2[i][j]);
    //         // console.log(resultArray2[i][j]);
    //     }
    // }

    // console.log('resultArray2:', resultArray2);
    // return resultArray2;
    return resultArray;
}

function createBoard(fileName) {
    let maxX = 0;
    let maxY = 0;
    let xArray = [];
    let yArray = [];
    let inputArray = parseInput(fileName);
    let resultArray = [];
    for (let i = 0; i < inputArray.length; i++) {
        let x0 = inputArray[i][0].split(',')[0];
        let x1 = inputArray[i][1].split(',')[0];
        xArray.push(parseInt(x0), parseInt(x1));
        let y0 = inputArray[i][0].split(',')[1];
        let y1 = inputArray[i][1].split(',')[1];
        yArray.push(parseInt(y0), parseInt(y1));
    }
    xArray.sort(function(a, b) {
        return a - b;
      });
    yArray.sort(function(a, b) {
        return a - b;
      });;
    console.log(xArray);
    console.log(yArray);
    maxX = xArray[xArray.length-1];
    maxY = yArray[yArray.length-1];
    console.log(maxX, maxY);
    // added the +1 to maxY and maxX because it seems like it's needed, but haven't fully thought it through
    for (let y = 0; y < maxY+1; y++) {
        resultArray[y] = [];
        for (let x = 0; x < maxX+1; x++) {
            resultArray[y][x] = 0;
        }
    }
    console.log(resultArray);
    return resultArray;
}

function getHorizontalLines(fileName) {
    const inputArray = parseInput(fileName);
    let horizontalLineArray = [];
    console.log(inputArray);
    for (let i = 0; i < inputArray.length; i++) {
        console.log(inputArray[i][0]);
        // if Y is equal
        if (inputArray[i][0].split(',')[1] === inputArray[i][1].split(',')[1]) {
            horizontalLineArray.push(inputArray[i]);
        }
    }
    console.log(horizontalLineArray);
    return horizontalLineArray;
}

// this is not THAT egregious a DRY violation; I'm tired
function getVerticalLines(fileName) {
    const inputArray = parseInput(fileName);
    let verticalLineArray = [];
    console.log(inputArray);
    for (let i = 0; i < inputArray.length; i++) {
        console.log(inputArray[i][0]);
        // if X is equal
        if (inputArray[i][0].split(',')[0] === inputArray[i][1].split(',')[0]) {
            verticalLineArray.push(inputArray[i]);
        }
    }
    console.log(verticalLineArray);
    return verticalLineArray;
}

function plotLines(fileName) {
    let board = createBoard(fileName);
    const verticalLines = getVerticalLines(fileName);
    const horizontalLines = getHorizontalLines(fileName);

    for (let i = 0; i < verticalLines.length; i++) {
        let x = parseInt(verticalLines[i][0].split(',')[0]);
        let startY = parseInt(verticalLines[i][0].split(',')[1]);
        let endY = parseInt(verticalLines[i][1].split(',')[1]);
        if (startY > endY) {
            let lowerY = endY;
            let higherY = startY;
            startY = lowerY;
            endY = higherY;
        }
        for (let j = startY; j <= endY; j++) {
            board[j][x]++;
        }
    }

    // [
    //     [ '0,9', '5,9' ],
    //     [ '9,4', '3,4' ],
    //     [ '0,9', '2,9' ],
    //     [ '3,4', '1,4' ]
    // ]
    for (let i = 0; i < horizontalLines.length; i++) {
        let startX = parseInt(horizontalLines[i][0].split(',')[0]);
        let endX = parseInt(horizontalLines[i][1].split(',')[0]);
        let y = parseInt(horizontalLines[i][0].split(',')[1]);
        console.log('y:', y);
        console.log(typeof startX); // omg screw you JavaScript
        if (parseInt(startX) > parseInt(endX)) {
            console.log('switching x orders');
            let lowerX = endX;
            let higherX = startX;
            startX = lowerX;
            endX = higherX;
        }
        console.log('startX, endX:', startX, endX);
        // console.log('board again:', board);
        for (let j = startX; j <= endX; j++) {
            console.log('typeof board[y][j]:', typeof board[y][j]);
            console.log(board[y]);
            board[y][j]++;
        }
    }
    console.log(board);
    return board;
}

function countOverlap(fileName) {
    let total = 0;
    const markedBoard = plotLines(fileName);
    // console.log('markedBoard:', markedBoard);
    for (let i = 0; i < markedBoard.length; i++) {
        // console.log('markedBoard[i]:', markedBoard[i]);
        // console.log('markedBoard[i].length:', markedBoard[i].length);
        for (let j = 0; j < markedBoard[i].length; j++) {
            if (parseInt(markedBoard[i][j]) > 1) {
                total++;
            }
        }
    }
    console.log('markedBoard:', markedBoard);
    console.log(total);
    return total;
}

function run(fileName) {
    // readInput(fileName);
    // parseInput(fileName);
    // createBoard(fileName);
    // getVerticalLines(fileName);
    // getHorizontalLines(fileName);
    // plotLines(fileName);
    countOverlap(fileName); // 5
}

// run('day5TestInput.txt'); // 5
// run('day5TestInput2.txt');
run('day5Input.txt'); // 5280
// run('day5TestInput4.txt');
// run('day5TestInput5.txt');