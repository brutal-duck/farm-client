const fs = require('fs');

fs.copyFile('./src/scripts/libs/eruda.js', './build/eruda.js', (err) => {
  if (err) throw err;
  console.log('eruda was copied');
});