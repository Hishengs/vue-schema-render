const path = require('path');
const fs = require('fs');

// make directory deeply
const mkdirDeep = (distPath) => {
  distPath = path.join(distPath, '');
  if(!fs.existsSync(distPath)){
    const splitedDistPath = distPath.split(path.sep);
    splitedDistPath.reduce((res, dir, index) => {
      const dirPath = index ? res + '/' + dir : dir;
      if(!fs.existsSync(dirPath)){
        fs.mkdirSync(dirPath);
      }
      return dirPath;
    }, '');
  }
};

// copy file
const copyFile = (src, dist) => {
  const fileData = fs.readFileSync(src, { encoding: 'utf8' });
  mkdirDeep(path.dirname(dist)); // create dir of dist file
  fs.writeFileSync(dist, fileData, { encoding: 'utf8' });
};

// copy directory
const copyDir = (src, dist) => {
  const files = getDirFiles(src);
  files.forEach(file => {
    copyFile(file, file.replace(src, dist));
  });
};

// move file
const moveFile = (src, dist) => {
  copyFile(src, dist);
  fs.unlinkSync(src);
};

// move directory
const moveDir = (src, dist) => {
  const files = getDirFiles(src);
  files.forEach(file => {
    moveFile(file, file.replace(src, dist));
  });
};

// get files from dir
const getDirFiles = (dirPath, match = null) => {
  let paths = [];
  const files = fs.readdirSync(dirPath);
  for(let i=0, ilen=files.length; i<ilen; i++){
    const fileName = files[i];
    const filePath = path.join(dirPath, fileName);
    const isFile = fs.statSync(filePath).isFile();
    if(isFile){
      if(match){
        if(match(filePath)){
          paths.push(filePath);
        }
      }else paths.push(filePath);
    }else {
      paths = paths.concat(getDirFiles(filePath, match));
    }
  }
  return paths;
}

// is directory
const isDir = (file) => {
  return fs.statSync(file).isDirectory(file);
};

// is file
const isFile = (file) => {
  return fs.statSync(file).isFile(file);
};

function rmdirSync(dirPath) {
  let files = [];
  if (fs.existsSync(dirPath)) {
      files = fs.readdirSync(dirPath);
      files.forEach(function (file, index) {
          const filePath = path.join(dirPath, file);
          if (fs.statSync(filePath).isDirectory()) {
            rmdirSync(filePath);
          } else {
              fs.unlinkSync(filePath);
          }
      });
      fs.rmdirSync(dirPath);
  }
}

module.exports = {
  mkdirDeep,
  copyFile,
  copyDir,
  moveFile,
  moveDir,
  isDir,
  isFile,
  getDirFiles,
  rmdirSync,
};