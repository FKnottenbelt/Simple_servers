const port = 8080;
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`The express server has started and is listening on
  port number: ${port}`);
});
