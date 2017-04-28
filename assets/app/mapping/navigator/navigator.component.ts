import {Component} from "@angular/core";
import {GeocodingService} from "../geocoding.service";
import {MapService} from "../mapping.service";
import {Location} from "../location.class";
import {Map} from "leaflet";

@Component({
    selector: "navigator",
    templateUrl: "./navigator.component.html",
    styles: [`.on-map {
        position: absolute;
        z-index: 1000;
    }

    .map-button {
        width: 35px;
        height: 35px;
        text-align: center;
        padding: 5px;
    }

    .leaflet-clickable {
      cursor: crosshair !important;
    }

    .leaflet-container {
      cursor: help !important;
    }
    input {
      margin: 20px 0 0 80px;
      padding: 5px;
      width: 300px;
      height: 35px;
      border: 2px solid rgba(77, 156, 237, 0.7);
      font-size: 16px;
      color: rgb(142, 142, 142);
    }

    #goto {
        margin: 20px 0 0 380px;
        .map-button
    }`
    ],
    providers: []
})
export class NavigatorComponent {
    address: string;

    private map: Map;

    constructor(private geocoder: GeocodingService, private mapService: MapService) {
        this.address = "";
    }

    ngOnInit() {
        this.mapService.disableMouseEvent("goto");
        this.mapService.disableMouseEvent("place-input");
        this.map = this.mapService.map;
    }

    goto() {
        if (!this.address) { return; }

        this.geocoder.geocode(this.address)
        .subscribe(location => {
            this.map.fitBounds(location.viewBounds, {});
            this.address = location.address;
        }, error => console.error(error));
    }
}
