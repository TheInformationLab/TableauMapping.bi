var mongoose = require('mongoose');
var gridStore = require('mongoose-gridstore');

var Schema = mongoose.Schema;

var columnSchema = new Schema({
  id: {type: String},
  dataType: {type: String},
  columnRole: {type: String},
  columnType: {type: String},
  alias: {type: String}
});

var schema = new Schema({
  owner: {type: Schema.Types.ObjectId, ref: 'User'},
  name: {type: String},
  dateCreated: {type: Date, default: Date.now },
  sourceUrl: {type: String},
  sourceDate: {type: Date},
  type: {type: String},
  bbox: {type: Array},
  country: {type: String},
  continent: {type: String},
  tableSchema: {
    id: {type: String},
    alias: {type: String},
    columns: [columnSchema]
  }/*,
  tabData: {type: String}*/
});

schema.plugin(gridStore, {
  mongoose: mongoose
});

module.exports = mongoose.model('Spatial', schema);
