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

function getArrayAsString(fileName) {
    console.log(typeof readInput(fileName).join(''));
    return readInput(fileName).join('');
}

function replaceCharacter(string, index, newCharacter) {
    let stringArray = string.split('');
    stringArray[index] = newCharacter;
    return stringArray.join('');
}

function incrementOneDay(inputArrayString) {
    let lanternfishArrayString = inputArrayString;
    for (let i = 0; i < lanternfishArrayString.length; i++) {
        if (lanternfishArrayString.charAt(i) === '0') {
            // lanternfishArrayString.charAt(i) = '6';
            lanternfishArrayString = replaceCharacter(lanternfishArrayString, i, '6');
            // taking into account that it will be decremented
            lanternfishArrayString = lanternfishArrayString.concat('9');
        } else {
            // lanternfishArrayString.charAt(i) = (parseInt(lanternfishArrayString.charAt(i)) - 1).toString();
            lanternfishArrayString = replaceCharacter(lanternfishArrayString, i, (parseInt(lanternfishArrayString.charAt(i)) - 1).toString());
            // console.log((parseInt(lanternfishArrayString.charAt(i)) - 1).toString());
        }
    }
    return lanternfishArrayString;
}

function incrementDays(fileName, numberOfDays) {
    let resultArrayString = getArrayAsString(fileName);
    for (let i = 0; i < numberOfDays; i++) {
        resultArrayString = incrementOneDay(resultArrayString);
    }
    console.log(resultArrayString);
    return resultArrayString;
}

function countLanternfish(fileName, numberOfDays) {
    return incrementDays(fileName, numberOfDays).length;
}

function run(fileName) {
    // console.log(incrementOneDay('34312')); // 23201
    // console.log(getArrayAsString('day6TestInput.txt')); // 34312
    // console.log(incrementOneDay('23201')); // 121608
    // console.log(incrementDays('day6TestInput.txt', 18)); // 60645601126011122334678888
    // console.log(countLanternfish('day6TestInput.txt', 18)); // 26
    console.log(countLanternfish('day6TestInput.txt', 256));
    // console.log(countLanternfish('day6Input.txt', 80));
}

run();