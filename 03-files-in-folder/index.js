const fs = require('fs');
const path = require('path');

let pathDirectory = `${path.join(__dirname, '/secret-folder')}`;

fs.readdir(pathDirectory, (err, files) => {

  files.forEach( file => {

    fs.stat(`${path.join(pathDirectory, file)}`, (err, stats) => {
      
      if (stats.isFile()) {
        console.log(`${path.parse(file).name} - ${path.parse(file).ext.slice(1)} - ${stats.size}b`);
      }
    });
  });
});