exports.respondWithName = (req, res) => {
  res.render('index');
};

exports.homePage = (req, res) => {
  res.send(`Homepage`);
};


exports.postHome = (req, res) => {
  console.log('body: ', req.body);
  console.log('query: ', req.query);
  res.send("POST successful!");
};

exports.logRequestPaths = (req, res, next) => {
  console.log(`request made to ${req.method}, ${req.url}`);
  next();
};