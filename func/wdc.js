var geojsonConvert = require('geojson2csv');
var fs = require('fs');
const bfj = require('bfj');

var wdc = {};

wdc.getTableSchema = function(geojson, meta, callback) {
  let schema = {};
  schema.alias = meta.continent + " | " + meta.country + " | " + meta.name;
  getTableColumns(geojson.features[0].properties, function(columns) {
    schema.columns = columns;
    callback(schema);
  });
}

var getTableColumns = function(properties, callback) {
  let cols = [];
  let headers = Object.keys(properties);
  for (let header of headers) {
    let schema = {};
    schema.id = header;
    schema.dataType = "string";
    schema.columnRole = "dimension";
    schema.columnType = "discrete";
    cols.push(schema);
  }
  cols.push({
    id: "latitude",
    dataType: "float",
    columnRole: "measure",
    columnType: "continuous",
    alias: "-> Latitude",
    aggType: "avg"
  });
  cols.push({
    id: "longitude",
    dataType: "float",
    columnRole: "measure",
    columnType: "continuous",
    alias: "-> Longitude",
    aggType: "avg"
  });
  cols.push({
    id: "polygonId",
    dataType: "int",
    columnRole: "dimension",
    columnType: "discrete",
    alias: "-> Polygon ID"
  });
  cols.push({
    id: "subPolygonId",
    dataType: "int",
    columnRole: "dimension",
    columnType: "discrete",
    alias: "-> Sub Polygon ID"
  });
  cols.push({
    id: "path",
    dataType: "int",
    columnRole: "dimension",
    columnType: "continuous",
    alias: "-> Path"
  });
  callback(cols);
}

wdc.geojson2Tableau = function(geojson, callback) {
  fs.writeFile('./parseTemp/geojson.json', JSON.stringify(geojson), function() {
    PolygonID(geojson, function(polygons) {
      fs.writeFile('./parseTemp/polygons.json', JSON.stringify(polygons), function() {
        SubPolygonID(polygons, function(subPolygons) {
          fs.writeFile('./parseTemp/subpolygons.json', JSON.stringify(subPolygons), function() {
            parseCoordinates(subPolygons, function(resp) {
              callback(resp);
            });
          });
        });
      });
    });
  });
}

var PolygonID = function(geojson, callback) {
  var retProps = [];
  var features = geojson.features;
  for (var i = 0.; i < features.length; i++) {
    var feature = features[i];
    var obj = {};
    var headers = Object.keys(feature.properties);
    for (header of headers) {
      obj[header] = feature.properties[header];
    }
    obj["coordinates"] = feature.geometry.coordinates;
    obj["polygonId"] = i;
    retProps.push(obj);
    if (retProps.length === geojson.features.length) {
      callback(retProps);
    }
  }
}

var SubPolygonID = function(polygons, callback) {
  var subPolygonCount = 0;
  var activeCount = 0;
  var subPolyRet = [];
  for (polygon of polygons) {
    subPolygonCount = subPolygonCount + polygon.coordinates.length;
  }
  for (polygon of polygons) {
    var subPolygons = polygon.coordinates;
    var subPolygonId = 0;
    delete polygon.coordinates;
    for (subPolygon of subPolygons) {
      var obj = {};
      subPolygonId = subPolygonId + 1;
      obj.subPolygon = subPolygon;
      obj.subPolygonId = subPolygonId;
      obj = Object.assign(obj, polygon);
      subPolyRet.push(obj);
      activeCount = activeCount + 1;
      if (activeCount === subPolygonCount) {
        callback(subPolyRet);
      }
    }
  }
}

var parseCoordinates = function(subPolygons, callback) {
  var randStr = (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  var wstream = fs.createWriteStream('./data/'+randStr+'.json');
  wstream.write('[');
  var coordinateCount = 0;
  var activeCount = 0;
  //var retCoords = [];
  for (subPolygon of subPolygons) {
    coordinateCount = coordinateCount + subPolygon.subPolygon.length;
  }
  for (subPolygon of subPolygons) {
    var coordinates = subPolygon.subPolygon;
    var path = 0;
    delete subPolygon.subPolygon;
    for (coordinate of coordinates) {
      var obj = {};
      path = path + 1;
      obj.path = path;
      obj.longitude = coordinate[0];
      obj.latitude = coordinate[1];
      obj = Object.assign(obj, subPolygon);
      //retCoords.push(obj);
      wstream.write(JSON.stringify(obj));
      activeCount = activeCount + 1;
      if (activeCount === coordinateCount) {
        wstream.write(']');
        wstream.end();
        wstream.on('finish', function() {
          console.log("I'm done writing the file");
          callback('./data/'+randStr+'.json');
        });
      } else {
        wstream.write(',\n');
      }
    }
  }
}

module.exports = wdc;
