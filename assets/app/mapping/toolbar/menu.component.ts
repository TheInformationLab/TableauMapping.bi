import {Component} from '@angular/core';
import {MdMenuModule, MdIconModule} from '@angular/material';
import { LayerService } from "../../layers/layer.service";

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styles: [`.on-map {
      position: absolute;
      z-index: 1000;
  }
  .menu {
    margin: 20px 0 0 10px;
    left: 10px;
    background: none;
    border: none;
    outline: none;
  }
`]
})
export class MenuComponent {

  constructor(private layerService: LayerService) {}

  showPolygon(polygonId) {
    var opt = { id: polygonId};
    this.layerService.getGeojson(opt)
      .subscribe(
        (geojson) => {

        });
  }

}
