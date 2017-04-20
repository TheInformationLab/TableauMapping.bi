import { Component } from '@angular/core';

import { Spatial } from "../layers/spatial.model";
import { LayerService } from "../layers/layer.service";

import { Table } from "./table.model";

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
  template: `
    <h2>Web Data Connector</h2>
  `
})

export class WdcComponent {
  layers: Spatial[] = [];

  constructor(private layerService: LayerService) {

    var myConnector = tableau.makeConnector();

    myConnector.init = function(initCallback) {
      myConnector.setConnection();
  		initCallback();
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
      pageData(table, 1, table.tableInfo.id, function(table) {
        doneCallback();
      });
    };

    myConnector.setConnection = function() {
      tableau.connectionName = "TableauMapping.bi";
      tableau.submit();
    };

    tableau.registerConnector(myConnector);

    var pageData = function(table, page, id, callback) {
      layerService.getData({id: id, page: page})
        .subscribe(
          (layer) => {
            table.appendRows(layer.data);
            if (layer.moreData) {
              tableau.reportProgress("Getting row: " + layer.currentChunk * 10000 + " of " + layer.chunksAvailable * 10000);
              pageData(table, page + 1, id, callback)
            } else {
              callback(table);
            }
          }
        )
    }

  }

}
