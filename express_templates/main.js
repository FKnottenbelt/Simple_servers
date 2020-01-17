const express = require("express");
const app = express();
app.set('port', process.env.PORT || 8080);
const homeController = require('./controllers/homeController');
const errorController = require('./controllers/errorController');
app.set('view engine', 'ejs');
const layouts = require('express-ejs-layouts');

//database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/recipe_db',
  {useNewUrlParser: true}
);
const db = mongoose.connection;

db.once('open', () => {
  console.log('Successfully connected to MongDB using Mongoose');
});

// middleware function
app.use(express.static("public"));
app.use(layouts);

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

// error handling
app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

// server
app.listen(app.get('port'), () => {
  console.log(`Server running on port ${app.get('port')}`);
});
