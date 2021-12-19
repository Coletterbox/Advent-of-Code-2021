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

            // ---

            // if (bracketObject['\)'] > bracketObject['\(']) {
            //     illegalCharacters.push('\)');
            // }
            // if (bracketObject['\]'] > bracketObject['\[']) {
            //     illegalCharacters.push('\]');
            // }
            // if (bracketObject['\}'] > bracketObject['\{']) {
            //     illegalCharacters.push('\}');
            // }
            // if (bracketObject['\>'] > bracketObject['\<']) {
            //     illegalCharacters.push('\>');
            // }

            // ---

            // new logic:
            // iterate through brackets; tally
            // if closing bracket appears while other kinds of opening brackets have still not been matched, add to illegal characters
            // if ((bracketObject[line[i]] === '\)')
            // && ((bracketObject['\['] > bracketObject['\]']) || (bracketObject['\{'] > bracketObject['\}']) || (bracketObject['\<'] > bracketObject['\>']))) {
            //     illegalCharacters.push('\)');
            // }

            // ---

            // new logic:
            // for each opening bracket, add to queue of brackets that need matching
            // for each closing bracket, deque - if the next to deque is not matching, add to illegal characters
        }
        console.log(bracketObject);
    });
    console.log(illegalCharacters);
}

function runTests(fileName) {
    readInput(fileName);
    checkBrackets(fileName);
}

// runTests('day10TestInput.txt');
runTests('day10TestInput2.txt');