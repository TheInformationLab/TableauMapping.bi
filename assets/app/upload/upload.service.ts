import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';

import { Upload } from './upload.model';
import { Observable } from "rxjs";
import { ErrorService } from "../errors/error.service";

@Injectable()
export class UploadService {
  constructor(private http: Http, private errorService: ErrorService) {}

  save(upload: Upload) {
    const body = JSON.stringify(upload);
    const headers = new Headers({'Content-Type': 'application/json','Authorization': localStorage.getItem('token')});
    return this.http.post('/spatial/save', body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        if(error.status == 0) {
          this.errorService.error("POST /auth/create net::ERR_CONNECTION_REFUSED","Lost connection to TableauMapping.bi. Check your internet connection.")
          return Observable.throw(error.json());
        } else {
          return Observable.throw(error.json());
        }
      });
  }

}
