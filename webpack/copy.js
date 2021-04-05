const fse = require('fs-extra');

const fs = require('fs');
// fs.mkdir('./build/src/assets/spine/', { recursive: true }, (err) => {
//   if (err) throw err;
// });

// const srcDir = './src/assets/spine';
// const destDir = './build/src/assets/spine/';

fse.copySync('./src/assets/spine', './build/src/assets/spine', (err) => {
  if (err) {
    console.log("ERROR!", err);
  } else {
    console.log("SUCCESS!");
  }
});