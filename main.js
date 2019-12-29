const port = 8080;
const http = require("http");
const httpStatus = require("http-status-codes");
const fs = require("fs");

const getViewUrl = (url) => {
  return `views${url}.html`;
};

const app = http.createServer((request, response) => {
  let viewUrl = getViewUrl(request.url);

  fs.readFile(viewUrl, (error, data) => {
    if (error) {
      response.writeHead(httpStatus.NOT_FOUND);
      response.write("<h1>FILE NOT FOUND</h1>");
    } else {
      response.writeHead(httpStatus.OK, {
        "Content-Type": "text/html"
      });
      response.write(data);
    }
    response.end();
  });
});

app.listen(port);
console.log(`The server has started and is listing on port number: ${port}`);