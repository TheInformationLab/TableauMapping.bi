var mongoose = require('mongoose');
var crate = require('mongoose-crate');
var LocalFS = require('mongoose-crate-localfs');

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
  bbox: {type: String},
  country: {type: String},
  continent: {type: String},
  tableSchema: {
    id: {type: String},
    alias: {type: String},
    columns: [columnSchema]
  }/*,
  tabData: {type: String}*/
});

schema.plugin(crate, {
  storage: new LocalFS({
    directory: './data'
  }),
  fields: {
    attachment: {}
  }
})

module.exports = mongoose.model('Spatial', schema);
