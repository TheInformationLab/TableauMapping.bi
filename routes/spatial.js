var express = require('express');
var router = express.Router();
var path = require("path");
var fs = require('fs');
var wdc = require('../func/wdc');
var mapbox = require('../func/mapbox');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var Spatial = require('../models/spatial');

router.get('/meta', function(req, res) {
  Spatial.find({"name": { $ne: "The Information Lab" }, "isPublic": { $eq: true}})
    .select('bbox continent country dateCreated name owner sourceDate sourceUrl type tableSchema')
    .populate({
      path: 'owner',
      select: {
        company: 1,
        firstName: 1,
        lastName: 1,
        _id: 0
      }
    })
    .exec(function (err, spatials) {
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
  Spatial.findById(mongoose.Types.ObjectId(id))
         .populate({
           path: 'owner'
         })
         .exec(function (err, resp) {
            mapbox.getDataset(resp.mapboxid, resp.owner.mapboxUsername, resp.owner.mapboxAccessToken, function(geojson) {
              callback(null, geojson);
            });
          });
}

router.post('/data', function(req, res) {
  Spatial.findById(mongoose.Types.ObjectId(req.body.id))
    .populate({
      path: 'owner',
      select: {
        company: 1,
        firstName: 1,
        lastName: 1,
        _id: 0
      }
    })
    .exec(function (err, obj) {
      if (err) {
        return res.status(404).json({
          message: 'Data not found',
          error: err
        });
      }
      fs.readFile('/tmp/data/' + req.body.id, 'utf8', function (fileErr, geojson) {
        if(fileErr) {
          getData(req.body.id, function(getDataErr, resp) {
            if (getDataErr) {
              console.log(getDataErr);
            }
            fs.writeFile('/tmp/data/' + req.body.id, JSON.stringify(resp), 'utf8', function(writeErr) {
              if (writeErr) {
                console.log(writeErr);
              }
              res.status(201).json({
                message: 'Data found',
                meta: obj,
                data: resp
              });
            });
          });
        } else {
          res.status(201).json({
            message: 'Data found',
            meta: obj,
            data: JSON.parse(geojson)
          });
        }
      });
    });
});

router.use('/', function(req, res, next) {
  var secret = process.env.JWTSECRET || '+t{zTdd_WDfq *UEs15r{_FY|J 8#t&wj+FL},UUX-{Vs>+=`+SV#+nr RaJh+w}';
  jwt.verify(req.headers.authorization, secret, function(err) {
    if (err) {
      return res.status(401).json({
        message: "Not Authenticated",
        error: err
      });
    }
    next();
  });
});

router.post('/save', function(req, res) {
   var meta = req.body;
   var secret = process.env.JWTSECRET || '+t{zTdd_WDfq *UEs15r{_FY|J 8#t&wj+FL},UUX-{Vs>+=`+SV#+nr RaJh+w}';
   var user = jwt.verify(req.headers.authorization, secret);
   user = user.user;
   mapbox.getMeta(meta.mapboxid, user.mapboxUsername, user.mapboxAccessToken, function(geojson) {
     wdc.getTableSchema(geojson, meta, function(schema) {
       console.log("Table Schema Built");
       var spatial = new Spatial ({
         owner: user._id,
         name: meta.name,
         sourceUrl: meta.sourceUrl,
         sourceDate: meta.sourceDate,
         type: meta.type,
         bbox: meta.bbox,
         country: meta.country,
         continent: meta.continent,
         mapboxid: meta.mapboxid,
         agreement: meta.agreement,
         tableSchema: schema
       });
       spatial.save(function(err) {
         if (err) {
           return res.status(502).json({
             message: 'Error adding spatial object to database',
             error: err
           });
         }
         res.status(201).json({
           message: 'Spatial Object added to database'
         });
       });
     });
   });
});

router.put('/save', function(req, res) {
   var meta = req.body;
   var secret = process.env.JWTSECRET || '+t{zTdd_WDfq *UEs15r{_FY|J 8#t&wj+FL},UUX-{Vs>+=`+SV#+nr RaJh+w}';
   var user = jwt.verify(req.headers.authorization, secret);
   user = user.user;
   Spatial.findById(mongoose.Types.ObjectId(meta._id), function(err, spatial) {
     mapbox.getMeta(meta.mapboxid, user.mapboxUsername, user.mapboxAccessToken, function(geojson) {
       wdc.getTableSchema(geojson, meta, function(schema) {
         console.log("Table Schema Built");
         console.log(schema);
         spatial.isPublic = meta.isPublic || false;
         spatial.name = meta.name;
         spatial.sourceUrl = meta.sourceUrl;
         spatial.sourceDate = meta.sourceDate;
         spatial.type = meta.type;
         spatial.bbox = meta.bbox;
         spatial.country = meta.country;
         spatial.continent = meta.continent;
         spatial.mapboxid = meta.mapboxid;
         spatial.agreement = meta.agreement;
         spatial.tableSchema = schema;
         spatial.save(function(err) {
           if (err) {
             return res.status(502).json({
               message: 'Error updating spatial object',
               error: err
             });
           }
           res.status(201).json({
             message: 'Spatial Object updated'
           });
         });
       });
     });
   });
});

router.get('/datasets', function(req, res) {
   var secret = process.env.JWTSECRET || '+t{zTdd_WDfq *UEs15r{_FY|J 8#t&wj+FL},UUX-{Vs>+=`+SV#+nr RaJh+w}';
   var user = jwt.verify(req.headers.authorization, secret);
   user = user.user;
   mapbox.getDatasets(user.mapboxUsername, user.mapboxAccessToken, function(datasets) {
     if (datasets.length > 0) {
       res.status(200).json({
         message: 'Datasets found',
         datasets: datasets
       });
     } else {
       res.status(404).json({
         message: 'No datasets found'
       });
     }
   });
});

router.get('/user/meta', function(req, res) {
  var secret = process.env.JWTSECRET || '+t{zTdd_WDfq *UEs15r{_FY|J 8#t&wj+FL},UUX-{Vs>+=`+SV#+nr RaJh+w}';
  var user = jwt.verify(req.headers.authorization, secret);
  user = user.user;
  Spatial.find({owner: user._id}, function(err, docs) {
    if (err) {
      res.status(500).json({
        message: 'Error finding spatial objects',
        error: err
      });
      return;
    }
    res.status(201).json({
      message: 'Result',
      spatials: docs
    });
  });
});

router.post('/cache/create', function (req, res) {
  const { spawn } = require('child_process');
  spawn('node', [path.join(__dirname, '../func/', 'cache.js')]);
  res.status(201).json({
    message: 'Cache started. Check status for updates'
  });
});

router.get('/cache/status', function (req, res) {
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

module.exports = router;
