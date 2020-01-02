const port = 8080;
const http = require('http');
const httpStatus = require('http-status-codes');
const router = require('./router');
const contentTypes = require('./contentTypes');
const utils = require('./utils');

// register routes

router.get('/', (req, res) => {
  res.writeHead(httpStatus.OK, contentTypes.html);
  utils.getFile('views/index.html', res);
});

router.get('/courses.html', (req, res) => {
  res.writeHead(httpStatus.OK, contentTypes.html);
  utils.getFile('views/courses.html', res);
});

router.get('/contact.html', (req, res) => {
  res.writeHead(httpStatus.OK, contentTypes.html);
  utils.getFile('views/contact.html', res);
});

router.post('/', (req, res) => {
  res.writeHead(httpStatus.OK, contentTypes.html);
  utils.getFile('views/thanks.html', res);
});

router.get('/graph.png', (req, res) => {
  res.writeHead(httpStatus.OK, contentTypes.png);
  utils.getFile('public/images/graph.png', res);
});

router.get('/people.jpg', (req, res) => {
  res.writeHead(httpStatus.OK, contentTypes.jpg);
  utils.getFile('public/images/people.jpg', res);
});

router.get('/product.jpg', (req, res) => {
  res.writeHead(httpStatus.OK, contentTypes.jpg);
  utils.getFile('public/images/product.jpg', res);
});

router.get('/main.css', (req, res) => {
  res.writeHead(httpStatus.OK, contentTypes.css);
  utils.getFile('public/css/main.css', res);
});

router.get('/bootstrap.css', (req, res) => {
  res.writeHead(httpStatus.OK, contentTypes.css);
  utils.getFile('public/css/bootstrap.css', res);
});


// run server

http.createServer(router.handle).listen(port);

console.log(`The server has started and is listing on port number: ${port}`);
