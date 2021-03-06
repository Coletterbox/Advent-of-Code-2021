// convert input to {daysUntilBirth : quantity} object
// incrementing the days passed needs to change the quantity field so it's in the next number down (except for 0, which becomes 6, and then adds its quantity to 9 (or 8 if I change the order of things))
// .countLanternfish() needs to tally up the quantities

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

function convertArrayToObject(fileName) {
    const quantities = {9:0, 8:0, 7:0, 6:0, 5:0, 4:0, 3:0, 2:0, 1:0, 0:0};
    const lanternfishArray = readInput(fileName);
    lanternfishArray.forEach(element => {
        quantities[element]++;
    });
    console.log(quantities);
    return quantities;
}

function incrementOneDay(inputArrayObject) {
    let lanternfishArrayObject = inputArrayObject;
    // for (let i = 9; i >= 0; i--) { // so it specifically goes downwards // nvm we don't want that
    for (let i = 0; i <= 10; i++) {
        if (i === 0) {
            // lanternfishArrayObject['9'] = 'test';
            let value = lanternfishArrayObject['0'];
            lanternfishArrayObject['9'] = value;
            lanternfishArrayObject['7']+=value; // since it immediately decrements
        } else {
            lanternfishArrayObject[(i-1).toString()] = lanternfishArrayObject[i.toString()];
        }
    }
    lanternfishArrayObject['9'] = 0;
    console.log(lanternfishArrayObject);
    return lanternfishArrayObject;
}

function incrementDays(fileName, numberOfDays) {
    let resultArrayObject = convertArrayToObject(fileName);
    for (let i = 0; i < numberOfDays; i++) {
        resultArrayObject = incrementOneDay(resultArrayObject);
    }
    console.log(resultArrayObject);
    return resultArrayObject;
}

function countLanternfish(fileName, numberOfDays) {
    const object = incrementDays(fileName, numberOfDays);
    return Object.values(object).reduce((a, b) => a + b);
}

function run(fileName) {
    // console.log(readInput('day6TestInput.txt'));
    console.log(convertArrayToObject('day6TestInput.txt'));
    let inputArrayObject = {
        '0': 0,
        '1': 1,
        '2': 1,
        '3': 2,
        '4': 1,
        '5': 0,
        '6': 0,
        '7': 0,
        '8': 0,
        '9': 0
    };
    incrementOneDay(inputArrayObject);
    let inputArrayObject2 = {
        '0': 1,
        '1': 1,
        '2': 2,
        '3': 1,
        '4': 0,
        '5': 0,
        '6': 0,
        '7': 0,
        '8': 0,
        '9': 0
    };
    incrementOneDay(inputArrayObject2);
    let inputArrayObject3 = {
        '0': 1,
        '1': 2,
        '2': 1,
        '3': 0,
        '4': 0,
        '5': 0,
        '6': 0,
        '7': 0,
        '8': 1,
        '9': 0
    }
    incrementOneDay(inputArrayObject3);

    // console.log(incrementOneDay('34312')); // 23201
    // console.log(getArrayAsString('day6TestInput.txt')); // 34312
    // console.log(incrementOneDay('23201')); // 121608
    // console.log(incrementDays('day6TestInput.txt', 18)); // 60645601126011122334678888
    // console.log(countLanternfish('day6TestInput.txt', 2)); // 6
    
    // console.log(countLanternfish('day6TestInput.txt', 18)); // 26
    // console.log(countLanternfish('day6TestInput.txt', 80)); // 5934
    // console.log(countLanternfish('day6TestInput.txt', 256)); // 26984457539
    console.log(countLanternfish('day6Input.txt', 256)); // 1721148811504
}

run();