const express = require("express");
const app = express();
app.set('port', process.env.PORT || 8080);
const homeController = require('./controllers/homeController');
const errorController = require('./controllers/errorController');
app.set('view engine', 'ejs');
const layouts = require('express-ejs-layouts');

//database
const mongoDb = require('mongodb').MongoClient;
const dbUrl = 'mongodb://localhost:27017';
const dbName = 'test';
  // make connection
mongoDb.connect(dbUrl, (error, client) => {
  if (error) throw error;
  let db = client.db(dbName);
  db.collection("contacts")
    .find()
    .toArray((error, data) => {
      if (error) throw error;
      console.log(data);
    });

  db.collection('contacts')
    .insert({
      name: 'Klaas Vaak',
      email: 'Klaas@example.com'
    }, (error, db) => {
      if (error) throw error;
      console.log(db);
    });
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