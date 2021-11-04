const fs = require('fs');
const path = require('path');
const { readdir } = require('fs/promises');
const stdout = process.stdout;

const folderPath = path.join(__dirname, 'secret-folder');

const folder = readdir(folderPath, {withFileTypes: true});

folder.then(folder => folder.forEach(file => {
  if (file.isFile()) {
    fs.stat(path.join(folderPath, file.name), (err, stats) => {
      stdout.write(`${file.name} - ${path.extname(file.name)} - ${stats.size}\n`);
    });
  }
}));