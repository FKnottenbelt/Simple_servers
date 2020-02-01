const mongoose = require('mongoose');
const Subscriber = require('../models/subscriber');

// with callback
// exports.getAllSubscribers = (req, res, next) => {
//   Subscriber.find( {}, (error, subscribers) => {
//     if (error) next(error);
//     req.data = subscribers;
//     next();
//   });
// };

// with promise
exports.getAllSubscribers = (req, res, next) => {
  Subscriber.find({})
    .exec()                  //return promise from find query
    .then((subscribers) => {
      res.render('subscribers',
        {subscribers: subscribers});
    })                      // server db results
    .catch((error) => {
      console.log(error.message);
      return [];
    })                     // catch errors
  .then(()=> {
    console.log('promise complete');
  });
};

exports.getSubscriptionPage = (req, res) => {
  res.render(`contact`);
};

exports.saveSubscriber = (req, res) => {
  let newSubscriber = new Subscriber({
    name: req.body.name,
    email: req.body.email,
    zipCode: req.body.zipCode,
  });

  // with callback
  // newSubscriber.save((error, result) => {
  //   if (error) res.send(error);
  //   res.render("thanks");
  // });

  // with promise
  newSubscriber.save()
    .then(result => {
      res.render('thanks');
    })
    .catch(error => {
      if (error) res.send(error);
    });

};
