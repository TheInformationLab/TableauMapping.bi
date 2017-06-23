import { Component } from '@angular/core';
import { MdCardModule } from '@angular/material';

@Component({
  selector: 'help-page',
  templateUrl: './help.component.html',
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
    img {
      max-width: 100%;
      max-height: 100%;
    }
    ol {
      padding-left: 24px;
      line-height: 24px;
    }
    `]
})

export class HelpComponent  {
  public buildPolygon: string;

  constructor() {
    this.buildPolygon = "./img/buildPolygon.gif";
  }
}
