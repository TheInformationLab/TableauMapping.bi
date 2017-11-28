import { Component } from '@angular/core';
import { MatCardModule, MatIconModule } from '@angular/material';
import { Spatial } from "../layers/spatial.model";
import { LayerService } from "../layers/layer.service";
import { MapService } from "../mapping/mapping.service";
import { GeocodingService } from "../mapping/geocoding.service";
import { Router } from '@angular/router';

import { Table } from "./table.model";

declare var require: any;

require('./tableauwdc-2.1.latest.min.jjs');

interface Tableau {
    makeConnector: Function;
    submit: Function;
    registerConnector: Function;
    log: Function;
    phase: any;
    phaseEnum: any;
    connectionData: string;
    username: String;
    password: String;
    connectionName: String;
    platformVersion: String;
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
  templateUrl: './wdc.component.html',
  styles: [`
    .demo-card-container {
      display: flex;
      flex-flow: column nowrap;
      margin-top:30px;
    }

    .help-card {
      margin: 0 100px 16px 100px;
    }

    .help-card-title {
      font-size: 22px !important;
    }
    `]
})

export class WdcComponent {
  layers: Spatial[] = [];

  public buildPolygon: string;

  constructor(private layerService: LayerService, private mapService: MapService, private geocoder: GeocodingService, private router: Router) {

    this.buildPolygon = "./img/buildPolygon.gif";

    var myConnector = tableau.makeConnector();

    myConnector.init = function(initCallback) {
      var version: String = tableau.platformVersion;
      var inx = version.lastIndexOf(".");
      var testVersion =  Number(version.substring(0,inx));
      tableau.log(testVersion);
      if (testVersion > 10.3) {
        router.navigateByUrl('/wdc');
      }
      geocoder.getCurrentLocation()
          .subscribe(
              location => {
                myConnector.setConnection(location);
            		initCallback();
                tableau.submit();
              },
              err => tableau.log(err)
          );
  	};

    myConnector.getSchema = function(schemaCallback) {
      tableau.log("Getting Schema");
      mapService.recordStats('getSchema',null,JSON.parse(tableau.connectionData))
        .subscribe(
          data => tableau.log(data),
          error => tableau.log(error)
        )
      layerService.getAllMeta()
        .subscribe(
          (layers: Spatial[]) => {
            tableau.log(layers);
              this.layers = layers;
              let ret: Table[] = [];
              for (let layer of layers) {
                ret.push(new Table (
                  layer._id,
                  layer.tableSchema.alias,
                  layer.tableSchema.columns
                ));
              }
              //tableau.log(ret);
              schemaCallback(ret);
          }
        )
    };

    myConnector.getData = function(table, doneCallback) {
      tableau.log("Getting table " + table.tableInfo.id);
      tableau.reportProgress("Requesting GeoJson");
      mapService.recordStats('getData',table.tableInfo.id,JSON.parse(tableau.connectionData))
        .subscribe(
          data => tableau.log(data),
          error => tableau.log(error)
        );
      layerService.getData({id: table.tableInfo.id})
        .subscribe((geojson) => {
          tableau.reportProgress("Parsing data");
          geojson2Tableau(geojson, function(data) {
            tableau.reportProgress("Returning data to Tableau");
            table.appendRows(data);
            doneCallback();
          });
        });
    };

    myConnector.setConnection = function(userData) {
      tableau.connectionName = "TableauMapping.bi";
      tableau.connectionData = JSON.stringify(userData);
      tableau.submit();
    };

    tableau.registerConnector(myConnector);

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
