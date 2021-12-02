// // // npm install node-fetch
// //
// import fetch from 'node-fetch';
// // const fetch = require('node-fetch');
//
// // function readInput() {
// //   fetch('day1Input1.txt')
// //     .then(response => response.text())
// //     .then(text => console.log(text));
// // }
//

function readInput() {
  const fs = require('fs');

  try {
    const data = fs.readFileSync('day1Input.txt', 'UTF-8');
    const lines = data.split(/\r?\n/);

    lines.forEach((line) => {
      console.log(line);
    });
  } catch (err) {
    console.error(err);
  }
}

function run() {
  readInput();
}

run();
