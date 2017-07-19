var express = require('express');
var router = express.Router();
var request = require('request');
var md5 = require("blueimp-md5");

router.post('/subscribe', function(req, res, next) {
  var body = {
  	"email_address": req.body.email,
  	"status_if_new": "subscribed"
  }
  var options = {
    method: 'PUT',
    url: "https://us2.api.mailchimp.com/3.0/lists/fc1dab699f/members/" + md5(req.body.email),
    headers:
     { authorization: 'Basic YWJjOjQ5ZDRkMTZkNDA1OThkMTkxNzNkMzJiMjM3M2NjNGE3LXVzMg==',
     'content-type': 'application/json'},
    body: JSON.stringify(body)
    }
  request(options, function (error, response, body) {
    if (error != {} && error && error != null && JSON.stringify(error).length > 2) {
      return res.status(500).json({
        message: 'Error adding new subscriber',
        error: error
      });
    }
    res.status(201).json({
      message: 'User Subscribed',
      obj: JSON.parse(body)
    });
  });
});

module.exports = router;
