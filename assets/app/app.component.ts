import { Component } from '@angular/core';
import { Message } from 'primeng/primeng';

@Component({
    selector: 'tableau-mapping',
    templateUrl: './app.component.html',
    styles: [require('../scss/main.scss').toString(),
            `
            app-header {
              margin-bottom: 100px;
            }
            `],
})
export class AppComponent {

}
