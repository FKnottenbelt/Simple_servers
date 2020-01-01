const port = 8080;
const http = require("http");
const httpStatus = require("http-status-codes");
const router = require('./router');
const contentTypes = require('./contentTypes');
const utils = require('./utils');


http.createServer(router.handle).listen(port);

console.log(`The server has started and is listing on port number: ${port}`);