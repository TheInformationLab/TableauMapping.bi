import {Component, OnInit } from '@angular/core';
import {MdMenuModule, MdIconModule} from '@angular/material';
import { LayerService } from "../../layers/layer.service";
import { MapService } from "../mapping.service";
import * as Turf "@turf/turf";

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
  mapBounds: Polygon;
  turf = Turf;
  allMeta: Spatial[] = [];

  constructor(private layerService: LayerService, private mapService: MapService) {}

  ngOnInit() {
    this.mapService.hasMoved.subscribe(
        (moved: Boolean) => {
          if(moved) {
            this.refreshItems();
          }
        }
    );
  }

  refreshItems() {
    if (this.allMeta.length > 0) {
      this.filterItems();
    } else {
      this.layerService.getAllMeta()
        .subscribe(
          (spatials: Spatial[]) => {
            this.allMeta = spatials
            this.filterItems();
          });
    }
  }

  filterItems(spatials) {
    let viewBbox = this.mapService.map.getBounds();
    this.mapBounds = this.turf.bboxPolygon([viewBbox._southWest.lng, viewBbox._southWest.lat, viewBbox._northEast.lng, viewBbox._northEast.lat]);
    let transformedSpatials: MenuItem[] = [];
    for (let spatial of this.allMeta) {
      let item = new MenuItem(
        spatial.name,
        spatial._id,
        spatial.bbox
      );
      let bbox = {};
      bbox.minX = item.bbox[0];
      bbox.minY = item.bbox[1];
      bbox.minX = item.bbox[2];
      bbox.minY = item.bbox[3];
      let itemBbox = this.turf.bboxPolygon([bbox.minX,bbox.minY,bbox.maxX,bbox.maxY]);
      if(this.turf.intersect(this.mapBounds, itemBbox)) {
        transformedSpatials.push(item);
      }
    }
    this.menuItems = transformedSpatials;
  }
}
