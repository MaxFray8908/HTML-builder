const fs = require('fs');
const path = require('path');
const readline = require('readline');
const {stdin: input, stdout: output} = require('process');

const rl = readline.createInterface({input, output});
const outputFile = fs.createWriteStream(`${path.join(__dirname, 'text.txt')}`);

output.write('Good morning!\nTo close, enter "exit" or ctrl + c.\nWaiting for text input: ');

rl.on('line', (inputText) => {
  output.write('Waiting for text input: ');

  if (inputText === 'exit') {
    rl.close();
    output.write('\nSee you');
  }
  else {
    outputFile.write(`${inputText}\n`);
  }
});

rl.on('close', () => {
  rl.close();
  output.write('\nSee you');
})