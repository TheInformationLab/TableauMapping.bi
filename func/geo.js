var shp = require('shp2json-js');
var fs = require('fs');

var geo = {};

geo.geoJson = function(path, callback) {
  fs.readFile(path, function (err, data ) {
    shp(data).then(function(geojson) {
      console.log(geojson);
      callback(geojson)
    });
  });
}

module.exports = geo;
