var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  company: {type: String},
  password: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  spatials: [{type: Schema.Types.ObjectId, ref: 'Spatial'}],
  mapboxAccessToken: {type: String},
  mapboxUsername: {type: String},
  resetPasswordToken: {type: String, unique: false},
  resetPasswordExpires: {type: Date, default: Date.now }
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', schema);
