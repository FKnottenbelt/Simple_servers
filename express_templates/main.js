const express = require("express");
const app = express();
app.set('port', process.env.PORT || 8080);
const homeController = require('./controllers/homeController');
app.set('view engine', 'ejs');
const layouts = require('express-ejs-layouts');
app.use(layouts);

// middleware function
app.use('/', homeController.logRequestPaths);

app.use(
  express.urlencoded({
    extended: false
  })
);

app.use(express.json());

// routes
app.get('/name/:myName', homeController.respondWithName);

app.get('/', homeController.homePage);

// server
app.listen(app.get('port'), () => {
  console.log(`Server running on port ${app.get('port')}`);
});
