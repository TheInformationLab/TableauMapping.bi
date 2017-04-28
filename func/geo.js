var shp = require('shp2json-js');
var geobuf = require('geobuf');
var Pbf = require('pbf');
var fs = require('fs');
var simplify = require('simplify-geojson');
var flatten = require('geojson-flatten');
var turf = require('@turf/turf');
var Base64 = require('@ronomon/base64');
var TextDecoder = require('text-encoding').TextDecoder;
var TextEncoder = require('text-encoding').TextEncoder;
var geo = {};

geo.geoJson = function(path, callback) {
  fs.readFile(path, function (err, data ) {
    shp(data).then(function(geojson) {
      callback(geojson)
    });
  });
}

geo.encode = function(geojson, callback) {
  var u8Arr = geobuf.encode(geojson, new Pbf());
  var string = new TextDecoder("utf-8").decode(u8Arr);
  callback(string);
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
  console.log(buffer);
  var b = new Buffer(buffer.toString("utf-8"))
  var s = buffer.toString();
  console.log(s);
  var uint8array = new TextEncoder().encode(s);
  console.log(Buffer.from(uint8array));
  var geojson = geobuf.decode(new Pbf(Buffer.from(uint8array)));
  //console.log(geojson);
  callback(geojson);
}

geo.simplify = function(geojson, tolerance, callback) {
  var simplified = simplify(geojson, tolerance, true);
  callback(simplified);
}

geo.flatten = function(geojson, callback) {
  var flattened = flatten(geojson);
  callback(flattened);
}

geo.chunkTabData = function(tabData, callback) {
  var retArray = [];
  console.log("TabData has " + tabData.length + " records");
  var chunkSize = 10000;
  while (tabData.length > 0) {
    var chunk = [];
    chunk = tabData.slice(0,chunkSize - 1);
    retArray.push(chunk);
    tabData = tabData.slice(chunkSize);
    if (tabData.length === 0) {
      callback(retArray);
    }
  }
}

geo.bbox = function(geojson, callback) {
  var bbox = turf.bbox(geojson);
  callback(bbox);
}

module.exports = geo;
