const express = require("express");
const app = express();
app.set('port', process.env.PORT || 8080);

// modules
const Subscriber = require('./models/subscriber');
const homeController = require('./controllers/homeController');
const errorController = require('./controllers/errorController');
const subscribersController = require('./controllers/subscribersController');


// template engine
app.set('view engine', 'ejs');
const layouts = require('express-ejs-layouts');

//database
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/recipe_db',
  {useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;

db.once('open', () => {
  console.log('Successfully connected to MongDB using Mongoose');
});

mongoose.Promise = global.Promise; // use ES6 promises

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

app.get('/contact', subscribersController.getSubscriptionPage);
app.post('/contact', subscribersController.saveSubscriber);

app.get('/subscribers', subscribersController.getAllSubscribers,
  (req, res, next) => {
    console.log(req.data);
    res.render('subscribers', { subscribers: req.data });
  });

// error handling
app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);


// server
app.listen(app.get('port'), () => {
  console.log(`Server running on port ${app.get('port')}`);
});


// add models (records)
// let subscriber1 = new Subscriber({
//   name: 'Klaas Vaak3',
//   email: 'klaas3@example.com',
// });

// subscriber1.save((error, savedDocument) => {
//   if (error) console.log(error);
//   console.log(savedDocument);
// });

const myQuery = Subscriber.findOne({
  name: 'Klaas Vaak3'
}).where('email', /klaas3/i);

myQuery.exec((error, data) => {
  if (data) console.log(data.email);
});