import {Component, ViewChild} from "@angular/core";
import {NavigatorComponent} from "./navigator/navigator.component";
import {MenuComponent} from "./toolbar/menu.component";
import {MapService} from "./mapping.service";
import {GeocodingService} from "./geocoding.service";
import {Location} from "./location.class";

@Component({
    selector: "map",
    templateUrl: "./map.component.html",
    styles: [`body {
        margin:0;
        padding:0;
    }

    #map {
        position:absolute;
        top:50px;
        bottom:0;
        width:100%;
    }`],
    providers: []
})
export class MapComponent {

    constructor(private mapService: MapService, private geocoder: GeocodingService) {
    }

    ngOnInit() {
        let map = L.map("map", {
            zoomControl: false,
            center: L.latLng(53.959965, -1.087298),
            zoom: 6,
            minZoom: 4,
            maxZoom: 19,
            layers: [this.mapService.baseMaps.MapBox]
        });

        L.control.zoom({ position: "topright" }).addTo(map);
        //L.control.layers(this.mapService.baseMaps).addTo(map);
        L.control.scale().addTo(map);

        this.mapService.map = map;
        this.geocoder.getCurrentLocation()
            .subscribe(
                location => map.panTo([location.latitude, location.longitude]),
                err => console.error(err)
            );

    }
}
