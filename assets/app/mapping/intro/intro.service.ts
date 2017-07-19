import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';

import { Observable } from "rxjs";
import { ErrorService } from "../../errors/error.service";

@Injectable()
export class IntroService {
  constructor(private http: Http, private errorService: ErrorService) {}

  subscribe(email: string) {
    const body = {'email': email};
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('/api/subscribe', body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        if(error.status == 0) {
          this.errorService.error("POST /api/subscribe net::ERR_CONNECTION_REFUSED","Lost connection to TableauMapping.bi. Check your internet connection.")
          return Observable.throw(error.json());
        } else {
          return Observable.throw(error.json());
        }
      });
  }

}
