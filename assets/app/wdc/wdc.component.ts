import { Component } from '@angular/core';

import { Spatial, Data, GeoJson } from "../layers/spatial.model";
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
      tableau.submit();
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
              console.log(ret);
              schemaCallback(ret);
          }
        )
    };

    myConnector.getData = function(table, doneCallback) {
      console.log("Getting table " + table.tableInfo.id);
      layerService.getData({id: table.tableInfo.id})
        .subscribe(
          (layer) => {
            table.appendRows(layer);
            doneCallback();
          }
        )
    };

    myConnector.setConnection = function() {
      tableau.connectionName = "TableauMapping.bi"
    };

    tableau.registerConnector(myConnector);



  }

}
