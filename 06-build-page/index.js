const fs = require('fs');
const path = require('path');

fs.mkdir(`${path.join(__dirname, 'project-dist')}`, err => { });

let outputFile = fs.createWriteStream(`${path.join(__dirname, 'project-dist', 'index.html')}`);
let readFile = fs.createReadStream(`${path.join(__dirname, 'template.html')}`, 'utf-8');
let outputFileStyles = fs.createWriteStream(`${path.join(__dirname, 'project-dist','style.css')}`);
let pathDirectory = `${path.join(__dirname, 'assets')}`;
let pathCopyDirectory = `${path.join(__dirname, 'project-dist', 'assets')}`;
let regexp = /{{.+}}/g;
let dataFileHTML = '';
let arrayTags;

readFile.on('data', (data) => { 
  dataFileHTML = data.toString();
  arrayTags = dataFileHTML.match(regexp);
});

readFile.on('end', () => { 

  arrayTags.forEach( tag => {
    let componentFile = fs.createReadStream(`${path.join(__dirname, 'components', `${tag.slice(2, -2)}.html`)}`, 'utf-8');

    componentFile.on('data', (data) => { 
      dataFileHTML = dataFileHTML.replace(tag, data);
    });

    if (tag === arrayTags[arrayTags.length - 1]) {

      componentFile.on('end', () => { 
        outputFile.write(`${dataFileHTML}`);
      });
    }
  });
})



fs.readdir(`${path.join(__dirname, 'styles')}`, (err, files) => {

  files.forEach( file => {

    fs.stat(`${path.join(__dirname, 'styles', file)}`, (err, stats) => {
      
      if (stats.isFile() && path.parse(file).ext === ".css") {
        let readFile = fs.createReadStream(`${path.join(__dirname, 'styles', file)}`, 'utf-8');

        readFile.on('data', data => {
          outputFileStyles.write(`${data}`);
        });
      }
    })
  })
});

fs.readdir(pathDirectory, (err, files) => {
  
  files.forEach( folder => {

    fs.readdir(`${path.join(pathCopyDirectory, folder)}` , (err, files) => {

      if(err) {
        fs.mkdir(`${path.join(pathCopyDirectory, folder)}`, err => {
          if(err) throw err;
        });
      }
      else {
        files.forEach( file => {
          
          fs.unlink(`${path.join(pathCopyDirectory, folder, file)}`, err => {
            if(err) throw err;
          });
        })
      }
    });

    fs.readdir(`${path.join(pathDirectory, folder)}`, (err, files) => {

      files.forEach( file => {
        
        fs.copyFile(`${path.join(pathDirectory, folder, file)}`, `${path.join(pathCopyDirectory, folder, file)}`, err => {
          if(err) throw err;
        });
      });
    });
  });
})

