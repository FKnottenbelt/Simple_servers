const port = 8080;
const http = require('http');
const httpStatus = require('http-status-codes');
const fs = require('fs');
const router = require('./router');

const plainTextContentType = { 'Content-Type': 'text/plain' };
const htmlContentType = { 'Content-Type': 'text/html' };

const customReadFile = (file, response) => {
  fs.readFile(`./${file}`, (error, data) => {
    if (error) {
      console.log(`Error reading file: ${error}`);
    }
    response.end(data);
  });
};

router.get('/', (req, res) => {
  res.writeHead(httpStatus.OK, plainTextContentType);
  res.end('INDEX');
});

router.get('/index.html', (req, res) => {
  res.writeHead(httpStatus.OK, htmlContentType);
  customReadFile('views/index.html', res);
});

router.post('/', (req, res) => {
  res.writeHead(httpStatus.OK, plainTextContentType);
  res.end('POSTED');
});


http.createServer(router.handle).listen(port);

console.log(`The server has started and is listing on port number: ${port}`);
