import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';

import { Observable } from "rxjs";
import { Spatial, Data } from './spatial.model';

@Injectable()
export class LayerService {
  public metaLayers: Spatial[] = [];
  public dataLayers: Data[] = [];

  constructor(private http: Http) {}

  getAllMeta() {
    return this.http.get('/spatial/meta')
      .map((response: Response) => {
        const spatials = response.json().spatials;
        let transformedSpatials: Spatial[] = [];
        for (let spatial of spatials) {
          transformedSpatials.push(new Spatial(
            spatial._id,
            spatial.owner,
            spatial.name,
            spatial.dateCreated,
            spatial.sourceUrl,
            spatial.sourceDate,
            spatial.type,
            spatial.bbox,
            spatial.country,
            spatial.continent,
            spatial.tableSchema,
            spatial.tabData
          ));
        }
        this.metaLayers = transformedSpatials;
        return transformedSpatials;
      })
      .catch((error: Response) => Observable.throw(error.json()));
  }

  getData(options: Object) {
    const body = JSON.stringify(options);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('/spatial/geojson',body,{headers: headers})
      .map((response: Response) => {
        const spatials = response.json();
        return spatials;
    })
    .catch((error: Response) => Observable.throw(error))
  }
}
