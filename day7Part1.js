// parse input
// get range of numbers
// iterate through range
    // for each number in range, add up all differences (absolute values)
// get number with smallest total

function readInput(fileName) {
    const fs = require('fs');
    let data = [];

    try {
        data = fs.readFileSync(fileName, 'UTF-8').split(',');
    } catch (err) {
        console.error(err);
    }

    for (let i = 0; i < data.length; i++) {
        data[i] = parseInt(data[i]);
    }
  
    console.log('data:', data);
    return data;
}

function getRange(fileName) {
    const positions = readInput('day7TestInput.txt');
    let sorted = positions.sort(function(a, b) {return a-b});
    const lowest = sorted[0];
    const highest = sorted[sorted.length-1];
    let rangeArray = [];

    for (let i = lowest; i <= highest; i++) {
        rangeArray.push(i);
    }

    return rangeArray;
}

function iterateThroughRange(fileName) {
    const range = getRange(fileName);
    const positions = readInput(fileName);
    let fuelArray = [];
    for (let i = 0; i < range.length; i++) {
        let fuel = 0;
        for (let j = 0; j < positions.length; j++) {
            fuel+=Math.abs(range[i]-positions[j]);
        }
        fuelArray.push(fuel);
    }
    console.log(fuelArray);
    let sortedFuelArray = fuelArray.sort(function(a, b) {return a-b});
    return sortedFuelArray[0];
}

let assert = require('assert');

function compareArrays(array1, array2) {
	if (array1.length !== array2.length) return false;
	for (var i = 0; i < array1.length; i++) {
		if (array1[i] !== array2[i]) return false;
	}
	return true;
}

function runTests() {
    console.log(readInput('day7TestInput.txt'));
    const testInputRangeArray = [
        0,  1,  2,  3,  4,  5,  6,
        7,  8,  9, 10, 11, 12, 13,
        14, 15, 16
    ];
    console.log(getRange('day7TestInput.txt'));
    assert(compareArrays(testInputRangeArray, getRange('day7TestInput.txt')), "Range is incorrect.");
    assert.equal(37, iterateThroughRange('day7TestInput.txt'));
}

runTests();