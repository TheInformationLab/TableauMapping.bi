var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require("path");
var fs = require('fs');
var geo = require('../func/geo');
var wdc = require('../func/wdc');
var mapbox = require('../func/mapbox');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var compression = require('compression');
var Spatial = require('../models/spatial');
var SearchIndex = require('../models/index');

router.use(compression());

router.get('/meta', function(req, res, next) {
  var query = Spatial.find({"name": { $ne: "The Information Lab" }}).select('bbox continent country dateCreated name owner sourceDate sourceUrl type tableSchema');
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

var getData = function(id, callback) {
  console.log("Getting " +id);
  Spatial.findById(mongoose.Types.ObjectId(id), function (err, resp) {

    mapbox.getDataset(resp.mapboxid, function(geojson) {
      callback(null, geojson);
    });

  });
}

router.post('/data', function(req, res, next) {
  fs.readFile('/tmp/data/' + req.body.id, 'utf8', function (fileErr, geojson) {
    console.log(fileErr);
    if(fileErr) {
      getData(req.body.id, function(err, resp) {
        console.log(err);
        fs.writeFile('/tmp/data/' + req.body.id, JSON.stringify(resp), 'utf8', function(err) {
          res.status(201).json({
            message: 'Data found',
            data: resp
          });
        });
      });
    } else {
      res.status(201).json({
        message: 'Data found',
        data: JSON.parse(geojson)
      });
    }
  });
});

router.use('/', function(req, res, next) {
  var secret = process.env.JWTSECRET || '+t{zTdd_WDfq *UEs15r{_FY|J 8#t&wj+FL},UUX-{Vs>+=`+SV#+nr RaJh+w}';
  jwt.verify(req.headers.authorization, secret, function(err, decoded) {
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

router.post('/save', function(req, res, next) {
   var meta = req.body;
   var secret = process.env.JWTSECRET || '+t{zTdd_WDfq *UEs15r{_FY|J 8#t&wj+FL},UUX-{Vs>+=`+SV#+nr RaJh+w}';
   var user = jwt.verify(req.headers.authorization, secret);
   user = user.user;
   mapbox.getMeta(meta.mapboxId, function(geoMeta) {
     console.log(geoMeta);
     if (geoMeta.message) {
       res.status(404).json({
         message: 'No Dataset'
       });
       return;
     }
     mapbox.getDataset(meta.mapboxId, function(geojson) {
       console.log("Converted to GeoJSON");
       geo.flatten(geojson, function(flattened) {
         console.log("Geojson flattened");
         wdc.getTableSchema(flattened, meta, function(schema) {
           console.log("Table Schema Built");
           var spatial = new Spatial ({
             owner: user._id,
             name: meta.name,
             sourceUrl: meta.sourceUrl,
             sourceDate: meta.sourceDate,
             type: meta.type,
             bbox: geoMeta.bounds,
             country: meta.country,
             continent: meta.contient,
             mapboxid: meta.mapboxId,
             tableSchema: schema
           });
           spatial.save(function(err, result) {
             fs.writeFile('/tmp/data/' + result._id, JSON.stringify(geojson), 'utf8', function(err) {
               res.status(201).json({
                 message: 'Spatial Object added to database'
               });
             });
           });
         });
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
            //mongoose.connection.close();
            var myID = req.body.id;
            SearchIndex.remove({spatial: mongoose.Types.ObjectId(myID.trim())}, function(err) {
              if (err) {
                res.status(500).json({
                  message: 'Error deleting cache for doc ' + req.body.id,
                  error: err
                });
                return;
              }
              res.status(201).json({
                message: 'Doc ' + req.body.id + ' deleted'
              });
            });
          }
        })
        .catch(function(err) {
          //mongoose.connection.close();
          res.status(500).json({
            message: 'Error deleting attachment ' + filename + ' for doc ' + req.body.id,
            error: err
          });
        });
      };
    } else {
      //mongoose.connection.close();
      res.status(404).json({
        message: "Can't locate doc " + req.body.id
      });
    }
  });
});

router.post('/cache/create', function (req, res, next) {
  const { spawn } = require('child_process');
  const ls = spawn('node', [path.join(__dirname, '../func/', 'cache.js')]);
  res.status(201).json({
    message: 'Cache started. Check status for updates'
  });
});

router.get('/cache/status', function (req, res, next) {
  fs.readFile('/tmp/caching.txt', 'utf8', function (fileErr, cache) {
    if(fileErr) {
      res.status(500).json({
        message: 'Error finding cache status',
        error: fileErr
      });
      return;
    }
    res.status(201).json({
      message: 'Cache status',
      status: JSON.parse('['+cache+']')
    });
  });
});

router.post('/index', function(req, res, next) {
  SearchIndex.remove({spatial: mongoose.Types.ObjectId(req.body.id)}, function(err) {
    if (err) {
      //mongoose.connection.close();
      return res.status(500).json({
        message: 'Error clearing index',
        error: err
      });
    }
    console.log("Index Cleared");
    Spatial.findById(mongoose.Types.ObjectId(req.body.id), function (err, spatial) {
      if (err) {
        //mongoose.connection.close();
        return res.status(500).json({
          message: 'Error finding spatial object ' + req.body.id,
          error: err
        });
      }
      var buildIndex = [];
      console.log("Indexing " + spatial.country + " ~ " + spatial.name);
      var initial = [{name: 'continent', value: spatial.continent, spatial: spatial._id},
                    {name: 'country', value: spatial.country, spatial: spatial._id},
                    {name: 'name', value: spatial.name, spatial: spatial._id},
                    {name: 'sourceUrl', value: spatial.sourceUrl, spatial: spatial._id},
                    {name: 'type', value: spatial.type, spatial: spatial._id}];
      buildIndex = buildIndex.concat(initial);
      getGeojson(spatial._id, function(err, resp) {
        if (err) {
          //mongoose.connection.close();
          return res.status(500).json({
            message: 'Error finding attachment for doc ' + req.body.id,
            error: err
          });
        }
        parseFeatures(resp, spatial._id, function(features) {
          buildIndex = buildIndex.concat(features);
          console.log("Index size = " + buildIndex.length);
          console.log("Saving Index");
          var i,j,chunk = 20000;
          var temparray = [];
          var savedCount = 0;
          for (i=0,j=buildIndex.length; i<j; i+=chunk) {
            temparray = buildIndex.slice(i,i+chunk);
            console.log("Saving " + temparray.length + " records");
            SearchIndex.create(temparray, function(err, docs) {
              if (err) {
                //mongoose.connection.close();
                console.log(err);
                return res.status(500).json({
                  message: 'Error saving index',
                  error: err
                });
              }
              savedCount = savedCount + docs.length;
              console.log("Saved " + savedCount + " of " + j);
              if(savedCount == buildIndex.length) {
              //mongoose.connection.close();
                res.status(201).json({
                  message: 'Index updated'
                });
              }
            });
          }
        });
      });
    });
  });
});

var parseFeatures = function(geojson, id, callback) {
  var featureList = [];
  var features = geojson.features;
  var featureCounter = 0;
  for (var feature of features) {
    for (var property in feature.properties) {
      var obj = {
        name: property,
        value: feature.properties[property],
        spatial: id
      }
      featureList.push(obj);
    }
    featureCounter = featureCounter + 1;
    if (featureCounter == features.length) {
      callback(featureList);
    }
  }
}

module.exports = router;
