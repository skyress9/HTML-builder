const path = require('path');
const fsPromises = require('fs/promises');

const stylesPath = path.join(__dirname, 'styles');
const bundlePath = path.join(__dirname, 'project-dist', 'bundle.css');

async function getStyles(source, bundle) {
  let array = [];
  const files = await fsPromises.readdir(source, {withFileTypes: true});
  files.forEach(file => {
    if (file.isFile() && path.extname(file.name) == '.css') {
      fsPromises.readFile(path.join(source, file.name), 'utf-8').then((data) => {
        array.push(data);
        fsPromises.writeFile(bundle, array.join(''));
      });
    }
  });
}

getStyles(stylesPath, bundlePath);
