var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var compression = require('compression');
var timeout = require('connect-timeout');

var app = express();

app.use(compression());

app.use(timeout(600000));
app.use(haltOnTimedout);

function haltOnTimedout(req, res, next){
  if (!req.timedout) next();
}

var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 600000,socketTimeoutMS : 600000 } },
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 600000,socketTimeoutMS : 600000  } } };


var appRoutes = require('./routes/app');
var authRoutes = require('./routes/auth');
var spatialRoutes = require('./routes/spatial');
var searchRoutes = require('./routes/search');
var statsRoutes = require('./routes/stats');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

app.use('/auth', authRoutes);
app.use('/spatial', spatialRoutes);
app.use('/search', searchRoutes);
app.use('/stats', statsRoutes);
app.use('/', appRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    return res.render('index');
});


module.exports = app;
