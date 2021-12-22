// parse input
// (separate function for incrementing adjacent octopuses (i.e. function that gets adjacent octopuses and calls the increment by 1 function on them) - call in next step)
// increment one day function - calls increment by 1 function
// increment by 1
    // if less than 9, increase by 1
    // if 9, become 0; increment flashes; increment adjacent octopuses (i.e. call function)
// function that takes days as parameter; increments days; returns flashes

// ---

// (rewrote this to start again, but in the process realised that the issue was my definition of adjacent)

// one step:
// run increment function on every octopus

    // increment function:
    // increment
    // where energy level > 9
        // increment flashes
        // run increment function on adjacent

// set energy levels above 9 back to 0

// ---

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
    // diagonals that I didn't realise were included
    adjacentCoordinates.push((i-1).toString() + ',' + (j-1).toString());
    adjacentCoordinates.push((i-1).toString() + ',' + (j+1).toString());
    adjacentCoordinates.push((i+1).toString() + ',' + (j-1).toString());
    adjacentCoordinates.push((i+1).toString() + ',' + (j+1).toString());
    adjacentCoordinates.forEach(point => {
        if (!point.includes('-') && !point.includes('10')) {
            validIndexes.push(point);
        }
    });
    console.log(validIndexes);
    return validIndexes;
}

// 'increment' given point function (does other stuff)
// increment point unless 9
// 9s change to 0 (and increment flash count), plus 'increment' adjacent points

// takes ints
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

function step(inputArray, flashCount) {
    for (let i = 0; i < inputArray.length; i++) {
        for (let j = 0; j < inputArray[i].length; j++) {
            incrementPoint(inputArray, i, j, flashCount);
        }
    }
    console.log(flashCount);
}

// function incrementDay(fileName, inputArray, flashCount) {
//     for (let i = 0; i < inputArray.length; i++) {
//         for (let j = 0; j < inputArray[i].length; j++) {
//             incrementPoint(inputArray, i, j, flashCount);
//         }
//     }
//     console.log(flashCount);
// }

// // "days" is supposed to be steps
// function incrementDays(fileName, flashCount, days) {
//     const inputArray = readInput(fileName);

//     for (let i = 0; i < days; i++) {
//         incrementDay(fileName, inputArray, flashCount);
//     }
    
//     console.log(flashCount);
// }

function runTests() {
    // readInput('day11TestInput.txt');

    // getAdjacentCoordinates(0, 0);
    // getAdjacentCoordinates(0, 9);
    // getAdjacentCoordinates(9, 0);
    // getAdjacentCoordinates(9, 9);
    // getAdjacentCoordinates(9, 5);
    // getAdjacentCoordinates(3, 2);
    // getAdjacentCoordinates(6, 7);

    // let inputArray = [[0, 0, 0, 0, 0],
    //     [0, 0, 0, 0, 0],
    //     [0, 0, 0, 0, 0],
    //     [0, 0, 0, 0, 0],
    //     [0, 0, 0, 0, 0]];
    // incrementPoint(inputArray, 0, 0, 0);
    // let inputArray2 = [[0, 0, 0, 0, 0],
    //     [0, 0, 9, 0, 0],
    //     [0, 0, 9, 0, 0],
    //     [0, 0, 0, 0, 0],
    //     [0, 0, 0, 0, 0]];
    // incrementPoint(inputArray2, 2, 2, 0);
    let inputArray3 = [[1, 1, 1, 1, 1],
        [1, 9, 9, 9, 1],
        [1, 9, 1, 9, 1],
        [1, 9, 9, 9, 1],
        [1, 1, 1, 1, 1]];
    // incrementPoint(inputArray3, 2, 2, 0);
    step(inputArray3, 0);
}

runTests();