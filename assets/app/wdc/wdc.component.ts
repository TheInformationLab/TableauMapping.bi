import { Component } from '@angular/core';
import { MatCardModule, MatIconModule } from '@angular/material';

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

  constructor() {}


}
