import { Component, AfterViewInit  } from '@angular/core';
import { Router } from "@angular/router";

interface Tableau {
    makeConnector: Function;
    submit: Function;
    registerConnector: Function;
    phase: any;
    phaseEnum: any;
    connectionData: Object;
    username: String;
    password: String;
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

export class WdcComponent implements AfterViewInit {

  constructor(private router: Router) {}

  ngAfterViewInit() {
    console.log("Testing for Tableau");

    var myConnector = tableau.makeConnector();

    myConnector.init = function(initCallback) {

      var hasAuth = false;

  		if (tableau.phase == tableau.phaseEnum.interactivePhase || tableau.phase == tableau.phaseEnum.authPhase) {
  			console.log("Tableau WDC Detected");
        if (this.router.url != '/wdc') {
          this.router.navigateByUrl('/wdc');
        }
  			if (tableau.connectionData && tableau.username && tableau.password) {
  				hasAuth = true;
  				if (tableau.phase == tableau.phaseEnum.authPhase) {
  					console.log("Entering Auth Phase");
  					// Auto-submit here if we are in the auth phase
  					tableau.submit()
  				}
  			}
  		}

  		if (tableau.phase == tableau.phaseEnum.interactivePhase) {
  			console.log("Entering Interactive Phase");
  			if (!hasAuth) {
  				console.log("Waiting for auth");
  			} else {
  				tableau.submit();
  			}
  		}
  		initCallback();
  	};

    myConnector.getSchema = function(schemaCallback) {

    };

    myConnector.getData = function(table, doneCallback) {

    };

    myConnector.setConnection = function() {

    };

    tableau.registerConnector(myConnector);
  }

}
