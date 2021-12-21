// parse input
// (separate function for incrementing adjacent octopuses (i.e. function that gets adjacent octopuses and calls the increment by 1 function on them) - call in next step)
// increment one day function - calls increment by 1 function
// increment by 1
    // if less than 9, increase by 1
    // if 9, become 0; increment flashes; increment adjacent octopuses (i.e. call function)
// function that takes days as parameter; increments days; returns flashes

function readInput(fileName) {
    const fs = require('fs');
    const inputArray = [];
  
    try {
      const data = fs.readFileSync(fileName, 'UTF-8');
      const lines = data.split(/\r?\n/);
  
      lines.forEach((line) => {
        inputArray.push(line.split(''));
      });
    } catch (err) {
      console.error(err);
    }

    // inputArray.forEach(line => {
    //     line.forEach(number => {
    //         number = parseInt(number);
    //     });
    // });

    for (let i = 0; i < inputArray.length; i++) {
        for (let j = 0; j < inputArray[i].length; j++) {
            inputArray[i][j] = parseInt(inputArray[i][j]);
        }
    }
  
    console.log(inputArray);
    return inputArray;
}

// takes ints
function getAdjacentCoordinates(i, j) {
    let adjacentCoordinates = [];
    let validIndexes = [];

    // writing it out like this for readability
    adjacentCoordinates.push((i-1).toString() + ',' + j.toString());
    adjacentCoordinates.push((i+1).toString() + ',' + j.toString());
    adjacentCoordinates.push(i.toString() + ',' + (j-1).toString());
    adjacentCoordinates.push(i.toString() + ',' + (j+1).toString());
    adjacentCoordinates.forEach(point => {
        if (!point.includes('-') && !point.includes('10')) {
            validIndexes.push(point);
        }
    });
    console.log(validIndexes);
    return validIndexes;
}

// takes ints
// function incrementPoint(fileName, i, j, flashCount) {
//     let inputArray = readInput(fileName);
function incrementPoint(inputArray, i, j, flashCount) {
    let adjacentCoordinates = getAdjacentCoordinates(i, j);
    console.log(adjacentCoordinates);

    if (inputArray[i][j] < 9) {
        inputArray[i][j]++;
    } else {
        inputArray[i][j] = 0;
        flashCount++;
        adjacentCoordinates.forEach(coordinates => {
            let coordinateArray = coordinates.split(',');
            let newI = parseInt(coordinateArray[0]);
            let newJ = parseInt(coordinateArray[1]);
            console.log('newI, newJ', newI, newJ);
            incrementPoint(inputArray, newI, newJ, flashCount);
        });
    }
    console.log(inputArray);
    console.log('current flash count:', flashCount);
}

function incrementDay(fileName, inputArray, flashCount) {
    for (let i = 0; i < inputArray.length; i++) {
        for (let j = 0; j < inputArray[i].length; j++) {
            incrementPoint(inputArray, i, j, flashCount);
        }
    }
    console.log(flashCount);
}

// "days" is supposed to be steps
function incrementDays(fileName, flashCount, days) {
    const inputArray = readInput(fileName);

    for (let i = 0; i < days; i++) {
        incrementDay(fileName, inputArray, flashCount);
    }
    
    console.log(flashCount);
}

function runTests() {
    // readInput('day11TestInput.txt');

    // getAdjacentCoordinates(0, 0);
    // getAdjacentCoordinates(0, 9);
    // getAdjacentCoordinates(9, 0);
    // getAdjacentCoordinates(9, 9);
    // getAdjacentCoordinates(9, 5);
    // getAdjacentCoordinates(3, 2);
    // getAdjacentCoordinates(6, 7);

    // incrementPoint('day11TestInput.txt', 0, 1, 0);
    // incrementDay('day11TestInput.txt', 0);
    // incrementDays('day11TestInput.txt', 0, 10);

    // incrementDay('day11TestInput2.txt', 0);
    // incrementPoint('day11TestInput2.txt', 0, 0, 0);
    // incrementPoint(readInput('day11TestInput2.txt'), 1, 1, 0);

    incrementDay('day11TestInput.txt', readInput('day11TestInput.txt'), 0)
}

runTests();