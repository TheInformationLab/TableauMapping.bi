import { Spatial } from "../layers/spatial.model";

export class SearchItem {
  name: string;
  spatial: Spatial;
  value: string;
  centroid: string;
  _id: string;

  constructor(name: string, spatial: Spatial, value: string, centroid: any, id: string) {
    this.name = name;
    this.spatial = spatial;
    this.value = value;
    this.centroid = centroid;
    this._id = id;
  }
}
