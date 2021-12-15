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
    const positions = readInput(fileName);
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
            let distance = Math.abs(range[i]-positions[j]);
            let fuelForLine = 0;
            for (let k = distance; k > 0; k--) {
                fuelForLine+=k;
            }
            fuel+=fuelForLine;
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
    // console.log(readInput('day7TestInput.txt'));
    // const testInputRangeArray = [
    //     0,  1,  2,  3,  4,  5,  6,
    //     7,  8,  9, 10, 11, 12, 13,
    //     14, 15, 16
    // ];
    // console.log(getRange('day7TestInput.txt'));
    // assert(compareArrays(testInputRangeArray, getRange('day7TestInput.txt')), "Range is incorrect.");
    assert.equal(168, iterateThroughRange('day7TestInput.txt'));
    // iterateThroughRange('day7Input.txt');
    // console.log(getRange('day7Input.txt'));
    assert.equal(93214037, iterateThroughRange('day7Input.txt'));
}

runTests();