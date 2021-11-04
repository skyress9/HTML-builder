const fsPromises = require('fs/promises');
const path = require('path');

const filesPath = path.join(__dirname, 'files');
const filesCopyPath = path.join(__dirname, 'files-copy');
const folder = fsPromises.readdir(filesPath);

fsPromises.mkdir(filesCopyPath, { recursive: true });

folder.then(files => {
  files.forEach(file => {
    fsPromises.copyFile(path.join(filesPath, file), path.join(filesCopyPath, file));
  });
});