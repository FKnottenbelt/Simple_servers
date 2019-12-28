const routeResponseMap = {
  '/info': '<h1>Info Page</h1>',
  '/contact': '<h1>Contact Us</h1>',
  '/about': '<h1>Learn more about us</h1>',
  '/hello': '<h1>Say hello by emailing us here</h1>',
  '/error': '<h1>Sorry the page you are looking for is not here</h1>',
};

const port = 8080;
const http = require("http");
const httpStatus = require("http-status-codes");
const app = http.createServer((request, response) => {
  console.log("recieved an incomming request!");
  response.writeHead(httpStatus.OK, {
    "Content-Type": "text/html"
  });

  if (routeResponseMap[request.url]) {
    response.end(routeResponseMap[request.url]);
  } else {
    response.end('<h1>Welcome!</h1>');
  }
});

app.listen(port);
console.log(`The server has started and is listing on port number: ${port}`);