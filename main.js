const port = 8080;
const http = require("http");
const httpStatus = require("http-status-codes");
const app = http.createServer((request, response) => {
  console.log("recieved an incomming request!");
  response.writeHead(httpStatus.OK, {
    "Content-Type": "text/html"
  });

  let responseMessage = "<h1>Hello, Universe!</h1>";
  response.write(responseMessage);
  response.end();
  console.log(`Sent a response: ${responseMessage}`);
});

app.listen(port);
console.log(`The server has started and is listing on port number: ${port}`);