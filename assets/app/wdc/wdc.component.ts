import { Component } from '@angular/core';

import { Spatial } from "../layers/spatial.model";
import { LayerService } from "../layers/layer.service";

import { Table } from "./table.model";

//import * as Tableau from "./tableauwdc-2.2.latest.min.js";
require('./tableauwdc-2.2.latest.min.js');

interface Tableau {
    makeConnector: Function;
    submit: Function;
    registerConnector: Function;
    phase: any;
    phaseEnum: any;
    connectionData: Object;
    username: String;
    password: String;
    connectionName: String;
    reportProgress: Function;
}
declare var tableau: Tableau;

interface Connector {
  init: Function;
  getSchema: Function;
  getData: Function;
  setConnection: Function;
}
declare var myConnector: Connector;

@Component({
  selector: 'wdc',
  templateUrl: './wdc.component.html'
})

export class WdcComponent {
  layers: Spatial[] = [];

  constructor(private layerService: LayerService) {

    var myConnector = tableau.makeConnector();

    myConnector.init = function(initCallback) {
      myConnector.setConnection();
  		initCallback();
      tableau.submit();
  	};

    myConnector.getSchema = function(schemaCallback) {
      console.log("Getting Schema");
      layerService.getAllMeta()
        .subscribe(
          (layers: Spatial[]) => {
            console.log(layers);
              this.layers = layers;
              let ret: Table[] = [];
              for (let layer of layers) {
                ret.push(new Table (
                  layer._id,
                  layer.tableSchema.alias,
                  layer.tableSchema.columns
                ));
              }
              //console.log(ret);
              schemaCallback(ret);
          }
        )
    };

    myConnector.getData = function(table, doneCallback) {
      console.log("Getting table " + table.tableInfo.id);
      tableau.reportProgress("Requesting GeoJson");
      layerService.getData({id: table.tableInfo.id})
        .subscribe((geojson) => {
          tableau.reportProgress("Parsing data");
          geojson2Tableau(geojson, function(data) {
            tableau.reportProgress("Returning data to Tableau");
            table.appendRows(data);
            doneCallback();
          });
        });
      // pageData(table, 1, table.tableInfo.id, function(table) {
      //   doneCallback();
      // });
    };

    myConnector.setConnection = function() {
      tableau.connectionName = "TableauMapping.bi";
      tableau.submit();
    };

    tableau.registerConnector(myConnector);

    // var pageData = function(table, page, id, callback) {
    //   layerService.getData({id: id, page: page})
    //     .subscribe(
    //       (layer) => {
    //         table.appendRows(layer.data);
    //         if (layer.moreData) {
    //           tableau.reportProgress("Getting row: " + layer.currentChunk * 5000 + " of " + layer.chunksAvailable * 5000);
    //           pageData(table, page + 1, id, callback)
    //         } else {
    //           callback(table);
    //         }
    //       }
    //     )
    // }

    var geojson2Tableau = function(geojson, callback) {
        PolygonID(geojson, function(polygons) {
            SubPolygonID(polygons, function(subPolygons) {
                parseCoordinates(subPolygons, function(resp) {
                  callback(resp);
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
        for (let header of headers) {
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
      for (let polygon of polygons) {
        subPolygonCount = subPolygonCount + polygon.coordinates.length;
      }
      for (let polygon of polygons) {
        var subPolygons = polygon.coordinates;
        var subPolygonId = 0;
        delete polygon.coordinates;
        for (let subPolygon of subPolygons) {
          var obj: {
            subPolygon: any;
            subPolygonId: number;
          } = {
            subPolygon: null,
            subPolygonId: null
          };
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
      var coordinateCount = 0;
      var activeCount = 0;
      var retCoords = [];
      for (let subPolygon of subPolygons) {
        coordinateCount = coordinateCount + subPolygon.subPolygon.length;
      }
      for (let subPolygon of subPolygons) {
        var coordinates = subPolygon.subPolygon;
        var path = 0;
        delete subPolygon.subPolygon;
        for (let coordinate of coordinates) {
          var obj: {
            path: number;
            longitude: number;
            latitude: number;
          } = {
            path: null,
            longitude: null,
            latitude: null
          };
          path = path + 1;
          obj.path = path;
          obj.longitude = coordinate[0];
          obj.latitude = coordinate[1];
          obj = Object.assign(obj, subPolygon);
          retCoords.push(obj);
          activeCount = activeCount + 1;
          if (activeCount === coordinateCount) {
            callback(retCoords);
          }
        }
      }
    }

  }

}
