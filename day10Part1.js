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
    const bracketArray = readInput(fileName); // I should not have named it this
    const illegalCharacters = [];
    let matchingBracketObject = {
            '\(' : '\)',
            '\[' : '\]',
            '\{' : '\}',
            '\<' : '\>'
        };
    bracketArray.forEach(line => {
        // let bracketObject = {
        //     '\(' : 0,
        //     '\)' : 0,
        //     '\[' : 0,
        //     '\]' : 0,
        //     '\{' : 0,
        //     '\}' : 0,
        //     '\<' : 0,
        //     '\>' : 0
        // };
        let bracketQueue = [];
        // iterate through characters
        for (let i in line) {
            console.log('line[i]', line[i]);
            // bracketObject[line[i]]++;
            // console.log(bracketObject);

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
            // (might be best to use push/pop)

            if (line[i] === '\{' || line[i] === '\(' || line[i] === '\<' || line[i] === '\[') {
                bracketQueue.push(line[i]);
                console.log('bracketQueue', bracketQueue);
            } else {
                // current bracket is not an opening bracket, so check it matches the last opening bracket
                const lastOpeningBracket = bracketQueue.pop();
                if (matchingBracketObject[lastOpeningBracket] !== line[i]) {
                    illegalCharacters.push(line[i]);
                    // illegalCharacters.push('end of line', line);
                    return;
                } else {
                    // current bracket is not an opening bracket, but matches the last opening bracket
                    // bracketQueue.push(lastOpeningBracket, line[i]); // pushing lastOpeningBracket back because I already popped it // commenting this out - I wasn't supposed to do this
                }
            }
        }
        // console.log(bracketObject);
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
// runTests('day10TestInput2.txt'); // 1197
// runTests('day10TestInput3.txt'); // 25127