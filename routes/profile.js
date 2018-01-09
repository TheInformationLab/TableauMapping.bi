var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var User = require('../models/user');

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

router.get('/', function (req, res, next) {
  var secret = process.env.JWTSECRET || '+t{zTdd_WDfq *UEs15r{_FY|J 8#t&wj+FL},UUX-{Vs>+=`+SV#+nr RaJh+w}';
  jwt.verify(req.headers.authorization, secret, function(err, decoded) {
    console.log(decoded);
    User.findOne({_id: decoded.user._id}, function(err, user) {
      if (user) {
        res.status(201).json({
          message: 'User found',
          user: user
        });
      } else {
        return res.status(404).json({
          message: 'User not found',
          user: decoded.user._id
        });
      }
    });
  });
});

router.patch('/', function (req, res, next) {
  var secret = process.env.JWTSECRET || '+t{zTdd_WDfq *UEs15r{_FY|J 8#t&wj+FL},UUX-{Vs>+=`+SV#+nr RaJh+w}';
  jwt.verify(req.headers.authorization, secret, function(err, decoded) {
    User.findOne({_id: decoded.user._id}, function(err, user) {
      if (user) {
        user.firstName = req.body.firstName || user.firstName;
        user.lastName = req.body.lastName || user.lastName;
        user.company = req.body.company || user.company;
        user.email = req.body.email || user.email;
        user.mapboxAccessToken = req.body.mapboxAccessToken || user.mapboxAccessToken;
        user.mapboxUsername = req.body.mapboxUsername || user.mapboxUsername;
        user.save(function(err, result) {
          if (err) {
            return res.status(500).json({
              message: 'Error updating user',
              error: err
            });
          }
          var secret = process.env.JWTSECRET || '+t{zTdd_WDfq *UEs15r{_FY|J 8#t&wj+FL},UUX-{Vs>+=`+SV#+nr RaJh+w}';
          var token = jwt.sign({user: result}, secret, {expiresIn: 72000});
          res.status(200).json({
            message: "User updated",
            token: token
          });
        });
      } else {
        return res.status(404).json({
          message: 'User not found',
          user: decoded.user._id
        });
      }
    });
  });
});

module.exports = router;
