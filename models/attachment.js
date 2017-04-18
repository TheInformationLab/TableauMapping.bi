var mongoose = require('mongoose');
var gridfs = require('mongoose-gridfs')({
  collection:'spatials',
  model:'Attachment'
});

var AttachmentSchema = gridfs.schema;

//attach plugins
//ensure indexes

//register and export a model
module.export = mongoose.model('Attachment', AttachmentSchema);
