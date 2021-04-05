const fse = require('fs-extra');

let srcDir = './src/assets/spine';
let destDir = './build/src/assets/spine';

fse.copy(srcDir, destDir, (err) => {
  if (err) {
    console.log("ERROR BUILD", err);
  } else {
    console.log("SUCCESS BUILD WITH SPINE");
  }
});
