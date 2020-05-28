import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { JwtHelper } from 'angular2-jwt';

import 'rxjs/Rx';

import { Observable } from "rxjs";
import { ErrorService } from "../errors/error.service";

import { Mapbox } from "./mapbox.model";
import { TMMeta } from "./meta.model";

@Injectable()
export class ProfileService {
  jwtHelper: JwtHelper = new JwtHelper();
  private datasets: Mapbox[] = [];
  private userMeta: TMMeta[] = [];

  constructor(private http: Http, private errorService: ErrorService) {}

  getProfile() {
    var token = localStorage.getItem('token');
    return this.jwtHelper.decodeToken(token).user;
  }

  updateProfile(user) {
    const body = JSON.stringify(user);
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
      });
    return this.http.patch('/api/profile', body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        if(error.status == 0) {
          this.errorService.error("PATCH /api/profile net::ERR_CONNECTION_REFUSED","Lost connection to TableauMapping.bi. Check your internet connection.")
          return Observable.throw(error.json());
        } else {
          return Observable.throw(error.json());
        }
      });
  }

  updatePassword(password) {
    const body = JSON.stringify(password);
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
      });
    return this.http.put('/api/profile/password', body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        if(error.status == 0) {
          this.errorService.error("PUT /api/profile/password net::ERR_CONNECTION_REFUSED","Lost connection to TableauMapping.bi. Check your internet connection.")
          return Observable.throw(error.json());
        } else {
          return Observable.throw(error.json());
        }
      });
  }

  getDatasets() {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
      });
    return this.http.get('/api/spatial/datasets', {headers: headers})
      .map((response: Response) => {
        if (response.json().message = "Datasets found") {
          let dsArr: Mapbox[] = [];
          for (let dataset of response.json().datasets) {
            if (dataset.features > 0 && dataset.name) {
              let created = new Date(dataset.created);
              let ds = new Mapbox(
                dataset.bounds,
                created.toLocaleDateString(),
                dataset.description,
                dataset.features,
                dataset.id,
                dataset.modified,
                dataset.name,
                dataset.owner,
                dataset.size
              )
              dsArr.push(ds);
            }
          }
          this.datasets = dsArr;
          return dsArr;
        }
      })
      .catch((error: Response) => {
        if(error.status == 0) {
          this.errorService.error("GET /api/spatial/datasets net::ERR_CONNECTION_REFUSED","Lost connection to TableauMapping.bi. Check your internet connection.")
          return Observable.throw(error.json());
        } else {
          return Observable.throw(error.json());
        }
      });
  }

  getMeta() {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
      });
    return this.http.get('/api/spatial/user/meta', {headers: headers})
      .map((response: Response) => {
        if (response.json().message = "Result") {
          this.userMeta = response.json().spatials;
          return response.json().spatials;
        }
      })
      .catch((error: Response) => {
        if(error.status == 0) {
          this.errorService.error("GET /api/spatial/user/meta net::ERR_CONNECTION_REFUSED","Lost connection to TableauMapping.bi. Check your internet connection.")
          return Observable.throw(error.json());
        } else {
          return Observable.throw(error.json());
        }
      });
  }

  isPublic(id) {
    for(let meta of this.userMeta) {
      if (meta.mapboxid == id && meta.isPublic) {
        return true;
      }
    }
    return false;
  }

  getItemMeta(id) {
    for(let meta of this.userMeta) {
      if (meta.mapboxid == id) {
        return meta;
      }
    }
    let notFound: any = {};
    return notFound;
  }

  saveMeta(meta) {
    const body = JSON.stringify(meta);
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
      });
    return this.http.post('/api/spatial/save', body,  {headers: headers})
      .map((response: Response) => {
        return response.json().message
      })
      .catch((error: Response) => {
        if(error.status == 0) {
          this.errorService.error("POST /api/spatial/save net::ERR_CONNECTION_REFUSED","Lost connection to TableauMapping.bi. Check your internet connection.")
          return Observable.throw(error.json());
        } else {
          return Observable.throw(error.json());
        }
      });
  }

  updateMeta(meta) {
    console.log("Updating", meta);
    const body = JSON.stringify(meta);
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
      });
    return this.http.put('/api/spatial/save', body,  {headers: headers})
      .map((response: Response) => {
        return response.json().message
      })
      .catch((error: Response) => {
        if(error.status == 0) {
          this.errorService.error("PUT /api/spatial/save net::ERR_CONNECTION_REFUSED","Lost connection to TableauMapping.bi. Check your internet connection.")
          return Observable.throw(error.json());
        } else {
          return Observable.throw(error.json());
        }
      });
  }

  updateIndex(id) {
    console.log("Updating index", id);
    const body = JSON.stringify({id: id});
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
      });
    return this.http.post('/index/item', body,  {headers: headers})
      .map((response: Response) => {
        return response.json().message
      })
      .catch((error: Response) => {
        if(error.status == 0) {
          this.errorService.error("POST /index/item net::ERR_CONNECTION_REFUSED","Lost connection to TableauMapping.bi. Check your internet connection.")
          return Observable.throw(error.json());
        } else {
          return Observable.throw(error.json());
        }
      });
  }

  removeIndex(id) {
    console.log("Removing index", id);
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
      });
    return this.http.delete('/index/item?id='+id, {headers: headers})
      .map((response: Response) => {
        return response.json().message
      })
      .catch((error: Response) => {
        if(error.status == 0) {
          this.errorService.error("DELETE /index/item net::ERR_CONNECTION_REFUSED","Lost connection to TableauMapping.bi. Check your internet connection.")
          return Observable.throw(error.json());
        } else {
          return Observable.throw(error.json());
        }
      });
  }

}
