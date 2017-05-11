import {ILatLng} from "./latLng.interface";
import {LatLng, LatLngBounds} from "leaflet";

export class Location implements ILatLng {
    latitude: number;
    longitude: number;
    address: string;
    viewBounds: LatLngBounds;
    centroid: LatLng;
}
