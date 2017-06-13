import {Component} from '@angular/core';
import {MdDialog, MdIconModule} from '@angular/material';

import { InfoContentComponent } from './infoContent.component';

import { MapService } from "../mapping.service";

@Component({
  selector: 'spatialInfo',
  templateUrl: './info.component.html',
  styles: [`.on-map {
      position: absolute;
      z-index: 1000;
  }
  .infoBtn {
    right: 32px;
    bottom: 100px;
    min-width: 0;
    padding: 0;
  }
  md-button {
  }
  md-icon {
    font-size: 32px;
    width: 32px;
    height: 32px;
  }
  `]
})
export class InfoComponent {
  infoAvailable: Boolean = false;
  private spatialInfo: any = {};

  constructor(public dialog: MdDialog, private mapService: MapService) {
    this.mapService.spatialInfo.subscribe(
        (info) => {
          console.log(info);
          this.infoAvailable = true;
          if (info.sourceUrl.length > 60) {
            info.sourceText = info.sourceUrl.substring(0,60) + "..."
          } else {
            info.sourceText = info.sourceUrl;
          }
          this.spatialInfo = info;
        }
    );
  }

  openInfo() {
    let dialogRef = this.dialog.open(InfoContentComponent, {
      data: this.spatialInfo,
      height: '500px',
      width: '600px',
    });
  }

}
