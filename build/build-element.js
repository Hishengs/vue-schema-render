const path = require('path');

const { copyDir, rmdirSync } = require('./fs-util.js');

const distDir = path.join(process.cwd(), './dist');

const elementLib = path.join(process.cwd(), './node_modules/element-ui/lib');
const elementDist = path.resolve(distDir, './element-ui');

rmdirSync(distDir);
copyDir(elementLib, elementDist);
