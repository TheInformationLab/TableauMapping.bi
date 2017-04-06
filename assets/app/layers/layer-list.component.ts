import { Component, OnInit } from '@angular/core';

import { LayerService } from "./layer.service";
import { Spatial } from './spatial.model';

@Component({
  selector: 'layers',
  template: `
    <div class="col-md-8 col-md-offset-2">
        <wdc-layer
               [layer]="layer"
                *ngFor="let layer of layers"></wdc-layer>
    </div>
  `
})

export class LayerListComponent  implements OnInit {
  layers : Spatial [];

  constructor(private layerService: LayerService) {}

  ngOnInit() {
    this.layerService.getAll()
      .subscribe(
        (layers: Spatial[]) => {
            this.layers = layers;
        }
      )
  }

}
