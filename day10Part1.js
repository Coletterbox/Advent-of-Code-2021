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
    const bracketArray = readInput(fileName); // I should not have named it this
    const illegalCharacters = [];
    let matchingBracketObject = {
            '\(' : '\)',
            '\[' : '\]',
            '\{' : '\}',
            '\<' : '\>'
        };
    bracketArray.forEach(line => {
        let bracketQueue = [];
        // iterate through characters
        for (let i in line) {
            // for each opening bracket, add to queue of brackets that need matching
            // for each closing bracket, deque - if the next to deque is not matching, add to illegal characters
            // (might be best to use push/pop)
            if (line[i] === '\{' || line[i] === '\(' || line[i] === '\<' || line[i] === '\[') {
                bracketQueue.push(line[i]);
                console.log('bracketQueue', bracketQueue);
            } else {
                // current bracket is not an opening bracket, so check it matches the last opening bracket
                const lastOpeningBracket = bracketQueue.pop();
                if (matchingBracketObject[lastOpeningBracket] !== line[i]) {
                    illegalCharacters.push(line[i]);
                    return;
                }
            }
        }
    });
    console.log(illegalCharacters);
    return illegalCharacters;
}

function addUpScore(fileName) {
    const illegalCharacters = checkBrackets(fileName);
    const scores = {
        '\)' : 3,
        '\]' : 57,
        '\}' : 1197,
        '\>' : 25137
    };
    let totalScore = 0;
    illegalCharacters.forEach(character => {
        totalScore+=scores[character];
    });
    return totalScore;
}

function runTests(fileName) {
    readInput(fileName);
    checkBrackets(fileName);
    console.log(addUpScore(fileName));
}

// runTests('day10TestInput.txt'); // 26397
runTests('day10Input.txt'); // 394647