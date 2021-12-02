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
// // function readInput() {
// //   FileReader.read
// // }
//
// function run() {
//   readInput();
// }
//
// run();

const fs = require('fs');

try {
    // read contents of the file
    const data = fs.readFileSync('day1Input.txt', 'UTF-8');

    // split the contents by new line
    const lines = data.split(/\r?\n/);

    // print all lines
    lines.forEach((line) => {
        console.log(line);
    });
} catch (err) {
    console.error(err);
}
