const port = 8080;
const express = require('express');
const app = express();
const homeController = require('./controllers/homeController');

// middleware function
app.use('/', homeController.logRequestPaths);

app.use(
  express.urlencoded({
    extended: false
  })
);

app.use(express.json());

// routes
app.get('/items/:vegetable', homeController.sendReqParam);

app.get('/', homeController.homePage);


app.post('/', homeController.postHome);


// server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

