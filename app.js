let express = require('express');
let session = require('express-session');
let path = require('path');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let xmlparser = require('express-xml-bodyparser');
let logger = require('morgan');
let flash = require('connect-flash');
let passport = require('passport');
let mongoose = require('mongoose');
let toastr = require('express-toastr');

let CONFIG = require('./config/config');

// mongoDB connect
mongoose
    .connect(CONFIG.DATABASE, { useNewUrlParser : true })
    .then(() => { console.log('MongoDB connected success') })
    .catch(err => { console.log('MongoDB connection error with message: ' + err.message) });

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(xmlparser({trim: false, explicitArray: false}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(CONFIG.SECRET_PHRASE));
app.use(session(CONFIG.SESSION_OPTIONS));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use(toastr());

// passport config
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

//local variable user
app.get('*', function(req, res, next){
  res.locals.user = req.user || null;
  next();
});

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/docs', require('./routes/documentation'));
app.use('/ringostat', require('./routes/ringostat'));

// catch 404 and forward to error handler
app.use('*', function(req, res, next) {
  if (res.status(404)) {
    next(404);
  }
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  let statusCode = err || 500;
  let msg = {
    404 : 'Страница не существует',
    500 : 'Server internal Error'
  };
  res.render('./error', {
    status : statusCode,
    message : statusCode === err ? msg["404"] : msg["500"],
    title : 'Ошибка! | CSPlatform',
    req : req
  })

});

module.exports = app;