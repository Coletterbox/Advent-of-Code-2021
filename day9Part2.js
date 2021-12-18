// parse input
// iterate through array
    // starting where i and j are 1, and stopping where i is array.length-2 and j is array[i].length-2
        // check 4 adjacent numbers
    // do edges and corners
    // alternatively, pad edges? idk what's cleaner
    // or maybe just catch index out of bounds exception?
// have separate function to calculate risk level
// sum risk levels

// part 2 - basins
// go back to part 1 and log indexes of low points
// have array of visited points
// (call on low points) separate function to get adjacent points - if point < 9, log indexes and call same function

// or just log adjacent points that are less than 9 and then remove doubles?
// maybe write that function that pads the outsides with 9s so I don't have to read that horrible mess from part 1

// ---
// function to pad edges with 9s
// function to log adjacent points that are less than 9
// call this function on low points and aforementioned adjacent points
// remove doubles
// count
// add to array of basin sizes

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

function padEdges(fileName) {
    const inputArray = readInput(fileName);
    let paddedArray = [];
    let stringOfNines = '';
    for (let i = 1; i <= inputArray[0].length+2; i++) {
        stringOfNines+='9';
    }
    paddedArray.push(stringOfNines);
    for (let i = 0; i < inputArray.length; i++) {
        paddedArray.push('9' + inputArray[i] + '9');
    }
    paddedArray.push(stringOfNines);

    return paddedArray;
}

function findLowPoints(fileName) {
    const inputArray = padEdges(fileName);
    let lowPoints = [];
    let lowPointCoordinates = []; // y, then x

    for (let i = 1; i < inputArray.length-1; i++) {
        for (let j = 1; j < inputArray[i].length-1; j++) {
            if (inputArray[i][j] < inputArray[i-1][j]
                && inputArray[i][j] < inputArray[i+1][j]
                && inputArray[i][j] < inputArray[i][j-1]
                && inputArray[i][j] < inputArray[i][j+1]) {
                    lowPoints.push(inputArray[i][j]);
                    lowPointCoordinates.push(i+j);
                }
        }
    }
    console.log(lowPoints);
    return lowPoints;
}

function findLowPointCoordinates(fileName) {
    const inputArray = padEdges(fileName);
    let lowPointCoordinates = []; // y, then x // relative to padded array

    for (let i = 1; i < inputArray.length-1; i++) {
        for (let j = 1; j < inputArray[i].length-1; j++) {
            if (inputArray[i][j] < inputArray[i-1][j]
                && inputArray[i][j] < inputArray[i+1][j]
                && inputArray[i][j] < inputArray[i][j-1]
                && inputArray[i][j] < inputArray[i][j+1]) {
                    lowPointCoordinates.push(i + ',' + j);
                }
        }
    }
    console.log(lowPointCoordinates);
    return lowPointCoordinates;
}

// this won't actually stop searching at 9 - do later // or will it?
function findAdjacentPoints(point, pointsArray, fileName) {
    const inputArray = padEdges(fileName);
    let coordinates = point.split(',');
    let i = coordinates[0];
    let j = coordinates[1];
    let newPointsArray = pointsArray;
    if (i < 0 || i >= inputArray.length || j < 0 || j < inputArray[0].length) {
        console.log('1');
        console.log(newPointsArray);
        return;
    }
    if (inputArray[i][j] < '9') {
        console.log('2');
        newPointsArray.push(i + ',' + j);
    }
    if (inputArray[i-1][j] < '9') {
        console.log('3');
        // these rely on type coercion, so double check
        let point = (i-1).toString() + ',' + j;
        newPointsArray.push(point);
        findAdjacentPoints(point, newPointsArray);
    }
    if (inputArray[i+1][j] < '9') {
        console.log('4');
        let point = (i+1).toString() + ',' + j;
        newPointsArray.push(point);
        findAdjacentPoints(point, newPointsArray);
    }
    if (inputArray[i][j+1] < '9') {
        console.log('5');
        let point = i + ',' + (j+1).toString();
        newPointsArray.push(point);
        findAdjacentPoints(point, newPointsArray);
    }
    if (inputArray[i][j-1] < '9') {
        console.log('6');
        let point = i + ',' + (j-1).toString();
        newPointsArray.push(point);
        findAdjacentPoints(point, newPointsArray);
    }
}

function calculateRiskLevel(fileName) {
    const lowPoints = findLowPoints(fileName);
    let riskLevel = 0;
    for (let i = 0; i < lowPoints.length; i++) {
        riskLevel+=(parseInt(lowPoints[i])+1);
    }
    console.log(riskLevel);
    return riskLevel;
}

function run() {
    // readInput('day9TestInput.txt');
    // findLowPoints('day9TestInput.txt');
    // findLowPoints('day9TestInput2.txt');
    // findLowPoints('day9TestInput3.txt');
    // calculateRiskLevel('day9TestInput.txt'); // 15
    // calculateRiskLevel('day9Input.txt'); // 506
    // console.log(padEdges('day9TestInput.txt'));
    findLowPointCoordinates('day9TestInput.txt');
    findAdjacentPoints('1,2', padEdges('day9TestInput.txt'), 'day9TestInput.txt');
}

run();