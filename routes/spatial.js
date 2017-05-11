var express = require('express');
var router = express.Router();
var multer = require('multer');
var fs = require('fs');
var geo = require('../func/geo');
var wdc = require('../func/wdc');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var compression = require('compression');
var Spatial = require('../models/spatial');

router.use(compression());

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
/*
router.post('/tabdata', function(req, res, next) {
  var chunkReq = 1;
  if (req.body.page) {
    chunkReq = req.body.page;
  }
  var moreData = false;
  console.log("Page " + chunkReq);
  Spatial.findById(mongoose.Types.ObjectId(req.body.id), function (err, resp) {
    var attachmentCount = resp.attachments.length;
    if (chunkReq < attachmentCount) {
      moreData = true;
    }
    var chunkName = resp.attachments[chunkReq - 1].filename;
    if (chunkName.substring(0, 7) != "TabData") {
      res.status(201).json({
        message: 'Attachment found',
        moreData: moreData,
        currentChunk: chunkReq,
        chunksAvailable: attachmentCount,
        data: []
      });
    } else {
      resp.loadSingleAttachment(chunkName)
        .then(function(doc) {
          var buf = doc.attachments[chunkReq - 1].buffer
          var b = new Buffer(buf.toString("utf-8"), 'base64')
          var s = b.toString();
          res.status(201).json({
            message: 'Attachment found',
            moreData: moreData,
            currentChunk: chunkReq,
            chunksAvailable: attachmentCount,
            data: JSON.parse(s)
          });
        })
        .catch(function(err) {
          res.status(500).json({
            message: 'Error finding attachment ' + chunkName + ' for doc ' + req.body.id,
            error: err
          });
          return;
        });
      }
    });

});
*/
router.post('/tabdata', function(req, res, next) {
  console.log("Getting TabData "+req.body.id);
  Spatial.findById(mongoose.Types.ObjectId(req.body.id), function (err, resp) {
    for (var i = 0; i < resp.attachments.length; i++) {
      var rec = i;
      var attachment = resp.attachments[rec];
      var fileName = attachment.filename;
      console.log(fileName);
      console.log(fileName.substring(0, 7));
      if (fileName.substring(0, 7) === "TabData") {
        var foundId = rec;
        resp.loadSingleAttachment(fileName)
          .then(function(doc) {
            var buf = doc.attachments[foundId].buffer
            var b = new Buffer(buf.toString("utf-8"), 'base64')
            var s = b.toString();
            res.status(201).json({
              message: 'GeoJSON found',
              data: JSON.parse(s)
            });
          })
          .catch(function(err) {
            res.status(500).json({
              message: 'Error finding attachment ' + chunkName + ' for doc ' + req.body.id,
              error: err
            });
          });
      }
    }
  });
});

router.post('/geojson', function(req, res, next) {
  console.log("Getting GeoJSON "+req.body.id);
  Spatial.findById(mongoose.Types.ObjectId(req.body.id), function (err, resp) {
    for (var i = 0; i < resp.attachments.length; i++) {
      var rec = i;
      var attachment = resp.attachments[rec];
      var fileName = attachment.filename;
      if (fileName.substring(0, 7) === "GeoJSON") {
        var foundId = rec;
        console.log("Geojson found");
        resp.loadSingleAttachment(fileName)
          .then(function(doc) {
            console.log(doc.attachments[foundId]);
            var buf = doc.attachments[foundId].buffer
            console.log(buf);
            var b = new Buffer(buf.toString("utf-8"), 'base64')
            console.log(b);
            var s = b.toString();
            console.log("Sending response");
            res.status(201).json({
              message: 'GeoJSON found',
              data: JSON.parse(s)
            });
          })
          .catch(function(err) {
            res.status(500).json({
              message: 'Error finding attachment ' + chunkName + ' for doc ' + req.body.id,
              error: err
            });
          });
      }
    }
  });
});

router.use('/', function(req, res, next) {
  jwt.verify(req.headers.authorization, '+t{zTdd_WDfq *UEs15r{_FY|J 8#t&wj+FL},UUX-{Vs>+=`+SV#+nr RaJh+w}', function(err, decoded) {
    if (err) {
      return res.status(401).json({
        message: "Not Authenticated",
        error: err
      });
    }
    next();
  });
});

var storage = multer.diskStorage({ //multers disk storage settings
     destination: function (req, file, cb) {
         cb(null, '/tmp/');
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
     geo.geoJson(req.file, function(geojson) {
       console.log("Converted to GeoJSON");
       var bbox = geojson.bbox;
       wdc.getTableSchema(geojson, meta, function(schema) {
         console.log("Table Schema Built");
         geo.simplify(geojson, 0.01, function(simplified) {
           geo.simplify(geojson, 0.001, function(tabSimplified) {
        // console.log("GeoJSON simplified");
           geo.flatten(tabSimplified, function(flattened) {
             console.log("GeoJSON Flattened");
             //wdc.geojson2Tableau(flattened, function(tabData) {
              // console.log("Recieved Tableau Spatial Data");
              // geo.chunkTabData(tabData, function(chunks) {
                 var spatial = new Spatial ({
                   owner: user._id,
                   name: meta.name,
                   sourceUrl: meta.sourceUrl,
                   sourceDate: meta.sourceDate,
                   type: meta.type,
                   bbox: bbox,
                   country: meta.country,
                   continent: meta.contient,
                   tableSchema: schema/*,
                   tabData: createdFile._id*/
                 });
                 spatial.addAttachment('GeoJSON-' + meta.name, new Buffer(JSON.stringify(simplified), "utf-8"), 'application/json')
                  .then(function() {
                     spatial.addAttachment('TabData-' + meta.name, new Buffer(JSON.stringify(flattened), "utf-8"), 'application/json')
                      .then(function() {
                        spatial.save(function(err, result) {
                          res.status(201).json({
                            message: 'Spatial Object added to database'
                          });
                        });
                      });
                   });
               });
             });
           });
        // });
       });
     });
   });
});

router.post('/delete', function(req, res, next) {
  Spatial.findById(mongoose.Types.ObjectId(req.body.id), function (err, resp) {
    if (resp) {
      for (var i = 0; i < resp.attachments.length; i++) {
        var rec = i;
        var attachment = resp.attachments[rec];
        console.log(attachment);
        var fileName = attachment.filename;
        resp.removeAttachment(fileName)
        .then(function(doc) {
          if (rec == resp.attachments.length - 1) {
            resp.remove();
            res.status(201).json({
              message: 'Doc ' + req.body.id + ' deleted'
            });
          }
        })
        .catch(function(err) {
          res.status(500).json({
            message: 'Error deleting attachment ' + filename + ' for doc ' + req.body.id,
            error: err
          });
        });
      };
    } else {
      res.status(404).json({
        message: "Can't locate doc " + req.body.id
      });
    }
  });
});

module.exports = router;
