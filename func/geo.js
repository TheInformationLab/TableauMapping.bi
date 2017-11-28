var shp = require('shp2json-js');
var geobuf = require('geobuf');
var Pbf = require('pbf');
var fs = require('fs');
var simplify = require('simplify-geojson');
var flatten = require('geojson-flatten');
var Base64 = require('@ronomon/base64');
const decompress = require('decompress');
var shp = require('gtran-shapefile');
var gtran = require('gtran');
var TextDecoder = require('text-encoding').TextDecoder;
var TextEncoder = require('text-encoding').TextEncoder;
var geo = {};

var deleteFolderRecursive = function(path, callback) {
  if( fs.existsSync(path) ) {
    fs.readdirSync(path).forEach(function(file,index){
      var curPath = path + "/" + file;
      if(fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
    callback();
  }
};

geo.geoJson = function(file, callback) {
  var filenm = file.filename;
  if(filenm.substr(filenm.length - 3) == "zip") {
    var folder = file.filename;
    folder = "/tmp/" + folder.replace(".zip","");
    decompress(file.path, folder).then(function (files)
    {
      var shpFile = "";
      for (file of files) {
        var filename = file.path;
        var filename = filename.toLowerCase();
        if (filename.substr(filename.length - 3) == "shp") {
          shpFile = folder + "/" + file.path;
        }
      }
      console.log(shpFile);
      gtran.fromShp(shpFile).then(geojson => {
        fs.unlink(file.path, function() {
          deleteFolderRecursive(folder, function() {
            callback(geojson);
          });
        });
      }).catch(function (err) {
         console.log("Error with shapefile conversion", JSON.stringify(err));
      });
    }).catch(function () {
       console.log("Error with decompress");
    });
  } else if (filenm.substr(filenm.length - 7) == "geojson") {
    fs.readFile('/tmp/' + filenm, 'utf8', function (fileErr, geojson) {
      if (fileErr) { console.log(fileErr) }
      else {
        callback(JSON.parse(geojson));
      }
    });
  }
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
  var chunkSize = 5000;
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

module.exports = geo;
