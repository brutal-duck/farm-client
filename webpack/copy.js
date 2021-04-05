const fse = require('fs-extra');

fse.copy('./src/assets/spine', './build/src/assets/spine', (err) => {
  if (err) {
    console.log("ERROR BUILD", err);
  } else {
    console.log("SUCCESS BUILD WITH SPINE");
  }
});
