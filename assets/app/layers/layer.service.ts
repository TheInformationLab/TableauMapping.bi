import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';

import { Observable } from "rxjs";
import { Spatial } from './spatial.model';

@Injectable()
export class LayerService {

  constructor(private http: Http) {}

  getAll() {
    return this.http.get('/spatial/')
      .map((response: Response) => {
        const spatials = response.json().spatials;
        let transformedSpatials: Spatial[] = [];
        for (let spatial of spatials) {
          transformedSpatials.push(new Spatial(
            spatial.owner,
            spatial.name,
            spatial.dateCreated,
            spatial.sourceUrl,
            spatial.sourceDate,
            spatial.type,
            spatial.bbox,
            spatial.country,
            spatial.continent
          ));
        }
        return transformedSpatials;
      })
      .catch((error: Response) => Observable.throw(error.json()));

  }
}
