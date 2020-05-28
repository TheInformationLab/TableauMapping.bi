var express = require('express');
var router = express.Router();
var SearchIndex = require('../models/index');

router.post('/index', function(req, res) {
  var searchTerm = req.body.term;
  SearchIndex.find({value: new RegExp(searchTerm, "ig")})
   .skip(0)
   .populate({
    path: 'spatial',
    select: {
      bbox : 1,
      continent : 1,
      country : 1,
      dateCreated : 1,
      name : 1,
      sourceDate : 1,
      sourceUrl : 1,
      tableSchema : 1,
      type : 1,
      _id : 1
    },
    populate: {
      path: 'owner',
      select: {
        company: 1,
        firstName: 1,
        lastName: 1,
        _id: 0
      }
    }
   })
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
