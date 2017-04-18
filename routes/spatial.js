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
             console.log("Array size: " + flattened.features.length);
             geo.simplify(flattened, 0.001, function(simplified) {
               console.log("GeoJSON simplified");
               wdc.geojson2Tableau(simplified, function(tabData) {
                 console.log("Recieved Tableau Spatial Data");
                 geo.chunkTabData(tabData, function(chunks) {
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
                   var chunkCount = 0;
                   console.log("There are " + chunks.length + " attachements");
                   for (chunk of chunks) {
                     console.log("Adding attachment " + chunkCount + " to Mongo");
                     if (chunkCount + 1 === chunks.length) {
                       spatial.addAttachment(meta.name + "-" + chunkCount, new Buffer(JSON.stringify(chunk), "utf-8"), 'application/json')
                        .then(function() {
                          spatial.save(function(err, result) {
                            //console.log(result);
                            if (err) {
                              res.status(500).json({
                                message: 'Error creating new spatial object',
                                error: err
                              });
                              return;
                            }
                            res.status(201).json({
                              message: 'Spatial Object added to database'
                            });
                          });
                        });
                     } else {
                       spatial.addAttachment(meta.name + "-" + chunkCount, new Buffer(JSON.stringify(chunk), "utf-8"), 'application/json');
                       chunkCount = chunkCount + 1
                     }
                   }
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
    /*resp.partialLoadAttachments()
    .then(function(doc) {
      console.log(doc);
    })*/
    resp.loadSingleAttachment(chunkName)
    .then(function(doc) {
      var buf = doc.attachments[chunkReq - 1].buffer
      var b = new Buffer(buf.toString("utf-8"), 'base64')
      var s = b.toString();;
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
    /*
        if(err) {

        }
        if(!resp) {
          res.status(404).json({
            message: "Can't find spatial object " + req.body.id
          });
          return;
        }*/
    });

});

module.exports = router;
