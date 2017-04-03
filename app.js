var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var fs = require('fs');

var appRoutes = require('./routes/app');
var geo = require('./func/geo');

var app = express();

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


var storage = multer.diskStorage({ //multers disk storage settings
       destination: function (req, file, cb) {
           cb(null, './uploads/');
       },
       filename: function (req, file, cb) {
           var datetimestamp = Date.now();
           cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
       }
   });

 var upload = multer({ //multer settings
                  storage: storage
              }).single('file');

app.use('/', appRoutes);

app.post('/upload', function(req, res) {
     upload(req,res,function(err){
       console.log(req.file);
       if(err){
            res.json({error_code:1,err_desc:err});
            return;
       }
       geo.geoJson(req.file.path, function(geojson) {
         res.json({error_code:0,err_desc:null,data:geojson});
         fs.unlink(req.file.path);
       });
     });
 });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    return res.render('index');
});


module.exports = app;
