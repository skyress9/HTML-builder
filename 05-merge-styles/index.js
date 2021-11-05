const path = require('path');
const fsPromises = require('fs/promises');

async function getStyles() {
  let array = [];
  const stylesPath = path.join(__dirname, 'styles');
  const bundlePath = path.join(__dirname, 'project-dist', 'bundle.css');
  const files = await fsPromises.readdir(stylesPath, {withFileTypes: true});
  files.forEach(file => {
    if (file.isFile() && path.extname(file.name) == '.css') {
      fsPromises.readFile(path.join(stylesPath, file.name), 'utf-8').then((data) => {
        array.push(data);
        fsPromises.writeFile(bundlePath, array.join(''));
      });
    }
  });
}

getStyles();