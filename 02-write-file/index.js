const fs = require('fs');
const path = require('path');
const stdout = process.stdout;
const readline = require('readline');

const textPath = path.join(__dirname, 'text.txt')
const writeableStream = fs.createWriteStream(textPath, 'utf-8');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function sayBye() {
  stdout.write('See you later');
}

stdout.write('Please enter text\n');

rl.on('line', input => {
  if (input == 'exit') {
    rl.close() 
  } else {
    writeableStream.write(input);
  }
})

process.on('exit', sayBye);