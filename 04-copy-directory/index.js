const fsPromises = require('fs/promises');
const path = require('path');

const filesPath = path.join(__dirname, 'files');
const filesCopyPath = path.join(__dirname, 'files-copy');

async function copyDir(source, copy) {

  const folder = fsPromises.readdir(source);
  
  await fsPromises.rmdir(copy, { recursive: true });
  fsPromises.mkdir(copy, { recursive: true });
  
  folder.then(files => {
    files.forEach(file => {
      fsPromises.copyFile(path.join(source, file), path.join(copy, file));
    });
  });
}

copyDir(filesPath, filesCopyPath);