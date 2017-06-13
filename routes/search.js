var express = require('express');
var router = express.Router();
var SearchIndex = require('../models/index');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var Spatial = require('../models/spatial');
var SearchIndex = require('../models/index');

router.post('/index', function(req, res, next) {
  var searchTerm = req.body.term;
  SearchIndex.find({value: new RegExp(searchTerm, "ig")})
   .skip(0)
   .limit(16)
   .populate('spatial')
   .exec(function(err, docs) {
     if (err) {
       res.status(500).json({
         message: 'Error finding spatial objects',
         error: err
       });
       //mongoose.connection.close();
       return;
     }
     res.status(201).json({
       message: 'Found index items',
       items: docs
     });
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

router.post('/create', function(req, res, next) {
  console.log(req.body);
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
      var buildIndex = req.body.index;
      console.log("Indexing " + spatial.country + " ~ " + spatial.name);
      var initial = [{name: 'continent', value: spatial.continent, spatial: spatial._id},
                    {name: 'country', value: spatial.country, spatial: spatial._id},
                    {name: 'name', value: spatial.name, spatial: spatial._id},
                    {name: 'sourceUrl', value: spatial.sourceUrl, spatial: spatial._id},
                    {name: 'type', value: spatial.type, spatial: spatial._id}];
      buildIndex = buildIndex.concat(initial);
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
