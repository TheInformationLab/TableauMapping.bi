var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Error = require('../models/error');

router.post('/record', function(req, res, next) {
  var error = new Error({
    severity: req.body.severity,
    message: req.body.message,
    stack: req.body.stack,
    location: req.body.location
  });
  error.save(function(err, result) {
    if (err) {
      return res.status(500).json({
        message: "Can't record error",
        error: err
      });
    }
    res.status(201).json({
      message: 'Error recorded'
    });
  });
});

module.exports = router;
