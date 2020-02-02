const mongoose = require("mongoose")
const Subscriber = require("./models/subscriber");

mongoose.connect(
  "mongodb://localhost:27017/recipe_db",
  { useNewUrlParser: true, useUnifiedTopology: true }

);

mongoose.connection;

var contacts = [
  {
    name: "John Doe",
    email: "jon@example.com",
    zipCode: 10016
  },
  {
    name: "Klaas Vaak",
    email: "klaas.vaak@example.com",
    zipCode: 20331
  },
  {
    name: "Gerard Groot",
    email: "gerard.groot@example.com",
    zipCode: 19103
  }
];

Subscriber.deleteMany()
  .exec()
  .then(() => {
    console.log("Subscriber data is empty!");
  });

var commands = [];

contacts.forEach((contact) => {
    commands.push(Subscriber.create({
      name: contact.name,
      email: contact.email,
      zipCode: contact.zipCode,
    }));
});

Promise.all(commands)
  .then(result => {
    console.log(JSON.stringify(result, null, 2));
    mongoose.connection.close();
  })
  .catch(error => {
    console.log(`ERROR: ${error}`);
  });

