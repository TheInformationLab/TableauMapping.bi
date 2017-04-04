var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  owner: {type: Schema.Types.ObjectId, ref: 'User'},
  name: {type: String},
  dateCreated: {type: Date, default: Date.now },
  sourceUrl: {type: String},
  sourceDate: {type: Date},
  type: {type: String},
  bbox: {type: String},
  country: {type: String},
  continent: {type: String},
  data: {type: Buffer}
});

module.exports = mongoose.model('Spatial', schema);
