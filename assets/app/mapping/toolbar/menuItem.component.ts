import { Component, Input } from "@angular/core";
import { LayerService } from "../../layers/layer.service";
import { MapService } from "../mapping.service";

import { MenuItem } from "./menuItem.model";

@Component({
    selector: 'menu-item',
    templateUrl: './menuItem.component.html',
    styles: []
})
export class MenuItemComponent {
    @Input() menuItem: MenuItem;

    constructor(private layerService: LayerService, private mapService: MapService) {
    }

    showPolygon() {
      this.mapService.showLoading(true);
      var opt = { id: this.menuItem.id};
      this.layerService.getGeojson(opt)
        .subscribe(
          (geojson) => {
            this.mapService.addPolygon(geojson);
          });
    }

}
