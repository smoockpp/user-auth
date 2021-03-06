var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var app = express();




// mongodb connection
mongoose.connect("mongodb://heroku_2gqdt714:2osklgtr34eh3b80rjm9he6jnc@ds127321.mlab.com:27321/heroku_2gqdt714");
var db = mongoose.connection;
//mongo err
db.on('error', console.error.bind(console, 'connection error: '));

//use session for tracking logins
app.use(session({
  secret: 'nn-creatives',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

// make user ID available in templates
app.use(function(req, res, next) {
  res.locals.currentUser = req.session.userId;
  // console.log(res.locals.currentUser);
  next();
});


// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// serve static files from /public
app.use(express.static(__dirname + '/public'));

// view engine setup
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

// include routes
var routes = require('./routes/index');
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var port = process.env.PORT || 3000;

// listen on port 3000
app.listen(port, function () {
  console.log('Express app listening on port ' + port);
});
