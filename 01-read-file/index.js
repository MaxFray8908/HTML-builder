const path = require('path');
const fs = require('fs');

let dataFile = '';
let readFile = fs.createReadStream(`${path.join(__dirname, 'text.txt')}`, 'utf-8');

readFile.on('data', chunk => dataFile += chunk);
readFile.on('end', () => console.log(dataFile));