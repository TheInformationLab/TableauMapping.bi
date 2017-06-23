import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { ErrorService } from "../errors/error.service";

import { Observable } from "rxjs";

@Injectable()
export class SearchService {
  constructor(private http: Http, private errorService: ErrorService) {}

  searchIndex(term: String) {
    const body = JSON.stringify({term: term});
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('/search/index', body, {headers: headers})
      .retry(3)
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        if(error.status == 0) {
          this.errorService.error("POST /search/index net::ERR_CONNECTION_REFUSED","Lost connection to TableauMapping.bi. Check your internet connection.")
          return Observable.throw(error.json());
        } else {
          return Observable.throw(error.json());
        }
      });
  }

}
