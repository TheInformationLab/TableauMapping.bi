import {Component, OnInit, ViewChild } from '@angular/core';
import {MdMenuModule, MdIconModule,MdMenuTrigger, MdMenu} from '@angular/material';
import { LayerService } from "../../layers/layer.service";
import { MapService } from "../mapping.service";
import * as Turf from "@turf/turf";
import { MenuGroupsPipe } from './groups.pipe';
import { MenuItem } from "./menuItem.model";
import { Spatial} from '../../layers/spatial.model';
import { MenuService } from "./menu.service";

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
  h5 {
    padding-left: 10px;
    color: #999;
  }
`]
})
export class MenuComponent {
  turf = Turf;
  menuItems: MenuItem[] = [];
  mapBounds: any;
  allMeta: Spatial[] = [];
  itemsAvailable: Boolean = false;
  @ViewChild(MdMenu) menu: MdMenu;
  @ViewChild(MdMenuTrigger) trigger: MdMenuTrigger;

  public constructor(private layerService: LayerService, private mapService: MapService, private menuService: MenuService) {}

  ngOnInit() {
    this.mapService.hasMoved.subscribe(
        (moved: Boolean) => {
          if(moved) {
            this.refreshItems();
          }
        }
    );
    this.menuService.menuState.subscribe(
      (open: Boolean) => {
        if(open) {
          this.trigger.openMenu();
        } else {
          this.trigger.closeMenu();
        }
      }
    )
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

  filterItems() {
    let leafletBounds: L.LatLngBounds;
    let curBounds = this.mapService.map.getBounds();
    let viewBbox: any = {...leafletBounds,...curBounds};
    this.mapBounds = this.turf.bboxPolygon([viewBbox._southWest.lng, viewBbox._southWest.lat, viewBbox._northEast.lng, viewBbox._northEast.lat]);
    let transformedSpatials: MenuItem[] = [];
    for (let spatial of this.allMeta) {
      let item = new MenuItem(
        spatial.name,
        spatial.country,
        spatial._id,
        spatial.bbox
      );
      let bbox: {
        minX: number;
        minY: number;
        maxX: number;
        maxY: number;
      } = {
        minX: item.bbox[0],
        minY: item.bbox[1],
        maxX: item.bbox[2],
        maxY: item.bbox[3]
      };
      let itemBbox = this.turf.bboxPolygon([bbox.minX,bbox.minY,bbox.maxX,bbox.maxY]);
      if(this.turf.intersect(this.mapBounds, itemBbox)) {
        transformedSpatials.push(item);
      }
    }
    this.menuItems = transformedSpatials;
    this.menuItems.sort((a, b) => {
      if (a.name < b.name) return -1;
      else if (a.name > b.name) return 1;
      else return 0;
    });
    if (transformedSpatials.length > 0) {
      this.itemsAvailable = true;
    } else {
      this.itemsAvailable = false;
    }
  }
}
