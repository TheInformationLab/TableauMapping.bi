import {Http, Headers, Response} from "@angular/http";
import {Location} from "./location.class";
import {Injectable} from "@angular/core";
import {ErrorService} from "../errors/error.service";

import * as L from 'leaflet';

import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";

@Injectable()
export class GeocodingService {
    http: Http;

    constructor(http: Http, private errorService: ErrorService) {
        this.http = http;
    }

    geocode(address: string) {
        return this.http
            .get("https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiaW5mb2xhYnVrLWRldiIsImEiOiJjajJibjJmb2EwMDI1MzNwajJoN2R1bzliIn0.onogeMJemGAo605r8issHg&limit=1")
            .map(res => res.json())
            .map(result => {
                if (result.features.length === 0) {
                  this.errorService.info("Mapbox isn't aware of '"+ address +"'. Please try an alternative","Unable to locate '" + address + "'");
                }

                let location = new Location();
                location.address = result.features[0].place_name;
                location.latitude = result.features[0].center[1];
                location.longitude = result.features[0].center[0];
                location.centroid = L.latLng(location.latitude, location.longitude);
                if(result.features[0].bbox) {
                  let viewPort = result.features[0].bbox;
                  location.viewBounds = L.latLngBounds(
                    {
                      lat: viewPort[1],
                      lng: viewPort[0]},
                    {
                      lat: viewPort[3],
                      lng: viewPort[2]
                    });
                }

                return location;
            });
    }

    findLocation(address: string) {
        return this.http
            .get("https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiaW5mb2xhYnVrLWRldiIsImEiOiJjajJibjJmb2EwMDI1MzNwajJoN2R1bzliIn0.onogeMJemGAo605r8issHg&limit=10")
            .map(res => res.json())
            .map(result => {
                if (result.features.length === 0) {
                  this.errorService.info("Mapbox isn't aware of '"+ address +"'. Please try an alternative","Unable to locate '" + address + "'");
                 }

                let results: Location[] = [];

                for (let feature of result.features) {
                  let location = new Location();
                  location.address = feature.place_name;
                  if(feature.center) {
                    location.latitude = feature.center[1];
                    location.longitude = feature.center[0];
                  }

                  if(feature.bbox) {
                    let viewPort = feature.bbox;
                    location.viewBounds = L.latLngBounds(
                      {
                        lat: viewPort[1],
                        lng: viewPort[0]},
                      {
                        lat: viewPort[3],
                        lng: viewPort[2]
                      });
                  }
                  results.push(location);
                }
                return results;
            });
    }

    getCurrentLocation() {
        return this.http
            .get("//ipv4.myexternalip.com/json")
            .map(res => res.json().ip)
            .flatMap(ip => this.http.get("//api.ipstack.com/" + ip + "?access_key=67d90f241ff91d334ffff340a7cdc469"))
            .map((res: Response) => res.json())
            .map(result => {
                // let location = new Location();
                //
                // location.address = result.city + ", " + result.region_code + " " + result.zip_code + ", " + result.country_code;
                // location.latitude = result.latitude;
                // location.longitude = result.longitude;

                return result;
            });
    }
}
