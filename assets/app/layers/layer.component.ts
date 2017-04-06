import { Component, Input } from "@angular/core";

import { Spatial } from "./spatial.model";
import { LayerService } from "./layer.service";

@Component({
    selector: 'wdc-layer',
    templateUrl: './layer.component.html'
})
export class LayerComponent {
    @Input() layer: Spatial;

    constructor(private layerService: LayerService) {}
    
}
