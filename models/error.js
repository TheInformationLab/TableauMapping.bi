var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var location = new Schema({
  ip: {type: String},
  country_code: {type: String},
  country_name: {type: String},
  region_code: {type: String},
  region_name: {type: String},
  city: {type: String},
  zip_code: {type: String},
  time_zone: {type: String},
  latitude: {type: Number},
  longitude: {type: Number},
  metro_code: {type: Number}
});

var schema = new Schema({
  severity: {type: String},
  message: {type: String},
  stack: {type: String},
  location: location,
  timestamp: {type: Date, default: Date.now }
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Error', schema);
