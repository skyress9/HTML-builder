const fsPromises = require('fs/promises');
const path = require('path');

async function buildPage() {
  const distPath = path.join(__dirname, 'project-dist');
  const assetsPath = path.join(__dirname, 'assets');
  const assetsDistPath = path.join(distPath, 'assets');
  const templatePath = path.join(__dirname, 'template.html');
  const componentsPath = path.join(__dirname, 'components');

  const stylesPath = path.join(__dirname, 'styles');
  const stylesDistPath = path.join(distPath, 'style.css');

  const templateDistPath = path.join(distPath, 'index.html');

  await fsPromises.rmdir(distPath, {recursive: true});
  await fsPromises.mkdir(distPath, {recursive: true});

  await buildTemplate(templatePath, componentsPath, templateDistPath);
  getStyles(stylesPath, stylesDistPath);
  copyDir(assetsPath, assetsDistPath);
}

async function buildTemplate(tempPath, compPath, tempDistPath) {
  let template = await fsPromises.readFile(tempPath, {encoding: 'utf-8'});
  const compFolder = await fsPromises.readdir(compPath);
  let promises = compFolder.map(file => {
    const fileName = path.basename(file, path.extname(file));
    return fsPromises.readFile(path.join(compPath, file), 'utf-8').then(data => {
      if (path.extname(file) == '.html') template = template.replace(`{{${fileName}}}`, data);
    });
  });
  await Promise.all(promises);
  fsPromises.writeFile(tempDistPath, template);
}

function copyDir(source, copy) {
  const folder = fsPromises.readdir(source);
  fsPromises.mkdir(copy, { recursive: true });
  folder.then(files => {
    files.forEach(async file => {
      const filePath = path.join(source, file);
      const distFilePath = path.join(copy, file);
      await fsPromises.mkdir(distFilePath, { recursive: true });
      const files = await fsPromises.readdir(filePath);
      files.forEach(f => {
        fsPromises.copyFile(path.join(filePath, f), path.join(distFilePath, f));
      });
    });
  });
}

async function getStyles(source, bundle) {
  let array = [];
  const files = await fsPromises.readdir(source, {withFileTypes: true});
  let promises = files.map(file => {
    if (file.isFile() && path.extname(file.name) == '.css') {
      return fsPromises.readFile(path.join(source, file.name), 'utf-8').then((data) => {
        array.push(data);
      });
    }
  });
  await Promise.all(promises);
  fsPromises.writeFile(bundle, array.join(''));
}

buildPage();