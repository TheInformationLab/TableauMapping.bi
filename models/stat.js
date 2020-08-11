var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var location = new Schema({
  ip: {type: String},
  country_code2: {type: String},
  country_name: {type: String},
  continent_code: {type: String},
  continent_name: {type: String},
  city: {type: String},
  zipcode: {type: String},
  latitude: {type: Number},
  longitude: {type: Number}
});

var schema = new Schema({
  action: {type: String, required: true},
  spatial: {type: Schema.Types.ObjectId, ref: 'Spatial'},
  location: location,
  term: {type: String},
  timestamp: {type: Date, default: Date.now }
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Stat', schema);
