var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');


var mongoose = require('mongoose');

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:admin@ds032887.mlab.com:32887/morcyc4you')
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));
  var db = mongoose.connection;

var index = require('./routes/index');
var users = require('./routes/users');
var register = require('./routes/register');
var admin = require('./routes/admin');
var morcyc = require('./routes/morcyc');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  secret: 'ibike',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));
// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', '/images/icon_scooter.png')));

app.use(fileUpload());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/register', register);
app.use('/admin', admin);
app.use('/', morcyc);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
setInterval(function(){
  console.log("loop");
},1000);

var MicroGear = require('microgear');

const APPID  = "CMRM";
const KEY    = "Q22q476p7toHHLD";
const SECRET = "x2ttOOD1vJqbqN5M9sJFdJO6Q";
const ALIAS = "web";
var microgear = MicroGear.create({
    key : KEY,
    secret : SECRET
});

microgear.on('connected', function() {
    console.log('Connected...');
    microgear.setAlias(ALIAS);
    setInterval(function() {
      microgear.chat('mygear', 'Hello world.');
  },1000);
    
});

microgear.on('message', function(topic,body) {
    console.log('incoming : '+topic+' : '+body);
});

microgear.on('closed', function() {
    console.log('Closed...');
});

microgear.connect(APPID);

module.exports = app;
