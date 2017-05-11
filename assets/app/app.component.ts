import { Component } from '@angular/core';
import { Message } from 'primeng/primeng';
// import { Router } from "@angular/router";

@Component({
    selector: 'tableau-mapping',
    templateUrl: './app.component.html',
    styles: [require('../scss/main.scss').toString(),
            `
            app-header {
              margin-bottom: 100px;
            }
            `]
})
export class AppComponent {

  // constructor(private router: Router) {
  //   let userAgent = navigator.userAgent;
  //   if (userAgent.includes("Tableau") || userAgent.includes("Qt")) {
  //     router.navigateByUrl('/wdc');
  //   }
  // }

}
