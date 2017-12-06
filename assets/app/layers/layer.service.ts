import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';

import { Observable } from "rxjs";
import { Spatial } from './spatial.model';
import { ErrorService } from "../errors/error.service";

@Injectable()
export class LayerService {
  public metaLayers: Spatial[] = [];

  constructor(private http: Http, private errorService: ErrorService) {}

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
            spatial.tableSchema
          ));
        }
        this.metaLayers = transformedSpatials;
        return transformedSpatials;
      })
      .catch((error: Response) => {
        if(error.status == 0) {
          this.errorService.error("GET /spatial/meta net::ERR_CONNECTION_REFUSED","Lost connection to TableauMapping.bi. Check your internet connection.")
          return Observable.throw(error.json());
        } else {
          return Observable.throw(error.json());
        }
      });
  }

  getData(options: Object) {
    const body = JSON.stringify(options);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('/spatial/data',body,{headers: headers})
      .map((response: Response) => {
        const geojson = response.json().data;
        return geojson;
    })
    .catch((error: Response) => {
      if(error.status == 0) {
        this.errorService.error("POST /spatial/data net::ERR_CONNECTION_REFUSED","Lost connection to TableauMapping.bi. Check your internet connection.")
        return Observable.throw(error.json());
      } else {
        return Observable.throw(error.json());
      }
    })
  }

}
