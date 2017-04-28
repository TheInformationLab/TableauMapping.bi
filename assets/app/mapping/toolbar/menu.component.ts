import {Component, OnInit } from '@angular/core';
import {MdMenuModule, MdIconModule} from '@angular/material';
import { LayerService } from "../../layers/layer.service";
import { MapService } from "../mapping.service";
import  "@turf/intersect";

import { MenuItem } from "./menuItem.model";
import { Spatial } from '../../layers/spatial.model';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styles: [`.on-map {
      position: absolute;
      z-index: 1000;
  }
  .menu {
    right: 20px;
    bottom: 30px;
    background: #337ab7;
    border: none;
    outline: none;
  }
  md-icon {
    font-size: 36px;
    margin: 0 0 0 -11px;
  }
`]
})
export class MenuComponent implements OnInit  {
  menuItems: MenuItem[];

  constructor(private layerService: LayerService, private mapService: MapService) {}

  ngOnInit() {
    this.layerService.getAllMeta()
      .subscribe(
        (spatials: Spatial[]) => {
          let transformedSpatials: MenuItem[] = [];
          for (let spatial of spatials) {
            let item = new MenuItem(
              spatial.name,
              spatial._id,
              spatial.bbox
            );
            transformedSpatials.push(item);
          }
          this.menuItems = transformedSpatials;
        }
      )
  }
}
