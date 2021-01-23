const express = require('express');
const open = require('open');
const path = require('path');
const fs = require('fs');
const csv = require('fast-csv');
const bodyParser = require('body-parser');
const multer = require('multer');
// const helmet = require('helmet');
const port = 9222;
// 安全性 https://www.npmjs.com/package/helmet

(async () => {
  const app = express();
  app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
  app.use(bodyParser.json()); // for parsing application/json
  app.set('views', __dirname + '/');
  app.set('view engine', 'ejs');

  // const upload = multer(/* { dest: './upload/' } */);
  const upload = multer({ dest: path.join(__dirname, '/temp/') });
  app.get('/', function (req, res) {
    res.render('views/index');
  });

  app.post('/api/action', upload.single('file'), function (req, res) {
    console.log('body', Object.keys(req.body));

    const fileRows = [];
    if (req.file && req.file.path) {
      fs.createReadStream(req.file.path)
        .pipe(csv.parse({ headers: true }))
        .on('error', (error) => res.json({ rspCode: '9999', msg: error.message }))
        .on('data', function (data) {
          fileRows.push(data); // push each row
        })
        .on('end', function () {
          console.log(fileRows);
          fs.unlinkSync(req.file.path); // remove temp file
          res.json({ rspCode: '0000', msg: 'upload file success' });
        });
    } else {
      res.json({ rspCode: '0000', msg: 'set config success' });
    }
  });

  app.get('/api/close', function (req, res) {
    console.log('process exit');
    process.exit(1);
  });

  app.listen(port);
  console.log(`locales start at http://localhost:${port}`);

  // await open(`http://localhost:${port}`);
})();
