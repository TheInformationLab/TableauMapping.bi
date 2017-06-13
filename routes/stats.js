var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Stat = require('../models/stat');

router.post('/record', function(req, res, next) {
  var stat = new Stat({
    action: req.body.action,
    spatial: mongoose.Types.ObjectId(req.body.spatial),
    location: req.body.location
  });
  stat.save(function(err, result) {
    if (err) {
      return res.status(500).json({
        message: 'Error storing '+req.body.action+' stat',
        error: err
      });
    }
    res.status(201).json({
      message: req.body.action + ' stat stored'
    });
  });
});

module.exports = router;
