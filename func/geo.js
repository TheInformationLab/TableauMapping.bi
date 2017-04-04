var shp = require('shp2json-js');
var geobuf = require('geobuf');
var Pbf = require('Pbf');
var fs = require('fs');

var geo = {};

geo.geoJson = function(path, callback) {
  fs.readFile(path, function (err, data ) {
    shp(data).then(function(geojson) {
      callback(geojson)
    });
  });
}

geo.encode = function(geojson, callback) {
  var buffer = geobuf.encode(geojson, new Pbf());
  callback(buffer);
}

geo.dencode = function(buffer, callback) {
  var geojson = geobuf.decode(new Pbf(data));
  callback(geojson);
}

module.exports = geo;
