// parse input
// iterate through array
// count brackets of each type
// presence of unmatched opening bracket = incomplete
// presence of unmatched closing bracket = corrupted

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

function checkBrackets(fileName) {
    const bracketArray = readInput(fileName);
    const illegalCharacters = [];
    bracketArray.forEach(line => {
        let bracketObject = {
            '\(' : 0,
            '\)' : 0,
            '\[' : 0,
            '\]' : 0,
            '\{' : 0,
            '\}' : 0,
            '\<' : 0,
            '\>' : 0
        };
        // iterate through characters
        for (let i in line) {
            // console.log(line[i]);
            bracketObject[line[i]]++;
            console.log(bracketObject);
            if (bracketObject['\)'] > bracketObject['\(']) {
                illegalCharacters.push('\)');
                // return;
            }
            if (bracketObject['\]'] > bracketObject['\[']) {
                illegalCharacters.push('\]');
                // return;
            }
            if (bracketObject['\}'] > bracketObject['\{']) {
                illegalCharacters.push('\}');
                // return;
            }
            if (bracketObject['\>'] > bracketObject['\<']) {
                illegalCharacters.push('\>');
                // return;
            }
        }
        console.log(bracketObject);
    });
    console.log(illegalCharacters);
}

function runTests(fileName) {
    readInput(fileName);
    checkBrackets(fileName);
}

runTests('day10TestInput.txt');