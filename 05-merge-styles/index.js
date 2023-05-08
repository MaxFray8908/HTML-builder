const fs = require('fs');
const path = require('path');

let outputFile = fs.createWriteStream(`${path.join(__dirname, 'project-dist','bundle.css')}`);

fs.readdir(`${path.join(__dirname, 'styles')}`, (err, files) => {

  files.forEach( file => {

    fs.stat(`${path.join(__dirname, 'styles', file)}`, (err, stats) => {
      
      if (stats.isFile() && path.parse(file).ext === ".css") {
        let readFile = fs.createReadStream(`${path.join(__dirname, 'styles', file)}`, 'utf-8');

        readFile.on('data', data => {
          outputFile.write(`${data}`);
        });
      }
    })
  })
});