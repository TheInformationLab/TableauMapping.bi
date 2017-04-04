var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var User = require('../models/user');

router.post('/create', function (req, res, next) {
    var user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      company: req.body.company,
      password: bcrypt.hashSync(req.body.password, 10),
      email: req.body.email
    });
    user.save(function(err, result) {
      if (err) {
        return res.status(500).json({
          message: 'Error creating new user',
          error: err
        });
      }
      res.status(201).json({
        message: 'User created',
        obj: result
      });
    });
});

router.post('/signin', function (req, res, next) {
  User.findOne({email: req.body.email}, function(err, user) {
    if (err) {
      return res.status(500).json({
        message: 'Error finding user',
        error: err
      });
    }
    if (!user) {
      return res.status(401).json({
        message: 'Login failed',
        error: {message: 'Invalid login credentials'}
      });
    }
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).json({
        message: 'Login failed',
        error: {message: 'Invalid login credentials'}
      });
    }
    var token = jwt.sign({user: user}, '+t{zTdd_WDfq *UEs15r{_FY|J 8#t&wj+FL},UUX-{Vs>+=`+SV#+nr RaJh+w}', {expiresIn: 7200});
    res.status(200).json({
      message: "Logged in",
      token: token,
      userId: user._id
    });
  });
});

module.exports = router;
