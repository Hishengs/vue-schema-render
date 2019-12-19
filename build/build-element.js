const path = require('path');

const { copyDir, rmdirSync } = require('./fs-util.js');

const elementLib = path.join(process.cwd(), './node_modules/element-ui/lib');
const distDir = path.join(process.cwd(), './dist/element-ui');

rmdirSync(distDir);
copyDir(elementLib, distDir);
