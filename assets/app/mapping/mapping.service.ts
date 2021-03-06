import {Injectable, Input,Output,EventEmitter} from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs";
import {Map} from "leaflet";
import {Location} from "./location.class";
import {GeocodingService} from "./geocoding.service";

import * as L from 'leaflet';

@Injectable()
export class MapService {
    public map: Map;
    public baseMaps: any;
    private vtLayer: any;
    isLoading = new EventEmitter<Boolean>();
    hasMoved = new EventEmitter<Boolean>();
    spatialInfo = new EventEmitter<any>();

    constructor(private http: Http, private geocoder: GeocodingService) {
        this.baseMaps = {
            OpenStreetMap: L.tileLayer("http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
            }),
            Esri: L.tileLayer("http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}", {
                attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
            }),
            CartoDB: L.tileLayer("http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png", {
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
            }),
            MapBox: L.tileLayer("https://api.mapbox.com/styles/v1/infolabuk-dev/cj1q51itr006n2rp87hvricm2/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiaW5mb2xhYnVrLWRldiIsImEiOiI2d2dEb2w0In0.gvFxiOLO9jxBMlFn-xeCZw", {attribution: ' &copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'})
        };
    }

    disableMouseEvent(elementId: string) {
        let element = <HTMLElement>document.getElementById(elementId);

        L.DomEvent.disableClickPropagation(element);
        L.DomEvent.disableScrollPropagation(element);
    }

    populateInfo(info) {
      this.spatialInfo.emit(info);
    }

    addPolygon(geojson, name, value) {
      if (this.vtLayer) {
          this.map.removeLayer(this.vtLayer);
      }
      this.vtLayer = L.geoJSON(geojson, {
        style: function (feature) {
            return {color: "#337ab7", weight: 1};
        }
      });
      let layers = this.vtLayer;
      if (name && value) {
        Object.keys(layers._layers).forEach(function(key,index) {
          if (layers._layers[key].feature.properties[name] == value) {
            layers._layers[key].options.color = "#f2832f";
          }
        });
        this.vtLayer = layers;
      }
      this.vtLayer.bindPopup(function (layer) {
        let rtnStr: String = "";

        const properties = layer.feature.properties;
        for (var prop in properties) {
          if (properties.hasOwnProperty(prop)) {
            if(properties[prop]) {
              rtnStr = rtnStr + "<strong>" + prop + "</strong>: " + properties[prop] + "<br>";
            }
          }
        }
        return rtnStr;
      }).addTo(this.map);
      this.showLoading(false);
    }

    showLoading(bool: Boolean) {
      this.isLoading.emit(bool);
    }

    mapMoved() {
      this.hasMoved.emit(true);
      this.hasMoved.emit(false);
    }

    recordStats(action, spatial, location) {
      const body = {
        action: action,
        spatial: spatial,
        location: location
      };
      const headers = new Headers({'Content-Type': 'application/json'});
      return this.http.post('/api/stats/record',body,{headers: headers})
        .map((response: Response) => {
          const msg = response.json().message;
          return msg;
        })
        .catch((error: Response) => Observable.throw(error))
    }
}
