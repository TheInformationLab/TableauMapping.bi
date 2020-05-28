var turf = require("@turf/turf");

var wdc = {};

wdc.getTableSchema = function(geojson, meta, callback) {
  let schema = {};
  schema.alias = meta.continent + " | " + meta.country + " | " + meta.name;
  let properties = [];
  turf.propEach(geojson, function (currentProperties) {
    let headers = Object.keys(currentProperties);
    for (let header of headers) {
      if (properties.indexOf(header) == -1) {
        properties.push(header);
      }
    }
  });
  let cols = [];
  for (let property of properties) {
    let schema = {};
    schema.id = property.replace(/[^0-9a-z]/gi, '');
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
  schema.columns = cols;
  callback(schema);
}

module.exports = wdc;
