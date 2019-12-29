const port = 8080;
const http = require('http');
const httpStatus = require('http-status-codes');
const fs = require('fs');

const sendErrorResponse = (response) => {
  response.writeHead(httpStatus.NOT_FOUND, {
    'Content-Type': 'text/html',
  });
  response.write('<h1>File not found.</h1>');
  response.end();
};

const customReadFile = (filePath, response) => {
  if (fs.existsSync(filePath)) {
    fs.readFile(filePath, (error, data) => {
      if (error) {
        console.log(error);
        sendErrorResponse(response);
        return;
      }
      response.write(data);
      response.end();
    });
  } else {
    sendErrorResponse(response);
  }
};

http.createServer((request, response) => {
  const { url } = request;

  if (url.includes('.html')) {
    response.writeHead(httpStatus.OK, {
      'Content-Type': 'text/html',
    });
    customReadFile(`./views${url}`, response);
  } else if (url.includes('.js')) {
    response.writeHead(httpStatus.OK, {
      'Content-Type': 'text/javascript',
    });
    customReadFile(`./public/js${url}`, response);
  } else if (url.includes('.css')) {
    response.writeHead(httpStatus.OK, {
      'Content-Type': 'text/css',
    });
    customReadFile(`./public/css${url}`, response);
  } else if (url.includes('.png')) {
    response.writeHead(httpStatus.OK, {
      'Content-Type': 'image/png',
    });
    customReadFile(`./public/images${url}`, response);
  } else {
    sendErrorResponse(response);
  }
}).listen(port);

console.log(`The server has started and is listing on port number: ${port}`);
