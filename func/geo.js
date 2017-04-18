var shp = require('shp2json-js');
var geobuf = require('geobuf');
var Pbf = require('Pbf');
var fs = require('fs');
var simplify = require('simplify-geojson');
var flatten = require('geojson-flatten');

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

geo.encodeAll = function(object, callback) {
  var ret = {};
  let objects = Object.keys(object);
  for (let item of objects) {
    var buffer = geobuf.encode(object[item], new Pbf());
    console.log(String(buffer).length);
    ret[item] = buffer;
    let retObjects = Object.keys(ret);
    if(retObjects.length == objects.length) {
      callback(ret);
    }
  }
}

geo.decode = function(buffer, callback) {
  console.log("Received Object");
  var geojson = geobuf.decode(new Pbf(buffer));
  console.log("Decode complete");
  callback(geojson);
}

geo.simplify = function(geojson, tolerance, callback) {
  var simplified = simplify(geojson, tolerance);
  callback(simplified);
}

geo.flatten = function(geojson, callback) {
  var flattened = flatten(geojson);
  callback(flattened);
}

module.exports = geo;
