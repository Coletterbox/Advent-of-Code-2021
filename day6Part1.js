// parse input
// increment days
    // all numbers decrement (except 0, which becomes 6 - also adds an 8)
// count array

function readInput(fileName) {
    const fs = require('fs');
    let data = [];

    try {
        data = fs.readFileSync(fileName, 'UTF-8').split(',');
    } catch (err) {
        console.error(err);
    }

    // data.forEach(el => {
    //     // parseInt(el);
    //     el = parseInt(el);
    //     console.log(el);
    // });

    for (let i = 0; i < data.length; i++) {
        data[i] = parseInt(data[i]);
    }
  
    console.log('data:', data);
    return data;
}

// function incrementOneDay(fileName) {
function incrementOneDay(inputArray) {
    // let lanternfishArray = readInput(fileName);
    let lanternfishArray = inputArray;
    for (let i = 0; i < lanternfishArray.length; i++) {
        if (lanternfishArray[i] === 0) {
            lanternfishArray[i] = 6;
            // taking into account that it will be decremented
            lanternfishArray.push(9);
        } else {
            lanternfishArray[i]--;
        }
    }
    return lanternfishArray;
}

function incrementDays(fileName, numberOfDays) {
    let resultArray = readInput(fileName);
    for (let i = 0; i < numberOfDays; i++) {
        incrementOneDay(resultArray);
    }
    console.log(resultArray);
    return resultArray;
}

function countLanternfish(fileName, numberOfDays) {
    return incrementDays(fileName, numberOfDays).length;
}

function run(fileName) {
    // readInput('day6TestInput.txt');
    // readInput('day6Input.txt');
    // incrementDays('day6TestInput.txt', 18);
    console.log(countLanternfish('day6TestInput.txt', 18)); // 26
    console.log(countLanternfish('day6TestInput.txt', 80)); // 5934
    console.log(countLanternfish('day6Input.txt', 80)); // 383160

    console.log(countLanternfish('day6TestInput.txt', 2)); // 6
}

run();