import { Component, Input } from "@angular/core";
import { Router } from '@angular/router';
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

    constructor(private layerService: LayerService, private mapService: MapService, private router: Router) {
    }

    showPolygon() {
      this.mapService.showLoading(true);
      this.mapService.populateInfo(this.menuItem);
      var opt = { id: this.menuItem.id};
      this.mapService.recordStats('showPolygon',this.menuItem.id,JSON.parse(localStorage.getItem('userData')))
        .subscribe(
          data => console.log(data),
          error => console.error(error)
        );
      this.layerService.getData(opt)
        .subscribe(
          (resp) => {
            this.mapService.addPolygon(resp.data, null, null);
          });
      //this.router.navigateByUrl('/map/'+this.menuItem.id);
    }

}
