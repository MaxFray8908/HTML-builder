const fs = require('fs');
const path = require('path');

let pathDirectory = `${path.join(__dirname, '/files')}`;
let pathCopyDirectory = `${path.join(__dirname, '/files-copy')}`;

fs.readdir(pathCopyDirectory, (err, files) => {

  if(err) {
    fs.mkdir(pathCopyDirectory, err => {
      if(err) throw err;
    });
  }
  else {
    files.forEach( file => {
      
      fs.unlink(`${path.join(pathCopyDirectory, file)}`, err => {
        if(err) throw err;
      });
    })
  }
});


fs.readdir(pathDirectory, (err, files) => {

  files.forEach( file => {
    
    fs.copyFile(`${path.join(pathDirectory, file)}`, `${path.join(pathCopyDirectory, file)}`, err => {
      if(err) throw err;
    });
  });
});