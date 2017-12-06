var flatten = require('geojson-flatten');
var geo = {};

geo.flatten = function(geojson, callback) {
  var flattened = flatten(geojson);
  callback(flattened);
}

module.exports = geo;
