const port = 8080;
const express = require('express');
const app = express();

// middleware function
app.use((req, res, next) => {
  console.log(`request made to ${req.method}, ${req.url}`);
  next();
});

app.use(
  express.urlencoded({
    extended: false
  })
);

app.use(express.json());

// routes
app.get('/items/:vegetable', (req, res) => {
  let veg = req.params.vegetable;
  res.send(`This is the page for ${veg}`);
});

app.get('/', (req, res) => {
  res.send(`Homepage`);
});

app.post('/', (req, res) => {
  console.log('body: ', req.body);
  console.log('query: ', req.query);
  res.send("POST successful!");
});

// server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

