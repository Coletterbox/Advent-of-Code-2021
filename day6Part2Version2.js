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

const quantities = {0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0};
function convertArrayToObject(fileName) {
    const lanternfishArray = readInput(fileName);
    lanternfishArray.forEach(element => {
        console.log(typeof element);
        // element = parseInt(element);
        // for quantities, increment where the key = element
        for (let [days, quantity] of Object.entries(quantities)) {
            console.log(typeof days);
            console.log(days, element.toString());
            if (days === element.toString()) {
                console.log('yes');
                console.log(quantity);
                console.log(typeof quantity);
                // quantity = 'test';
                quantity++;
                // idk why this doesn't work
                console.log('updated quantity:', quantity);
                console.log('updated quantities:', quantities);
            }
        }
    });
    console.log(quantities);
}

// function getArrayAsString(fileName) {
//     console.log(typeof readInput(fileName).join(''));
//     return readInput(fileName).join('');
// }

// function replaceCharacter(string, index, newCharacter) {
//     let stringArray = string.split('');
//     stringArray[index] = newCharacter;
//     return stringArray.join('');
// }

function incrementOneDay(inputArrayString) {
    // let lanternfishArrayString = inputArrayString;
    // for (let i = 0; i < lanternfishArrayString.length; i++) {
    //     if (lanternfishArrayString.charAt(i) === '0') {
    //         lanternfishArrayString = replaceCharacter(lanternfishArrayString, i, '6');
    //         // taking into account that it will be decremented
    //         lanternfishArrayString = lanternfishArrayString.concat('9');
    //     } else {
    //         lanternfishArrayString = replaceCharacter(lanternfishArrayString, i, (parseInt(lanternfishArrayString.charAt(i)) - 1).toString());
    //     }
    // }
    // return lanternfishArrayString;
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
    // console.log(readInput('day6TestInput.txt'));
    console.log(convertArrayToObject('day6TestInput.txt'));

    // console.log(incrementOneDay('34312')); // 23201
    // console.log(getArrayAsString('day6TestInput.txt')); // 34312
    // console.log(incrementOneDay('23201')); // 121608
    // console.log(incrementDays('day6TestInput.txt', 18)); // 60645601126011122334678888
    // console.log(countLanternfish('day6TestInput.txt', 18)); // 26
    // console.log(countLanternfish('day6TestInput.txt', 256));
    // console.log(countLanternfish('day6Input.txt', 80));
}

run();