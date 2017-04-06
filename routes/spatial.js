var express = require('express');
var router = express.Router();
var multer = require('multer');
var fs = require('fs');
var geo = require('../func/geo');
var jwt = require('jsonwebtoken');

var Spatial = require('../models/spatial');

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

router.post('/upload', function(req, res, next) {
   upload(req,res,function(err){
     if(err){
          res.json({error_code:1,err_desc:err});
          return;
     }
     var user = jwt.verify(req.headers.authorization, '+t{zTdd_WDfq *UEs15r{_FY|J 8#t&wj+FL},UUX-{Vs>+=`+SV#+nr RaJh+w}');
     user = user.user;
     geo.geoJson(req.file.path, function(geojson) {
       fs.unlink(req.file.path, function() {
         geo.encode(geojson, function(buffer) {
           var spatial = new Spatial ({
             owner: user._id,
             name: "Test",
             sourceUrl: "http://www.example.com",
             sourceDate: "2017-04-07",
             type: "Postcode",
             bbox: "",
             country: "UK",
             continent: "Europe",
             data: buffer
           });
           spatial.save(function(err, result) {
             if (err) {
               res.status(500).json({
                 message: 'Error creating new spatial object',
                 error: err
               });
               return;
             }
             res.status(201).json({
               message: 'Spatial Object added to database',
               obj: result
             });
           });
         });
       });
     });
   });
});

router.get('/', function(req, res, next) {
  Spatial.find({}, function (err, spatials) {
    if (err) {
      res.status(500).json({
        message: 'Error finding spatial objects',
        error: err
      });
      return;
    }
    res.status(201).json({
      message: 'Result',
      spatials: spatials
    });
  });
});

module.exports = router;
