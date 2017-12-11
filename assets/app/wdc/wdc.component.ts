import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule, MatIconModule } from '@angular/material';
import { Spatial } from "../layers/spatial.model";
import { LayerService } from "../layers/layer.service";
import { MapService } from "../mapping/mapping.service";
import { GeocodingService } from "../mapping/geocoding.service";

import { Table } from "./table.model";

declare var require: any;

require('./tableauwdc-2.3.latest.min.jjs');

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

  constructor(private layerService: LayerService, private mapService: MapService, private geocoder: GeocodingService, private router: Router) {

    var myConnector = tableau.makeConnector();

    myConnector.init = function(initCallback) {
      var version: String = tableau.platformVersion;
      var inx = version.lastIndexOf(".");
      var testVersion =  Number(version.substring(0,inx));
      tableau.log(testVersion);
      if (testVersion < 10.4) {
        router.navigateByUrl('/wdc-legacy');
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
            this.layers = layers;
            let ret: Table[] = [];
            removeLegacyMeta(layers, function(newLayers) {
              for (let layer of newLayers) {
                ret.push(new Table (
                  layer._id,
                  layer.tableSchema.alias,
                  layer.tableSchema.columns
                ));
              }
              //tableau.log(ret);
              schemaCallback(ret);
            });

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
          featureCol2PolygonArr(geojson, function(data) {
            tableau.reportProgress("Returning data to Tableau");
            table.appendRows(data);
            doneCallback();
          });
        });
      // pageData(table, 1, table.tableInfo.id, function(table) {
      //   doneCallback();
      // });
    };

    myConnector.setConnection = function(userData) {
      tableau.connectionName = "TableauMapping.bi";
      tableau.connectionData = JSON.stringify(userData);
      tableau.submit();
    };

    tableau.registerConnector(myConnector);

    function findWithAttr(array, attr, value) {
      for(var i = 0; i < array.length; i += 1) {
          if(array[i][attr] === value) {
              return i;
          }
      }
      return -1;
    }

    var removeLegacyMeta = function(metaArr, callback) {
      for (var i = 0; i < metaArr.length; i++) {
        var cols = metaArr[i].tableSchema.columns;
        cols.splice(findWithAttr(cols, 'id', 'latitude'),1);
        cols.splice(findWithAttr(cols, 'id', 'longitude'),1);
        cols.splice(findWithAttr(cols, 'id', 'polygonId'),1);
        cols.splice(findWithAttr(cols, 'id', 'subPolygonId'),1);
        cols.splice(findWithAttr(cols, 'id', 'path'),1);
        tableau.log(cols);
        cols.push({
          id: "geometry",
          dataType: "geometry",
          alias: "Geometry"
        });
        metaArr[i].tableSchema.columns = cols;
      }
      callback(metaArr);
    }

    var featureCol2PolygonArr = function(geojson, callback) {
      var features = geojson.features;
      var ret = [];
      for (var i = 0; i < features.length; i++) {
        var obj = features[i].properties;
        obj.geometry = features[i].geometry;
        ret.push(obj);
      }
      callback(ret);
    }

  }

}
