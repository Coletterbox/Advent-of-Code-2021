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
    const incompleteLines = [];
    const corruptedLines = [];
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
                // console.log('bracketQueue', bracketQueue);
            } else {
                // current bracket is not an opening bracket, so check it matches the last opening bracket
                const lastOpeningBracket = bracketQueue.pop();
                if (matchingBracketObject[lastOpeningBracket] !== line[i]) {
                    corruptedLines.push(line);
                    illegalCharacters.push(line[i]);
                    return;
                }
            }
        }
    });
    bracketArray.forEach(line => {
        if (!corruptedLines.includes(line)) {
            incompleteLines.push(line);
        }
    });
    console.log('incompleteLines', incompleteLines);
    return incompleteLines;
}

function completeLines(fileName) {
    const incompleteLines = checkBrackets(fileName);
    let endsOfLines = [];
    let matchingBracketObject = {
        '\(' : '\)',
        '\[' : '\]',
        '\{' : '\}',
        '\<' : '\>'
    };
    incompleteLines.forEach(line => {
        let bracketQueue = [];
        let endOfLine = [];
        // iterate through characters
        for (let i in line) {
            // for each opening bracket, add to queue of brackets that need matching
            // for each closing bracket, deque - if the next to deque is not matching, add to illegal characters
            // (might be best to use push/pop)
            if (line[i] === '\{' || line[i] === '\(' || line[i] === '\<' || line[i] === '\[') {
                bracketQueue.push(line[i]);
                // console.log('bracketQueue', bracketQueue);
            } else {
                // current bracket is not an opening bracket, so check it matches the last opening bracket
                const lastOpeningBracket = bracketQueue.pop();
                if (matchingBracketObject[lastOpeningBracket] !== line[i]) {
                    corruptedLines.push(line);
                    illegalCharacters.push(line[i]);
                    return;
                }
            }
        }
        while (bracketQueue.length > 0) {
            const lastBracket = bracketQueue.pop();
            endOfLine.push(matchingBracketObject[lastBracket]);
        }
        endsOfLines.push(endOfLine);
    });
    console.log(endsOfLines);
    return endsOfLines;
}

function addUpScore(fileName) {
    const endsOfLines = completeLines(fileName);
    const scores = {
        '\)' : 1,
        '\]' : 2,
        '\}' : 3,
        '\>' : 4
    };
    let totalScores = [];
    endsOfLines.forEach(line => {
        let totalScore = 0;
        line.forEach(character => {
            totalScore = totalScore*5;
            totalScore+=scores[character];
        });
        totalScores.push(totalScore);
    });
    return totalScores;
}

function runTests(fileName) {
    // readInput(fileName);
    // checkBrackets(fileName);
    completeLines(fileName);
    console.log(addUpScore(fileName));
}

runTests('day10TestInput.txt');
// runTests('day10Input.txt');