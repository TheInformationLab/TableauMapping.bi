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

if (process.env.NOW) {
  app.use(compression());
}

app.use(timeout(600000));
app.use(haltOnTimedout);

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

function haltOnTimedout(req, res, next){
  if (!req.timedout) next();
}

var options = { useNewUrlParser: true, useUnifiedTopology: true };

var dbhost = 'tableaumapping-yi1n8.mongodb.net/tableaumappingmapbox?retryWrites=true&w=majority';
var dbuser = process.env.DBUSER || null;
var dbpass = process.env.DBPASS || null;
var dburi = 'mongodb+srv://';

if (dbuser && dbpass) {
  dburi = dburi + dbuser + ":" + dbpass + '@' + dbhost;
} else {
  dburi = dburi + dbhost;
}
mongoose.set('debug', false);
mongoose.connect(dburi, options);

var appRoutes = require('./routes/app');
var errorRoutes = require('./routes/errors');
var authRoutes = require('./routes/auth');
var profileRoutes = require('./routes/profile');
var spatialRoutes = require('./routes/spatial');
var searchRoutes = require('./routes/search');
var statsRoutes = require('./routes/stats');
var apiRoutes = require('./routes/api');

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
//
// const encodeResToGzip = contentType => (req, res, next) => {
//     req.url = req.url + '.gz';
//     res.set('Content-Encoding', 'gzip');
//     res.set('Content-Type', contentType);
//
//     next();
// };
//
// app.get("*.js", encodeResToGzip('text/javascript'));

app.get("/wdc", (req, res) => {

  res.status(301).redirect("https://wdc.tableaumapping.bi/wdc")

})

app.use('/healthcheck', require('express-healthcheck')());
app.use('/api/err', errorRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/spatial', spatialRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api', apiRoutes);
app.use('/', appRoutes);

// catch 404 and forward to error handler
app.use(function (req, res) {
    return res.render('index');
});

module.exports = app;

const { spawn } = require('child_process');
spawn('node', [path.join(__dirname, './func/', 'cache.js')]);
