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


module.exports = router;
