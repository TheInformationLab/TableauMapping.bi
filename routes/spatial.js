var express = require('express');
var router = express.Router();
var multer = require('multer');
var fs = require('fs');
var geo = require('../func/geo');
var wdc = require('../func/wdc');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
const bfj = require('bfj');
var compression = require('compression');
var JSONStream = require('JSONStream');
var es = require('event-stream');
var oboe = require('oboe');
var io = require('socket.io');

var Spatial = require('../models/spatial');

router.use(compression());


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
     var meta = req.body;
     var user = jwt.verify(req.headers.authorization, '+t{zTdd_WDfq *UEs15r{_FY|J 8#t&wj+FL},UUX-{Vs>+=`+SV#+nr RaJh+w}');
     user = user.user;
     geo.geoJson(req.file.path, function(geojson) {
       console.log("Converted to GeoJSON");
       //fs.writeFileSync('./parseTemp/counties.geojson', JSON.stringify(geojson));
       fs.unlink(req.file.path, function() {
         wdc.getTableSchema(geojson, meta, function(schema) {
           console.log("Table Schema Built");
           geo.flatten(geojson, function(flattened) {
             console.log("GeoJSON Flattened");
             geo.simplify(flattened, 0.01, function(simplified) {
               console.log("GeoJSON simplified");
               wdc.geojson2Tableau(simplified, function(filename) {
                 console.log(filename);
                 var spatial = new Spatial ({
                   owner: user._id,
                   name: meta.name,
                   sourceUrl: meta.sourceUrl,
                   sourceDate: meta.sourceDate,
                   type: meta.type,
                   bbox: "",
                   country: meta.country,
                   continent: meta.contient,
                   tableSchema: schema/*,
                   tabData: createdFile._id*/
                 });
                  spatial.attach('attachment', {path: filename}, (error) => {
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
                        spatial: spatial
                      });
                    });
                  });
               });
             });
           });
         });
       });
     });
   });
});

router.get('/meta', function(req, res, next) {
  var query = Spatial.find({}).select('bbox continent country dateCreated name owner sourceDate sourceUrl type tableSchema tabData');

  query.exec(function (err, spatials) {
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

router.post('/geojson', function(req, res, next) {
  Spatial.findById(mongoose.Types.ObjectId(req.body.id), function (err, resp) {
        if(err) {
          res.status(500).json({
            message: 'Error finding spatial object ' + req.body.id,
            error: error
          });
          return;
        }
        if(!resp) {
          res.status(404).json({
            message: "Can't find spatial object " + req.body.id
          });
          return;
        }
        console.log('./data/'+resp.attachment.name);

    });
});

module.exports = router;
