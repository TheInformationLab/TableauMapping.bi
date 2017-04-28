import {Component, OnInit, ViewChild} from "@angular/core";
import {HeaderComponent} from "../header/header.component";
import {NavigatorComponent} from "./navigator/navigator.component";
import {MdProgressSpinnerModule} from '@angular/material';
import {MenuComponent} from "./toolbar/menu.component";
import {MapService} from "./mapping.service";
import {GeocodingService} from "./geocoding.service";
import {Location} from "./location.class";
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: "map",
    templateUrl: "./map.component.html",
    styles: [`body {
        margin:0;
        padding:0;
    }

    #map {
        position:absolute;
        top:30px;
        bottom:0;
        width:100%;
    }

    md-spinner {
      left:50%;
      top:50%;
      width: 100px;
      height: 100px;
      margin: 5px 10px 0px 0px;
      position: absolute;
      z-index: 1000;
    }

    .on-map {
        position: absolute;
        z-index: 1000;
    }`],
    providers: []
})
export class MapComponent implements OnInit  {
  public isLoading: Boolean = true;

    constructor(private mapService: MapService, private geocoder: GeocodingService, private route: ActivatedRoute) {
    }

    ngOnInit() {
      this.mapService.isLoading.subscribe(
          (loading: Boolean) => this.isLoading = loading
      );
      this.sub = this.route.params.subscribe(params => {
          this.id = +params['id']; // (+) converts string 'id' to a number
          this.mapService.showLoading(true);
          // Some 'reload' coding
          // In a real app: dispatch action to load the details here.
          if (this.mapService.map) {
            this.mapService.map.remove();
          }
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
          this.mapService.showLoading(false);
       });

    }
}
