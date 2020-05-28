import {Component, ViewChild} from '@angular/core';
import {MatIconModule, MatTooltip} from '@angular/material';
import {MatDialogModule, MatDialog, MatDialogRef} from '@angular/material/dialog';

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
  .mat-button {
    border-radius: 50%;
    background-color: rgba(0,0,0,0);
    border-color: rgba(0,0,0,0);
  }
  mat-icon {
    font-size: 32px;
    width: 32px;
    height: 32px;
  }
  .mat-button {
    color: rgba(97,97,97,1);
  }
  .mat-button[disabled] {
    color: rgba(0,0,0,.38);
  }
  .tooltip {
  	background: #616161;
    right: 80px;
    bottom: 115px;
    height: 30px;
    padding: 5px 20px;
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    color: #fff;
    opacity: 1;
  }
  .tooltip:after {
  	left: 100%;
  	top: 50%;
  	border: solid transparent;
  	content: " ";
  	height: 0;
  	width: 0;
  	position: absolute;
  	pointer-events: none;
  	border-color: rgba(97, 97, 97, 0);
  	border-left-color: #616161;
  	border-width: 8px;
  	margin-top: -8px;
  }
  `]
})
export class InfoComponent{
  infoAvailable: Boolean = false;
  tooltopContent: string = '';
  private spatialInfo: any = {};
  infoTooltip: string = '';

  constructor(public dialog: MatDialog, private mapService: MapService) {
    this.mapService.spatialInfo.subscribe(
        (info) => {
          this.infoAvailable = true;
          this.tooltopContent = info.country + ' ' + info.name;
          if (info.sourceUrl.length > 60) {
            info.sourceText = info.sourceUrl.substring(0,60) + "..."
          } else {
            info.sourceText = info.sourceUrl;
          }
          this.spatialInfo = info;
          this.infoTooltip = info.country + " " + info.name;
        }
    );
  }

  openInfo() {
    let dialogRef = this.dialog.open(InfoContentComponent, {
      data: this.spatialInfo,
      height: '550px',
      width: '600px',
    });
  }

}
