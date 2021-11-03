const fs = require('fs');
const path = require('path');
const stdout = process.stdout;

const textPath = path.join(__dirname, 'text.txt');

const stream = fs.createReadStream(textPath, 'utf-8');

stream.on('data', data => stdout.write(data));