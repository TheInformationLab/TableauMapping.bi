var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  name: {type: String},
  value: {type: String},
  spatial: {type: Schema.Types.ObjectId, ref: 'Spatial'},
  centroid: {type: String}
});

schema.index({name: 'text', value: 'text'});

module.exports = mongoose.model('Index', schema);
