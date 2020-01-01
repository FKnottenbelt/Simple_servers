const port = 8080;  // or 3000 when not on aws
const http = require("http");
const httpStatus = require("http-status-codes");
const app = http.createServer();

app.on('request', (req, res) => {
  // get post data chunks
  let body = [];
  req.on('data', (bodyData) => {
    body.push(bodyData);
  });
  // string chunks together when all are received
  req.on('end', () => {
    body.join('');
    console.log(`Request body contents: ${body}`);
  });

  console.log('------------------');
  console.log(`Method: ${req.method}`);
  console.log(`URL: ${req.url}`);
  console.log(`Headers: ${JSON.stringify(req.headers, null, 2)}`);
  console.log('------------------');

  res.writeHead(httpStatus.OK, {
    "Content-Type": "text/html"
  });

  let responseMessage = "<h1>This will be shown on the screen</h1>";
  res.end(responseMessage);
});

app.listen(port);
console.log(`The server has started and is listing on port number: ${port}`);



// run with
// curl --data "username=John&password=secret" http://localhost:8080

// output:
// ------------------
// Method: POST
// URL: /
// Headers: {
//   "host": "localhost:8080",
//   "user-agent": "curl/7.61.1",
//   "accept": "*/*",
//   "content-length": "29",
//   "content-type": "application/x-www-form-urlencoded"
// }
// ------------------
// Request body contents: username=John&password=secret