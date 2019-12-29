const routeMap = {
  '/': 'views/index.html',
};

const port = 8080;
const http = require("http");
const httpStatus = require("http-status-codes");
const fs = require("fs");

const app = http.createServer((request, response) => {
  response.writeHead(httpStatus.OK, {
    "Content-Type": "text/html"
  });

  if (routeMap[request.url]) {
    fs.readFile(routeMap[request.url], (error, data) => {
      response.write(data);
      response.end();
    });
  } else {
    response.end('<h1>Sorry, not found.</h1>');
  }
});

app.listen(port);
console.log(`The server has started and is listing on port number: ${port}`);