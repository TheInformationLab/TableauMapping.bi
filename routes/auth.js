var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var crypto = require('crypto');
var nodemailer = require('nodemailer');

var User = require('../models/user');

router.post('/create', function (req, res) {
  User.find({email: req.body.email}, function(err, obj) {
    if (obj.length > 0) {
      return res.status(500).json({
        message: 'Error creating new user',
        error: 'Email already registered'
      });
    }
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
});

router.post('/signin', function (req, res) {
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
        error: 'Invalid login credentials'
      });
    }
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).json({
        message: 'Login failed',
        error: 'Invalid login credentials'
      });
    }
    var secret = process.env.JWTSECRET || '+t{zTdd_WDfq *UEs15r{_FY|J 8#t&wj+FL},UUX-{Vs>+=`+SV#+nr RaJh+w}';
    var token = jwt.sign({user: user}, secret, {expiresIn: 72000});
    res.status(200).json({
      message: "Logged in",
      token: token,
      userId: user._id
    });
  });
});

router.post('/reset', function (req, res) {
  User.findOne({email: req.body.email}, function(err, user) {
    if (err) {
      return res.status(500).json({
        message: 'Error finding user',
        error: err
      });
    }
    if (!user) {
      return res.status(401).json({
        message: 'Error finding user'
      });
    }
    crypto.randomBytes(32, function(err, buf) {
      var token = buf.toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        user.save(function(err) {
          if (err) {
            return res.status(500).json({
              message: 'Error saving reset token',
              error: err
            });
          }
          let smtpConfig = {
              host: 'smtp.sendgrid.net',
              port: 465,
              secure: true, // upgrade later with STARTTLS
              auth: {
                  user: 'apikey',
                  pass: 'SG.AG0xvxC7Rae2eB709FEe8w.e_XlS02W6aGwulU8F07TGjRB1zeqC7GlKhwl4_l7jdI'
              }
          };
          var smtpTransport = nodemailer.createTransport(smtpConfig);
          var mailOptions = {
            to: user.email,
            from: 'reset@tableaumapping.bi',
            subject: 'TableauMapping.bi Password Reset',
            text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
              'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
              'http://' + req.headers.host + '/auth/reset/' + token + '\n\n' +
              'If you did not request this, please ignore this email and your password will remain unchanged.\n'
          };
          smtpTransport.sendMail(mailOptions, function(err) {
            if (err) {
              return res.status(500).json({
                message: 'Error emailing reset token',
                error: err
              });
            }
            res.status(200).json({
              message: "Reset email sent"
            });
          });
        });
      });
  });
});

router.put('/reset', function (req, res) {
  User.findOne({resetPasswordToken: req.body.token}, function(err, user) {
    if (err) {
      return res.status(500).json({
        message: 'Error finding user',
        error: err
      });
    }
    if (!user) {
      return res.status(401).json({
        message: 'Token Error',
        error: 'Invalid reset token'
      });
    }
    if (!user.resetPasswordExpires) {
      return res.status(401).json({
        message: 'Token Error',
        error: 'Invalid reset expiry time'
      });
    }
    if (user.resetPasswordExpires < Date.now()) {
      return res.status(401).json({
        message: 'Token Error',
        error: 'Reset token expired'
      });
    }
    user.password = bcrypt.hashSync(req.body.newPassword, 10) || user.password;
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
        message: "Password updated",
        token: token
      });
    });
  });
});


module.exports = router;
